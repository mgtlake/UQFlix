using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace UQFlix.Models {
	public class MoviesContext : DbContext {
		public DbSet<Movie> movies { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
			optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=MyDatabase;Trusted_Connection=True;");
		}
	}

	public class Movie {
		public string name { get; set; }
		public Uri link { get; set; }

		public movieMetadata metadata { get; set; }
	}

	public class movieMetadata {
		public int year { get; set; }
		public string director { get; set; }
		public string description { get; set; }
		public HashSet<string> genres { get; set; }
		public Uri poster { get; set; }
	}
}
