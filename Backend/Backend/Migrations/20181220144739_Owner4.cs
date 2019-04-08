using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Backend.Migrations
{
    public partial class Owner4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
    name: "CustomerID",
    table: "Companies",
    nullable: false,
    defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_CustomerID",
                table: "Companies",
                column: "CustomerID");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Customers_CustomerID",
                table: "Companies",
                column: "CustomerID",
                principalTable: "Customers",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
