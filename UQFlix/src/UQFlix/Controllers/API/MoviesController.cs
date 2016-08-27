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

namespace UQFlix.Controllers {
	[Route("api/[controller]")]
	public class MoviesController : Controller {
		private static readonly ConcurrentDictionary<long, Movie> DataDict =
			 new ConcurrentDictionary<long, Movie>();

		[HttpGet]
		// GET: api/movies
		public IEnumerable<Movie> Get() {
			return DataDict.Values;
		}

		[HttpGet("{id}")]
		// GET: api/movies/5
		public IActionResult Get(long id) {
			Movie value = null;
			return DataDict.TryGetValue(id, out value) ? (IActionResult) Ok(value) : NotFound();

		}

		[HttpGet("scrape")]
		// GET: api/movies/5
		public IActionResult Scrape() {

			var j = 0;
			for (int i = 0; i < 10; i++) {
				//try {
					//getMovieLink("http://search.library.uq.edu.au/primo_library/libweb/action/display.do?tabs=viewOnlineTab&gathStatTab=true&ct=display&fn=search&doc=61UQ_ALMA21108912770003131&indx=2&recIds=61UQ_ALMA21108912770003131&recIdxs=1&elementId=1&renderMode=poppedOut&displayMode=full&frbrVersion=&vl(982830058UI0)=sub&vl(982830125UI2)=any&vl(75285841UI5)=00&dscnt=0&vl(1UIStartWith0)=contains&vl(75285843UI5)=00&vl(1UIStartWith2)=contains&mode=Advanced&vid=61UQ&vl(982830065UI1)=any&rfnGrp=show_only&tab=61uq_all&vl(freeText3)=&vl(75285840UI5)=00&vl(982043576UI4)=all_items&vl(freeText1)=&vl(75285833UI2)=AND&vl(75285844UI5)=00&dstmp=1472257490949&frbg=&vl(1UIStartWith3)=contains&vl(75285845UI5)=Year&vl(1UIStartWith1)=contains&vl(982829999UI3)=any&tb=t&vl(1057736829UI6)=audio_video&fctV=online_resources&srt=rank&fctN=facet_tlevel&Submit=Search&vl(75285833UI3)=AND&vl(freeText2)=&vl(75285833UI1)=AND&dum=true&vl(75285835UI0)=AND&vl(freeText0)=feature%20film&vl(75285842UI5)=Year");
				//} catch {
				//	j += 1;
				//	Debug.WriteLine("problem");
				//}
			}

			//return Ok(j);

			var url = "http://search.library.uq.edu.au/primo_library/libweb/action/search.do?ct=facet&fctN=facet_tlevel&fctV=online_resources&rfnGrp=show_only&vl(982830058UI0)=sub&vl(982830125UI2)=any&&indx=1&fn=search&vl(75285841UI5)=00&dscnt=0&vl(1UIStartWith0)=contains&vl(75285843UI5)=00&vl(1UIStartWith2)=contains&mode=Advanced&vid=61UQ&vl(982830065UI1)=any&tab=61uq_all&vl(freeText3)=&vl(75285840UI5)=00&vl(982043576UI4)=all_items&vl(freeText1)=&vl(75285844UI5)=00&vl(75285833UI2)=AND&dstmp=1472205979926&frbg=&vl(75285845UI5)=Year&vl(1UIStartWith3)=contains&tb=t&vl(982829999UI3)=any&vl(1UIStartWith1)=contains&vl(1057736829UI6)=audio_video&ct=search&srt=rank&Submit=Search&vl(75285833UI3)=AND&vl(freeText2)=&vl(75285833UI1)=AND&dum=true&vl(75285835UI0)=AND&vl(freeText0)=feature%20film&vl(75285842UI5)=Year";
			var count = getCount(url);

			Stopwatch sw = Stopwatch.StartNew();
			Parallel.For(-20, (count - 20) / 100, n => {
				//System.Diagnostics.Debug.WriteLine(n);
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
					var movie = new Movie() { name = title.TextContent, link = video };

					db.movies.Add(movie);
					db.SaveChanges();
				}

			}

			return new List<Tuple<string, string>> { new Tuple<string, string>("name", "filename") };
		}

		private Uri getMovieLink(string url) {
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
				// do something with line
			}

			// Create a new parser front-end (can be re-used)
			var parser = new HtmlParser();
			//Just get the DOM representation
			var document = parser.Parse(source);
			
			var link = document.QuerySelector(".EXLTabContent").FirstElementChild.GetAttribute("src");
			if (link == null) {
				link = document.QuerySelector(".EXLDetailsLinksTitle").FirstElementChild.GetAttribute("href");
			}

			var regex = new Regex(@"http://www.library.uq.edu.au/mget.php\?id=");
			if (regex.Match(link).Success) {
				var partial = link.Replace(@"http://www.library.uq.edu.au/mget.php?id=", "");
				var video = $"http://streaming.library.uq.edu.au/media/mp4/{partial}/{partial}_1.mp4";
				Debug.WriteLine(partial);
				return new Uri(video);
			} else {
				Debug.WriteLine(link);
				return new Uri(link);
			}
			
		}

		private movieMetadata getMetadata(string name) {
			var result = new movieMetadata();

			return result;
		}
	}
}
