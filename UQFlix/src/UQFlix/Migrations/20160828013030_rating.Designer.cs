using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using UQFlix.Models;

namespace UQFlix.Migrations
{
    [DbContext(typeof(MoviesContext))]
    [Migration("20160828013030_rating")]
    partial class rating
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.0-rtm-21431")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("UQFlix.Models.Model", b =>
                {
                    b.Property<string>("movie");

                    b.Property<float>("values1");

                    b.Property<float>("values10");

                    b.Property<float>("values11");

                    b.Property<float>("values12");

                    b.Property<float>("values13");

                    b.Property<float>("values14");

                    b.Property<float>("values15");

                    b.Property<float>("values16");

                    b.Property<float>("values17");

                    b.Property<float>("values18");

                    b.Property<float>("values19");

                    b.Property<float>("values2");

                    b.Property<float>("values3");

                    b.Property<float>("values4");

                    b.Property<float>("values5");

                    b.Property<float>("values6");

                    b.Property<float>("values7");

                    b.Property<float>("values8");

                    b.Property<float>("values9");

                    b.HasKey("movie");

                    b.ToTable("models");
                });

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

            modelBuilder.Entity("UQFlix.Models.Rating", b =>
                {
                    b.Property<string>("movie");

                    b.Property<int>("rating");

                    b.HasKey("movie");

                    b.ToTable("ratings");
                });
        }
    }
}
