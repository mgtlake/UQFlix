using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using UQFlix.Models;
using AngleSharp.Parser.Html;
using System;
using System.Globalization;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Text.RegularExpressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using CsvHelper;
using System.IO;

namespace UQFlix.Controllers {
	[Route("api/[controller]")]
	public class MoviesController : Controller {
		private readonly ConcurrentDictionary<string, Movie> DataDict =
			 new ConcurrentDictionary<string, Movie>((new MoviesContext()).movies.ToDictionary(e => e.name));

		private User userModel = calculateUserModel();

		[HttpGet]
		// GET: api/movies
		public IEnumerable<Movie> Get() {
			return DataDict.Values;
		}

		[HttpGet("movie/{title}")]
		// GET: api/movies/movie/Babel
		public IActionResult Get(string title) {
			Movie value = null;
			return DataDict.TryGetValue(title, out value) ? (IActionResult) Ok(value) : Json(new object());
		}

		[HttpGet("suggested/{n}")]
		// GET: api/movies/suggested/10
		public IActionResult GetSuggested(string n) {
			if (DataDict.IsEmpty) {
				return Json(new object());
			} else {
				using(var db = new MoviesContext()) {
					return Ok(DataDict.ToList().OrderByDescending(x => predict(userModel, getModel(db, x.Value))).Take(int.Parse(n)).ToList());
				}
			}
		}

		[HttpGet("suggestnext/{movie}")]
		// GET: api/movies/suggestnext/Inception
		public IActionResult GetSuggestNext(string movie) {
			if (DataDict.IsEmpty) {
				return Json(new object());
			} else {
				using (var db = new MoviesContext()) {
					return Ok(DataDict.ToList().OrderBy(x => closeness(userModel, getModel(db, x.Value))).First());
				}
			}
		}

		[HttpGet("genres")]
		// GET: api/movies/genres
		public IActionResult GetGenres() {
			if (DataDict.IsEmpty || !DataDict.ToList().Where(x => x.Value.genre != null).Select(x => new {
                genres = x.Value.genre.Contains("|") ? x.Value.genre.Split('|') : new string[] {x.Value.genre}
            }).SelectMany(x => x.genres).GroupBy(x => x, x => x, (key, g) => {
				return new {
					genre = g.First()
				};
			}).Any()) {
				return Json(new object());
			} else {
				return Ok(DataDict.ToList().Where(x => x.Value.genre != null).Select(x => new {
                    genres = x.Value.genre.Contains("|") ? x.Value.genre.Split('|') : new string[] { x.Value.genre }
                }).SelectMany(x => x.genres).GroupBy(x => x, x => x, (key, g) => {
                    return new
                    {
                        genre = g.First()
                    };
                }));
			}
		}

		[HttpGet("genre/{genre}/{n}")]
		// GET: api/movies/genre/Action/5
		public IActionResult GetGenre(string genre, string n) {
			if (DataDict.IsEmpty || !DataDict.ToList().Where(x => x.Value.genre != null && x.Value.genre.ToLower().Contains(genre.ToLower())).Any()) {
				return Json(new object());
			} else {
				using (var db = new MoviesContext()) {
					return Ok(DataDict.ToList().Where(x => x.Value.genre != null && x.Value.genre.ToLower().Contains(genre.ToLower())).OrderByDescending(x => predict(userModel, getModel(db, x.Value))).Take(int.Parse(n)).ToList());
				}
			}
		}

		[HttpGet("search/{term}")]
		// GET: api/search/iron man
		public IActionResult GetSearch(string term) {
			term = term.Trim().ToLower();
			if (DataDict.IsEmpty || !DataDict.ToList().Where(x => x.Value.genre != null && x.Value.genre.ToLower() == term || x.Value.name.ToLower().Contains(term)).Any()) {
				return Json(new object());
			} else {
				var rng = new Random();
				return Ok(DataDict.ToList().Where(x => x.Value.genre != null && x.Value.genre.ToLower() == term || x.Value.name.ToLower().Contains(term)).OrderBy(x => rng.Next()).ToList());
			}
		}

		[HttpGet("rate/{movie}/{rating}")]
		// GET: api/search/iron man
		public IActionResult Rate(string movie, string rating) {
			using (var db = new MoviesContext()) {
				var entry = new Rating() { movie = movie, rating = int.Parse(rating) };
				if (!db.ratings.Contains(entry)) {
					db.ratings.Add(entry);
				}
				db.SaveChanges();
			}
			return Ok();
		}

		[HttpGet("scrape")]
		// GET: api/movies/scrape
		public IActionResult Scrape() {
			var url = "http://search.library.uq.edu.au/primo_library/libweb/action/search.do?ct=facet&fctN=facet_tlevel&fctV=online_resources&rfnGrp=show_only&vl(982830058UI0)=sub&vl(982830125UI2)=any&&indx=1&fn=search&vl(75285841UI5)=00&dscnt=0&vl(1UIStartWith0)=contains&vl(75285843UI5)=00&vl(1UIStartWith2)=contains&mode=Advanced&vid=61UQ&vl(982830065UI1)=any&tab=61uq_all&vl(freeText3)=&vl(75285840UI5)=00&vl(982043576UI4)=all_items&vl(freeText1)=&vl(75285844UI5)=00&vl(75285833UI2)=AND&dstmp=1472205979926&frbg=&vl(75285845UI5)=Year&vl(1UIStartWith3)=contains&tb=t&vl(982829999UI3)=any&vl(1UIStartWith1)=contains&vl(1057736829UI6)=audio_video&ct=search&srt=rank&Submit=Search&vl(75285833UI3)=AND&vl(freeText2)=&vl(75285833UI1)=AND&dum=true&vl(75285835UI0)=AND&vl(freeText0)=feature%20film&vl(75285842UI5)=Year";
			var count = getCount(url);

			Stopwatch sw = Stopwatch.StartNew();
			Parallel.For(-1, ((count - 1) / 20), i => {
				var n = i * 20;
				url = $"http://search.library.uq.edu.au/primo_library/libweb/action/search.do?ct=Next+Page&pag=nxt&indx={n}&pageNumberComingFrom=8&vl(982830058UI0)=sub&vl(982830125UI2)=any&fn=search&indx=9&dscnt=0&vl(75285841UI5)=00&vl(1UIStartWith0)=contains&vl(75285843UI5)=00&vl(1UIStartWith2)=contains&vid=61UQ&mode=Advanced&vl(982830065UI1)=any&rfnGrp=show_only&tab=61uq_all&vl(freeText3)=&vl(75285840UI5)=00&vl(freeText1)=&vl(982043576UI4)=all_items&vl(75285833UI2)=AND&vl(75285844UI5)=00&dstmp=1472253531990&frbg=&vl(75285845UI5)=Year&vl(1UIStartWith3)=contains&tb=t&vl(982829999UI3)=any&vl(1UIStartWith1)=contains&vl(1057736829UI6)=audio_video&fctV=online_resources&ct=Next%20Page&srt=rank&fctN=facet_tlevel&Submit=Search&vl(75285833UI3)=AND&vl(freeText2)=&vl(75285833UI1)=AND&vl(freeText0)=feature%20film&vl(75285835UI0)=AND&dum=true&vl(75285842UI5)=Year";
				getMovies(url);
			});

			sw.Stop();

			Debug.WriteLine("Time taken: {0}ms", sw.Elapsed.TotalMilliseconds);

			return Ok(url);
		}

		private int getCount(string url) {
			var client = new System.Net.Http.HttpClient();
			var source = client.GetStringAsync(url).Result;

			// Create a new parser front-end (can be re-used)
			var parser = new HtmlParser();
			//Just get the DOM representation
			var document = parser.Parse(source);

			var count = document.QuerySelector(".EXLDisplayedCount").NextElementSibling.TextContent;
			return int.Parse(count.Trim(), NumberStyles.AllowThousands);
		}

		private List<Tuple<string, string>> getMovies(string url) {
			var client = new System.Net.Http.HttpClient();
			var source = client.GetStringAsync(url).Result;

			// Create a new parser front-end (can be re-used)
			var parser = new HtmlParser();
			//Just get the DOM representation
			var document = parser.Parse(source);

			var titles = document.All.Where(m => m.ClassName == "EXLResultTitle");

			using (var db = new MoviesContext()) {
				foreach (var title in titles) {
					var link = "http://search.library.uq.edu.au/primo_library/libweb/action/" + title.FirstElementChild.GetAttribute("href");
					var video = getMovieLink(link);
					if (video == null) {
						continue;
					}
					var movie = new Movie() { name = cleanTitle(title.TextContent.Trim()), link = video };
					getMetadata(movie);
					if (movie.description == null) {
						continue;
					}

					try {
						if (!db.movies.Contains(movie)) {
							db.movies.Add(movie);
						}

						db.SaveChanges();
					} catch { }
				}

			}

			return new List<Tuple<string, string>> { new Tuple<string, string>("name", "filename") };
		}

		private string getMovieLink(string url) {
			url = Regex.Replace(url, @";jsessionid=*?", "?");
			var curl = new Process {
				StartInfo = new ProcessStartInfo {
					FileName = @"C:\cygwin64\bin\curl.exe",
					Arguments = url,
					UseShellExecute = false,
					RedirectStandardOutput = true,
					CreateNoWindow = true
				}
			};
			curl.Start();

			string source = "";
			while (!curl.StandardOutput.EndOfStream) {
				source += curl.StandardOutput.ReadLine();
			}

			// Create a new parser front-end (can be re-used)
			var parser = new HtmlParser();
			//Just get the DOM representation
			var document = parser.Parse(source);

			string link = null;
			try {
				link = document.QuerySelector(".EXLTabContent").FirstElementChild.GetAttribute("src");
			} catch { }
			if (link == null) {
				try {
					link = document.QuerySelector(".EXLDetailsLinksTitle").FirstElementChild.GetAttribute("href");
				} catch { }
			}
			if (link == null) {
				try {
					link = document.QuerySelector(".EXLFullDetailsOutboundLink").GetAttribute("href");
				} catch { }
			}
			if (link == null) {
				var test = Regex.Match(source, @"mget.php\?id=.+?(?=<)");
				Debug.WriteLine(url);
				return null;
			}


			var regex = new Regex(@"http://www.library.uq.edu.au/mget.php\?id=");
			if (regex.Match(link).Success) {
				var partial = link.Replace(@"http://www.library.uq.edu.au/mget.php?id=", "");
				var video = $"http://streaming.library.uq.edu.au/media/mp4/{partial}/{partial}_1.mp4";
				Debug.WriteLine(partial);
				return video;
			} else {
				Debug.WriteLine(link);
				return link;
			}

		}

		private void getMetadata(Movie movie) {
			var name = movie.name;
			var url = $"http://www.omdbapi.com/?t={name.Replace(' ', '+')}&y=&plot=short&r=json";
			var client = new System.Net.Http.HttpClient();
			var source = client.GetStringAsync(url).Result;

			var json = JsonConvert.DeserializeObject<omdb>(source);
			if (json.Response == "False") {
				return;
			}
			movie.year = int.Parse(Regex.Replace(json.Year, @"[^\d]", ""));
			movie.director = json.Director;
			movie.description = json.Plot;
			movie.genre = json.Genre.Split(',').First();
			movie.poster = json.Poster;
		}

		private class omdb {
			public string Title { get; set; }
			public string Year { get; set; }
			public string Rated { get; set; }
			public string Released { get; set; }
			public string Runtime { get; set; }
			public string Genre { get; set; }
			public string Director { get; set; }
			public string Writer { get; set; }
			public string Actors { get; set; }
			public string Plot { get; set; }
			public string Language { get; set; }
			public string Country { get; set; }
			public string Awards { get; set; }
			public string Poster { get; set; }
			public string Metascore { get; set; }
			public string imdbRating { get; set; }
			public string imdbVotes { get; set; }
			public string imdbID { get; set; }
			public string Type { get; set; }
			public string Response { get; set; }
		}

		private string cleanTitle(string title) {
			if (title.Split('.').First().Contains(title.Split('.').Last())) {
				var temp = title.Split('.').First();
				return temp;
			} else {
				return title;
			}
		}

		[HttpGet("link")]
		// GET: api/link
		public IActionResult Link(string term) {
			var moviesFile = System.IO.File.Open("movies.csv", FileMode.Open);
			var modelFile = System.IO.File.Open("X-results.csv", FileMode.Open);
			using (TextReader moviesReader = new StreamReader(moviesFile)) {
				using (TextReader modelReader = new StreamReader(modelFile)) {
					var movies = new CsvReader(moviesReader);
					var moviesRecords = movies.GetRecords<csvMovie>().ToList();

					var models = new CsvReader(modelReader);
					var modelsRecords = models.GetRecords<csvModel>().ToList();

					foreach (var name in DataDict.Keys) {
						var title = name.ToLower();
						if (title.Split(' ').First().ToLower() == "the") {
							title = title.Remove(0, 4);
						}
						var rows = moviesRecords.Where(r => r.title.ToLower().Contains(title));
						if (rows.Any()) {
							var row = rows.First();
							using (var db = new MoviesContext()) {
								var model = modelsRecords[int.Parse(row.movieId) - 1];
								var dbModel = new Model() {
									movie = name,
									values1 = float.Parse(model.values1),
									values2 = float.Parse(model.values2),
									values3 = float.Parse(model.values3),
									values4 = float.Parse(model.values4),
									values5 = float.Parse(model.values5),
									values6 = float.Parse(model.values6),
									values7 = float.Parse(model.values7),
									values8 = float.Parse(model.values8),
									values9 = float.Parse(model.values9),
									values10 = float.Parse(model.values10),
									values11 = float.Parse(model.values11),
									values12 = float.Parse(model.values12),
									values13 = float.Parse(model.values13),
									values14 = float.Parse(model.values14),
									values15 = float.Parse(model.values15),
									values16 = float.Parse(model.values16),
									values17 = float.Parse(model.values17),
									values18 = float.Parse(model.values18)
								};
								db.models.Add(dbModel);
								var dbMovie = db.movies.Where(m => m.name == name).First();
								dbMovie.genre = row.genres;
								db.SaveChanges();
							}
						}
					}
				}
			}


			return Ok("Done");
		}

		private class csvMovie {
			public string movieId { get; set; }
			public string title { get; set; }
			public string genres { get; set; }
		}

		public class csvModel {
			public string values1 { get; set; }
			public string values2 { get; set; }
			public string values3 { get; set; }
			public string values4 { get; set; }
			public string values5 { get; set; }
			public string values6 { get; set; }
			public string values7 { get; set; }
			public string values8 { get; set; }
			public string values9 { get; set; }
			public string values10 { get; set; }
			public string values11 { get; set; }
			public string values12 { get; set; }
			public string values13 { get; set; }
			public string values14 { get; set; }
			public string values15 { get; set; }
			public string values16 { get; set; }
			public string values17 { get; set; }
			public string values18 { get; set; }
		}

		private static User calculateUserModel() {
			var list = new List<Model>();
			using (var db = new MoviesContext()) {
				var models = db.models;
				foreach (var rating in db.ratings) {
					var model = models.ToList().Where(m => m.movie == rating.movie).First();
					list.Add(weight(model, (float) (rating.rating / 10.0)));
				}
			}
			var rng = new Random();
			var result = new User() {
				values1 = (float) rng.NextDouble(),
				values2 = (float) rng.NextDouble(),
				values3 = (float) rng.NextDouble(),
				values4 = (float) rng.NextDouble(),
				values5 = (float) rng.NextDouble(),
				values6 = (float) rng.NextDouble(),
				values7 = (float) rng.NextDouble(),
				values8 = (float) rng.NextDouble(),
				values9 = (float) rng.NextDouble(),
				values10 = (float) rng.NextDouble(),
				values11 = (float) rng.NextDouble(),
				values12 = (float) rng.NextDouble(),
				values13 = (float) rng.NextDouble(),
				values14 = (float) rng.NextDouble(),
				values15 = (float) rng.NextDouble(),
				values16 = (float) rng.NextDouble(),
				values17 = (float) rng.NextDouble(),
				values18 = (float) rng.NextDouble()
			};

			if (list.Any()) {
				result = new User() {
					values1 = list.Select(m => m.values1).Average(),
					values2 = list.Select(m => m.values2).Average(),
					values3 = list.Select(m => m.values3).Average(),
					values4 = list.Select(m => m.values4).Average(),
					values5 = list.Select(m => m.values5).Average(),
					values6 = list.Select(m => m.values6).Average(),
					values7 = list.Select(m => m.values7).Average(),
					values8 = list.Select(m => m.values8).Average(),
					values9 = list.Select(m => m.values9).Average(),
					values10 = list.Select(m => m.values10).Average(),
					values11 = list.Select(m => m.values11).Average(),
					values12 = list.Select(m => m.values12).Average(),
					values13 = list.Select(m => m.values13).Average(),
					values14 = list.Select(m => m.values14).Average(),
					values15 = list.Select(m => m.values15).Average(),
					values16 = list.Select(m => m.values16).Average(),
					values17 = list.Select(m => m.values17).Average(),
					values18 = list.Select(m => m.values18).Average()
				};
			}
			

			return result;
		}

		private static Model weight(Model model, float weight) {
			return new Model() {
				movie = model.movie,
				values1 = model.values1 * weight,
				values2 = model.values2 * weight,
				values3 = model.values3 * weight,
				values4 = model.values4 * weight,
				values5 = model.values5 * weight,
				values6 = model.values6 * weight,
				values7 = model.values7 * weight,
				values8 = model.values8 * weight,
				values9 = model.values9 * weight,
				values10 = model.values10 * weight,
				values11 = model.values11 * weight,
				values12 = model.values12 * weight,
				values13 = model.values13 * weight,
				values14 = model.values14 * weight,
				values15 = model.values15 * weight,
				values16 = model.values16 * weight,
				values17 = model.values17 * weight,
				values18 = model.values18 * weight
			};
		}

		private new class User {
			public float values1 { get; set; }
			public float values2 { get; set; }
			public float values3 { get; set; }
			public float values4 { get; set; }
			public float values5 { get; set; }
			public float values6 { get; set; }
			public float values7 { get; set; }
			public float values8 { get; set; }
			public float values9 { get; set; }
			public float values10 { get; set; }
			public float values11 { get; set; }
			public float values12 { get; set; }
			public float values13 { get; set; }
			public float values14 { get; set; }
			public float values15 { get; set; }
			public float values16 { get; set; }
			public float values17 { get; set; }
			public float values18 { get; set; }
		}

		private float predict(User user, Model movie) {
			var result = 0.0;
			result += user.values1 * movie.values1;
			result += user.values2 * movie.values2;
			result += user.values3 * movie.values3;
			result += user.values4 * movie.values4;
			result += user.values5 * movie.values5;
			result += user.values6 * movie.values6;
			result += user.values7 * movie.values7;
			result += user.values8 * movie.values8;
			result += user.values9 * movie.values9;
			result += user.values10 * movie.values10;
			result += user.values11 * movie.values11;
			result += user.values12 * movie.values12;
			result += user.values13 * movie.values13;
			result += user.values14 * movie.values14;
			result += user.values15 * movie.values15;
			result += user.values16 * movie.values16;
			result += user.values17 * movie.values17;
			result += user.values18 * movie.values18;

			return (float) result;
		}

		private float closeness(User user, Model movie) {
			var result = 0.0;
			result += Math.Abs(user.values1 - movie.values1);
			result += Math.Abs(user.values2 - movie.values2);
			result += Math.Abs(user.values3 - movie.values3);
			result += Math.Abs(user.values4 - movie.values4);
			result += Math.Abs(user.values5 - movie.values5);
			result += Math.Abs(user.values6 - movie.values6);
			result += Math.Abs(user.values7 - movie.values7);
			result += Math.Abs(user.values8 - movie.values8);
			result += Math.Abs(user.values9 - movie.values9);
			result += Math.Abs(user.values10 - movie.values10);
			result += Math.Abs(user.values11 - movie.values11);
			result += Math.Abs(user.values12 - movie.values12);
			result += Math.Abs(user.values13 - movie.values13);
			result += Math.Abs(user.values14 - movie.values14);
			result += Math.Abs(user.values15 - movie.values15);
			result += Math.Abs(user.values16 - movie.values16);
			result += Math.Abs(user.values17 - movie.values17);
			result += Math.Abs(user.values18 - movie.values18);

			return (float) result;
		}

		private Model getModel(MoviesContext db, Movie movie) {
			var models = db.models.Where(m => m.movie == movie.name);
			if (models.Any()) {
				return models.First();
			} else {
				var rng = new Random();
				return new Model() {
					movie = movie.name,
					values1 = (float) (rng.NextDouble() * 0.75),
					values2 = (float) (rng.NextDouble() * 0.75),
					values3 = (float) (rng.NextDouble() * 0.75),
					values4 = (float) (rng.NextDouble() * 0.75),
					values5 = (float) (rng.NextDouble() * 0.75),
					values6 = (float) (rng.NextDouble() * 0.75),
					values7 = (float) (rng.NextDouble() * 0.75),
					values8 = (float) (rng.NextDouble() * 0.75),
					values9 = (float) (rng.NextDouble() * 0.75),
					values10 = (float) (rng.NextDouble() * 0.75),
					values11 = (float) (rng.NextDouble() * 0.75),
					values12 = (float) (rng.NextDouble() * 0.75),
					values13 = (float) (rng.NextDouble() * 0.75),
					values14 = (float) (rng.NextDouble() * 0.75),
					values15 = (float) (rng.NextDouble() * 0.75),
					values16 = (float) (rng.NextDouble() * 0.75),
					values17 = (float) (rng.NextDouble() * 0.75),
					values18 = (float) (rng.NextDouble() * 0.75)
				};
			}
		}
	}
}
