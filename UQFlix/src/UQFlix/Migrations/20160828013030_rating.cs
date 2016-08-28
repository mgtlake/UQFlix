using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UQFlix.Migrations
{
    public partial class rating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "models",
                columns: table => new
                {
                    movie = table.Column<string>(nullable: false),
                    values1 = table.Column<float>(nullable: false),
                    values10 = table.Column<float>(nullable: false),
                    values11 = table.Column<float>(nullable: false),
                    values12 = table.Column<float>(nullable: false),
                    values13 = table.Column<float>(nullable: false),
                    values14 = table.Column<float>(nullable: false),
                    values15 = table.Column<float>(nullable: false),
                    values16 = table.Column<float>(nullable: false),
                    values17 = table.Column<float>(nullable: false),
                    values18 = table.Column<float>(nullable: false),
                    values19 = table.Column<float>(nullable: false),
                    values2 = table.Column<float>(nullable: false),
                    values3 = table.Column<float>(nullable: false),
                    values4 = table.Column<float>(nullable: false),
                    values5 = table.Column<float>(nullable: false),
                    values6 = table.Column<float>(nullable: false),
                    values7 = table.Column<float>(nullable: false),
                    values8 = table.Column<float>(nullable: false),
                    values9 = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_models", x => x.movie);
                });

            migrationBuilder.CreateTable(
                name: "ratings",
                columns: table => new
                {
                    movie = table.Column<string>(nullable: false),
                    rating = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ratings", x => x.movie);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "models");

            migrationBuilder.DropTable(
                name: "ratings");
        }
    }
}
