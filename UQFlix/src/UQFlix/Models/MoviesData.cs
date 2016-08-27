using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UQFlix.Models {
	public class MoviesContext : DbContext {
		public DbSet<Movie> movies { get; set; }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
			optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=Movies;Trusted_Connection=True;");
		}
	}

	public class Movie {
		[Key]
		public string name { get; set; }
		public string link { get; set; }

		public int year { get; set; }
		public string director { get; set; }
		public string description { get; set; }
		public string genre { get; set; }
		public string poster { get; set; }
	}
}
