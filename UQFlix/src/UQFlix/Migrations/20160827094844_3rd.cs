using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UQFlix.Migrations
{
    public partial class _3rd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_movies",
                table: "movies");

            migrationBuilder.DropColumn(
                name: "ID",
                table: "movies");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "movies",
                nullable: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_movies",
                table: "movies",
                column: "name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_movies",
                table: "movies");

            migrationBuilder.AddColumn<Guid>(
                name: "ID",
                table: "movies",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "movies",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_movies",
                table: "movies",
                column: "ID");
        }
    }
}
