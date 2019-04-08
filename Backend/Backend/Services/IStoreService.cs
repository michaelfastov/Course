using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Services
{
    public interface IStoreService
    {
        IList<string> GetProductNames();

        IList<Product> GetAllProducts(int max = 0);

        // Product GetProductByName(string name);

        Company GetCompanyById(int id);
    }

}
