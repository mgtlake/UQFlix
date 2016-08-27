using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using UQFlix.Models;

namespace UQFlix.Migrations
{
    [DbContext(typeof(MoviesContext))]
    [Migration("20160827094844_3rd")]
    partial class _3rd
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("UQFlix.Models.Movie", b =>
                {
                    b.Property<string>("name");

                    b.Property<string>("description");

                    b.Property<string>("director");

                    b.Property<string>("genre");

                    b.Property<string>("link");

                    b.Property<string>("poster");

                    b.Property<int>("year");

                    b.HasKey("name");

                    b.ToTable("movies");
                });
        }
    }
}
