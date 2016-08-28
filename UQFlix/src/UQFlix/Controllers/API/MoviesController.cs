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
				var rng = new Random();
				return Ok(DataDict.ToList().OrderBy(x => rng.Next()).Take(int.Parse(n)).ToList());
			}
		}

		[HttpGet("suggestnext/{movie}")]
		// GET: api/movies/suggestednext/Inception
		public IActionResult GetSuggestNext(string movie) {
			if (DataDict.IsEmpty) {
				return Json(new object());
			} else {
				var rng = new Random();
				return Ok(DataDict.ToList().OrderBy(x => rng.Next()).First());
			}
		}

		[HttpGet("genres")]
		// GET: api/movies/genres
		public IActionResult GetGenres() {
			if (DataDict.IsEmpty || !DataDict.ToList().Where(x => x.Value.genre != null).GroupBy(x => x.Value.genre, x => x, (key, g) => {
				return new {
					genre = g.First()
				};
			}).Any()) {
				return Json(new object());
			} else {
				return Ok(DataDict.ToList().Where(x => x.Value.genre != null).GroupBy(x => x.Value.genre, x => x, (key, g) => {
					return new {
						genre = g.First().Value.genre
					};
				}));
			}
		}

		[HttpGet("genre/{genre}/{n}")]
		// GET: api/movies/genre/Action/5
		public IActionResult GetGenre(string genre, string n) {
			if (DataDict.IsEmpty || !DataDict.ToList().Where(x => x.Value.genre.ToLower().Contains(genre.ToLower())).Any()) {
				return Json(new object());
			} else {
				var rng = new Random();
				return Ok(DataDict.ToList().Where(x => x.Value.genre.ToLower().Contains(genre.ToLower())).OrderBy(x => rng.Next()).Take(int.Parse(n)).ToList());
			}
		}

		[HttpGet("search/{term}")]
		// GET: api/search/iron man
		public IActionResult GetSearch(string term) {
			term = term.Trim().ToLower();
			if (DataDict.IsEmpty || !DataDict.ToList().Where(x => x.Value.genre.ToLower() == term || x.Value.name.ToLower().Contains(term)).Any()) {
				return Json(new object());
			} else {
				var rng = new Random();
				return Ok(DataDict.ToList().Where(x => x.Value.genre.ToLower() == term || x.Value.name.ToLower().Contains(term)).OrderBy(x => rng.Next()).ToList());
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
	}
}
