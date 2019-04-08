using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Backend.Migrations
{
    public partial class newVendors : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VendorToProduct_Products_ProductID",
                table: "VendorToProduct");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorToProduct_Vendor_VendorID",
                table: "VendorToProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VendorToProduct",
                table: "VendorToProduct");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendor",
                table: "Vendor");

            migrationBuilder.RenameTable(
                name: "VendorToProduct",
                newName: "VendorToProducts");

            migrationBuilder.RenameTable(
                name: "Vendor",
                newName: "Vendors");

            migrationBuilder.RenameIndex(
                name: "IX_VendorToProduct_VendorID",
                table: "VendorToProducts",
                newName: "IX_VendorToProducts_VendorID");

            migrationBuilder.RenameIndex(
                name: "IX_VendorToProduct_ProductID",
                table: "VendorToProducts",
                newName: "IX_VendorToProducts_ProductID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VendorToProducts",
                table: "VendorToProducts",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendors",
                table: "Vendors",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorToProducts_Products_ProductID",
                table: "VendorToProducts",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorToProducts_Vendors_VendorID",
                table: "VendorToProducts",
                column: "VendorID",
                principalTable: "Vendors",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VendorToProducts_Products_ProductID",
                table: "VendorToProducts");

            migrationBuilder.DropForeignKey(
                name: "FK_VendorToProducts_Vendors_VendorID",
                table: "VendorToProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VendorToProducts",
                table: "VendorToProducts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Vendors",
                table: "Vendors");

            migrationBuilder.RenameTable(
                name: "VendorToProducts",
                newName: "VendorToProduct");

            migrationBuilder.RenameTable(
                name: "Vendors",
                newName: "Vendor");

            migrationBuilder.RenameIndex(
                name: "IX_VendorToProducts_VendorID",
                table: "VendorToProduct",
                newName: "IX_VendorToProduct_VendorID");

            migrationBuilder.RenameIndex(
                name: "IX_VendorToProducts_ProductID",
                table: "VendorToProduct",
                newName: "IX_VendorToProduct_ProductID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VendorToProduct",
                table: "VendorToProduct",
                column: "ID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Vendor",
                table: "Vendor",
                column: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_VendorToProduct_Products_ProductID",
                table: "VendorToProduct",
                column: "ProductID",
                principalTable: "Products",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VendorToProduct_Vendor_VendorID",
                table: "VendorToProduct",
                column: "VendorID",
                principalTable: "Vendor",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
