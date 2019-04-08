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
using Microsoft.AspNetCore.Authorization;

using System.Security.Claims;
using System.IO;

using LiqPay;
using LiqPay.SDK;
using Newtonsoft.Json;
using LiqPay.SDK.Dto;
using System.Runtime.Serialization;
using LiqPay.SDK.Dto.Enums;

namespace Backend.Controllers
{
    //[Authorize(Policy = "Admin")]
    //[Authorize(Policy = "ApiUser")]
    [Produces("application/json")]
    [Route("api/Companies")]
    public class CompaniesController : Controller
    {
        private readonly BackendContext _context;
        private readonly ClaimsPrincipal _caller;

        public CompaniesController(BackendContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _caller = httpContextAccessor.HttpContext.User;
        }


        public static bool isOwner(int companyId, ClaimsPrincipal _caller, BackendContext _context)
        {
            var userId = _caller.Claims.Single(c => c.Type == "id");
            var customer = _context.Customers.Include(c => c.Identity).Single(c => c.Identity.Id == userId.Value);

            var company = _context.Companies.SingleOrDefault(m => m.ID == companyId);
            if (customer.ID == company.CustomerID) return true;
            return false;
        }

        [HttpGet("getCompanyInvoiceItems/{id}")]
        public IEnumerable<InvoiceItemViewModel> getCompanyInvoiceItems([FromRoute] int id)
        {
            List<InvoiceViewModel> companysInvoices = new List<InvoiceViewModel>();
            List<InvoiceItemViewModel> companysInvoiceItems = new List<InvoiceItemViewModel>();

            var allInvoices = _context.Invoices.Select(c => new InvoiceViewModel
            {
                ID = c.ID,
                VendorID = c.VendorID,
                CompanyID = c.CompanyID,
                Date = c.Date,
                isAccepted = c.isAccepted,
                isDelivered = c.isDelivered
            }).ToList();

            var allInvoiceItems = _context.InvoiceItems.Select(c => new InvoiceItemViewModel
            {
                ID = c.ID,
                InvoiceID = c.InvoiceID,
                ProductID = c.ProductID,
                ProductQuantity = c.ProductQuantity,
                ProductWeight = c.ProductWeight
            })
            .ToList();

            for (int i = 0; i < allInvoices.Count(); i++)
            {
                if (allInvoices[i].CompanyID == id) companysInvoices.Add(allInvoices[i]);
            }

            for (int i = 0; i < companysInvoices.Count(); i++)
            {
                for (int j = 0; j < allInvoiceItems.Count(); j++)
                {
                    if (companysInvoices[i].ID == allInvoiceItems[j].InvoiceID)
                        companysInvoiceItems.Add(allInvoiceItems[j]);
                }

            }
            return companysInvoiceItems;


        }



        [Route("getMyCompanies")]
        [HttpGet]
        public IEnumerable<CompanyViewModel> getMyCompanies()
        {
            List<CompanyViewModel> myCompanies = new List<CompanyViewModel>();
            var Companies = _context.Companies.Select(c => new CompanyViewModel
            {
                ID = c.ID,
                Name = c.Name,
                Description = c.Description,
                CustomerID = c.CustomerID
            })
               .ToList();

            foreach (var company in Companies)
                if (isOwner(company.ID, _caller, _context)) myCompanies.Add(company);
            //myCompanies.Add
            return myCompanies;
        }

        // GET: api/Companies
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

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCompany([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var company = await _context.Companies.SingleOrDefaultAsync(m => m.ID == id);

            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

        // PUT: api/Companies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany([FromRoute] int id, [FromBody] Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != company.ID)
            {
                return BadRequest();
            }

            _context.Entry(company).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Companies
        [HttpPost]
        public async Task<IActionResult> PostCompany([FromBody] Company company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var userId = _caller.Claims.Single(c => c.Type == "id");
            var customer = _context.Customers.Include(c => c.Identity).Single(c => c.Identity.Id == userId.Value);
            company.CustomerID = customer.ID;

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompany", new { id = company.ID }, company);
        }



        [Route("buyProduct")]
        [HttpPost]
        public async Task<IActionResult> buyProduct([FromBody] InvoiceItem invoiceItemFake)
        {
            int companyID = invoiceItemFake.InvoiceID;//kostil
            int productID = invoiceItemFake.ProductID;
            int quantity = invoiceItemFake.ProductQuantity;
            string path = @"A:\Универ\3 курс\WriteText.txt";
            var invoiceItems = getCompanyInvoiceItems(companyID);





            int havingQuantity = 0;
            foreach (var ii in invoiceItems)
            {


                if (ii.ProductID == productID)
                    havingQuantity += ii.ProductQuantity;
            }



            if (havingQuantity < quantity) return BadRequest(ModelState);




            //foreach (var ii in invoiceItems)
            //{


            //    var invoiceItem1 = await _context.InvoiceItems.SingleOrDefaultAsync(m => m.ID == ii.ID);
            //    invoiceItem1.ProductQuantity -= 1;
            //    _context.Entry(invoiceItem1).State = EntityState.Modified;
            //    await _context.SaveChangesAsync();
            //}

            foreach (var ii in invoiceItems)
            {
                if (ii.ProductID == productID)
                {
                    if (quantity >= ii.ProductQuantity)
                    {
                        quantity -= ii.ProductQuantity;
                        //DeleteInvoiceItem
                        var invoiceItem1 = await _context.InvoiceItems.SingleOrDefaultAsync(m => m.ID == ii.ID);
                        if (invoiceItem1 == null)
                        {
                            return NotFound();
                        }

                        _context.InvoiceItems.Remove(invoiceItem1);
                        await _context.SaveChangesAsync();
                    }
                    else
                    { 
                        var invoiceItem1 = await _context.InvoiceItems.SingleOrDefaultAsync(m => m.ID == ii.ID);
                        invoiceItem1.ProductQuantity -= quantity;
                        _context.Entry(invoiceItem1).State = EntityState.Modified;
                        await _context.SaveChangesAsync();
                        break;
                    }
                }
            }

            var data = CreateDefaultTestRequest();

            LiqPayViewModel lpvm = new LiqPayViewModel();
            lpvm.data = data["data"];
            lpvm.signature = data["data"];
            return Ok(data);


        }


        public static string publicKey = "i20223994800";
        static string privateKey = "BGWV9rgDTLgkCr1PxFo9bTIGeFSvt8lTzLBgjEsb";
        LiqPayClient lp = new LiqPayClient(publicKey, privateKey);



        private Dictionary<string, string> CreateDefaultTestRequest()
        {
            var invoiceParams = new LiqPayRequest
            {
                Version = 3,
                PublicKey = "i20223994800",
                Action = LiqPayRequestAction.Pay,
                Amount = 1,
                Currency = "UAH",
                Description = "Test Description",
                IsSandbox = true
            };

            //return invoiceParams;
            return lp.PrepareRequestData(invoiceParams);
            //Dictionary<string, string>
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var company = await _context.Companies.SingleOrDefaultAsync(m => m.ID == id);
            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return Ok(company);
        }

        private bool CompanyExists(int id)
        {
            return _context.Companies.Any(e => e.ID == id);
        }
    }
}