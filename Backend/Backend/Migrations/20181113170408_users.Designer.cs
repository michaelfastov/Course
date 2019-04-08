﻿// <auto-generated />
using Backend.DataAccessLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Backend.Migrations
{
    [DbContext(typeof(BackendContext))]
    [Migration("20181113170408_users")]
    partial class users
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Backend.Models.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp");

                    b.Property<string>("Email");

                    b.Property<bool>("EmailConfirmed");

                    b.Property<long?>("FacebookId");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail");

                    b.Property<string>("NormalizedUserName");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("PictureUrl");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("AppUser");
                });

            modelBuilder.Entity("Backend.Models.Company", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("Backend.Models.CompanyToProduct", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CompanyID");

                    b.Property<int>("ProductID");

                    b.Property<int>("ProductQuantity");

                    b.Property<int>("ProductWeight");

                    b.HasKey("ID");

                    b.HasIndex("CompanyID");

                    b.HasIndex("ProductID");

                    b.ToTable("CompanyToProducts");
                });

            modelBuilder.Entity("Backend.Models.Customer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Gender");

                    b.Property<string>("IdentityId");

                    b.Property<string>("Locale");

                    b.Property<string>("Location");

                    b.HasKey("Id");

                    b.HasIndex("IdentityId");

                    b.ToTable("Customers");
                });

            modelBuilder.Entity("Backend.Models.Product", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Category");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("Backend.Models.Vendor", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.HasKey("ID");

                    b.ToTable("Vendor");
                });

            modelBuilder.Entity("Backend.Models.VendorToProduct", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ProductID");

                    b.Property<int>("ProductPrice");

                    b.Property<int>("ProductQuantity");

                    b.Property<int>("ProductWeight");

                    b.Property<int>("VendorID");

                    b.HasKey("ID");

                    b.HasIndex("ProductID");

                    b.HasIndex("VendorID");

                    b.ToTable("VendorToProduct");
                });

            modelBuilder.Entity("Backend.Models.CompanyToProduct", b =>
                {
                    b.HasOne("Backend.Models.Company", "Company")
                        .WithMany("CompaniesToProducts")
                        .HasForeignKey("CompanyID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Backend.Models.Product", "Product")
                        .WithMany("CompaniesToProducts")
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Backend.Models.Customer", b =>
                {
                    b.HasOne("Backend.Models.AppUser", "Identity")
                        .WithMany()
                        .HasForeignKey("IdentityId");
                });

            modelBuilder.Entity("Backend.Models.VendorToProduct", b =>
                {
                    b.HasOne("Backend.Models.Product", "Product")
                        .WithMany("VendorsToProducts")
                        .HasForeignKey("ProductID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Backend.Models.Vendor", "Vendor")
                        .WithMany("VendorsToProducts")
                        .HasForeignKey("VendorID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
