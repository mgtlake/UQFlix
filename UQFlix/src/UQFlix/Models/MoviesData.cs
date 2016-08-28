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
		public DbSet<Rating> ratings { get; set; }
		public DbSet<Model> models { get; set; }

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

	public class Rating {
		[Key]
		[ForeignKey("Movie")]
		public string movie { get; set; }
		public int rating { get; set; }
	}

	public class Model {
		[Key]
		[ForeignKey("Movie")]
		public string movie { get; set; }

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
}
