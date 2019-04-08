using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLayer;
using Backend.Models;

using System.Security.Claims;
using Backend.ViewModels;

namespace Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Invoices")]
    public class InvoicesController : Controller
    {
        private readonly BackendContext _context;
        private readonly ClaimsPrincipal _caller;

        public InvoicesController(BackendContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _caller = httpContextAccessor.HttpContext.User;
        }

        // GET: api/Invoices
        [HttpGet]
        public IEnumerable<Invoice> GetInvoices()
        {
            return _context.Invoices;
        }

        [Route("GetInvoicesCompany")]
        [HttpGet]
        public IEnumerable<InvoiceViewModel> GetInvoicesCompany()
        {
            List<CompanyViewModel> myCompanies = new List<CompanyViewModel>();
            List<InvoiceViewModel> myInvoices = new List<InvoiceViewModel>();

            var Companies = _context.Companies.Select(c => new CompanyViewModel
            {
                ID = c.ID,
                Name = c.Name,
                Description = c.Description,
                CustomerID = c.CustomerID
            })
               .ToList();

            foreach (var company in Companies)
                if (CompaniesController.isOwner(company.ID,_caller,_context)) myCompanies.Add(company);

            var allInvoices = _context.Invoices.Select(c => new InvoiceViewModel
            {
                ID = c.ID,
                VendorID = c.VendorID,
                CompanyID = c.CompanyID,
                Date = c.Date,
                isAccepted =c.isAccepted,
                isDelivered = c.isDelivered
            })
               .ToList();

            for(int i = 0; i < allInvoices.Count(); i++)
            {
                for(int j = 0; j < myCompanies.Count(); j++)
                {
                    if (allInvoices[i].CompanyID == myCompanies[j].ID)
                        myInvoices.Add(allInvoices[i]);
                }
            }

            return myInvoices;
        }

        [Route("GetInvoicesVendor")]
        [HttpGet]
        public IEnumerable<InvoiceViewModel> GetInvoicesVendor()
        {
            List<VendorViewModel> myVendors = new List<VendorViewModel>();
            List<InvoiceViewModel> myInvoices = new List<InvoiceViewModel>();

            var Vendors = _context.Vendors.Select(c => new VendorViewModel
            {
                ID = c.ID,
                Name = c.Name,
                Description = c.Description,
                CustomerID = c.CustomerID
            })
               .ToList();

            foreach (var vendor in Vendors)
                if (VendorsController.isOwner(vendor.ID, _caller, _context)) myVendors.Add(vendor);

            var allInvoices = _context.Invoices.Select(c => new InvoiceViewModel
            {
                ID = c.ID,
                VendorID = c.VendorID,
                CompanyID = c.CompanyID,
                Date = c.Date,
                isAccepted = c.isAccepted,
                isDelivered = c.isDelivered
            })
               .ToList();

            for (int i = 0; i < allInvoices.Count(); i++)
            {
                for (int j = 0; j < myVendors.Count(); j++)
                {
                    if (allInvoices[i].CompanyID == myVendors[j].ID)
                        myInvoices.Add(allInvoices[i]);
                }
            }

            return myInvoices;
        }

        // GET: api/Invoices/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoice([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoice = await _context.Invoices.SingleOrDefaultAsync(m => m.ID == id);

            if (invoice == null)
            {
                return NotFound();
            }

            return Ok(invoice);
        }

        


        // PUT: api/Invoices/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoice([FromRoute] int id, [FromBody] Invoice invoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != invoice.ID)
            {
                return BadRequest();
            }

            _context.Entry(invoice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceExists(id))
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

        // POST: api/Invoices
        [HttpPost]
        public async Task<IActionResult> PostInvoice([FromBody] Invoice invoice)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoice", new { id = invoice.ID }, invoice);
        }

        // DELETE: api/Invoices/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoice([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoice = await _context.Invoices.SingleOrDefaultAsync(m => m.ID == id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.Invoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return Ok(invoice);
        }

        private bool InvoiceExists(int id)
        {
            return _context.Invoices.Any(e => e.ID == id);
        }
    }
}