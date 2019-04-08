using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLayer;
using Backend.Models;
using Backend.ViewModels;

namespace Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Mobile")]
    public class MobileController : Controller
    {
        private readonly BackendContext _context;

        public MobileController(BackendContext context)
        {
            _context = context;
        }

        [Route("GetVendors")]
        [HttpGet]
        public IEnumerable<VendorViewModel> GetVendors()
        {
            return _context.Vendors.Select(c => new VendorViewModel
            {
                ID = c.ID,
                Name = c.Name,
                Description = c.Description
            })
               .ToList();
        }

        [Route("GetCompanies")]
        [HttpGet]
        public IEnumerable<CompanyViewModel> GetCompanies()
        {
            return _context.Companies.Select(c => new CompanyViewModel
            {
                ID = c.ID,
                Name = c.Name,
                Description = c.Description
            })
               .ToList();
        }
    }
}