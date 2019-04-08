using Backend.DataAccessLayer;
using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public class StoreService : IStoreService
    {
        private readonly BackendContext storeDB;
        public StoreService(BackendContext storeDB)
        {
            this.storeDB = storeDB;
        }

        public IList<string> GetProductNames()
        {
            var products = from product in this.storeDB.Products
                           select product.Name;

            return products.ToList();
        }

        public IList<Product> GetAllProducts(int max)
        {
            return max > 0 ? this.storeDB.Products.Take(max).ToList() : this.storeDB.Products.ToList();
        }

        //public Product GetProductByName(string name)
        //{
        //    var product = this.storeDB.Products.Include("Products").Single(p => p.Name == name);

        //    return product;
        //}

        public Company GetCompanyById(int id)
        {
            var company = this.storeDB.Companies.Single(a => a.ID == id);

            return company;
        }
        //public Product AddTest(string name)
        //{
        //    Product product = new Product();
        //    product.Name = name;
        //    storeDB.Products.Add(product);
        //    return product;
        //}



        
    }
}
