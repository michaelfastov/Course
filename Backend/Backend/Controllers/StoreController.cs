using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class StoreController : Controller
    { 
        private readonly IStoreService _service;

        public StoreController(IStoreService service)
        {
            _service = service;
        }

        //[HttpPost("AddTest")]
        //public Product IActionResult AddTest(string name)
        //{
        //    return _service.AddTest(name);
        //}

        [HttpGet("")]
        [HttpGet("Details")]
        public IActionResult Details(int id)
        {
            var company = _service.GetCompanyById(id);
            if (company == null)
            {
                //return HttpNotFound();
            }
            return Ok(company);
            //return this.View(company);
        }

        //[HttpGet("GetProductByName")]
        //public Product Browse(string product)
        //{
        //    var productModel = _service.GetProductByName(product);
        //    return productModel;
        //}

        [HttpGet("GetAllProducts")]
        public IList<string> Index()
        {
            var products = _service.GetProductNames();

            return products;
        }

        // GET: /Store/GenreMenu
        [HttpGet("ProductMenu")]
        //public ActionResult ProductMenu()
        public IEnumerable<Product> ProductMenu(int id)
        {
            var products = _service.GetAllProducts(id);

            //return this.PartialView(products);
            return products;
        }


    }
}