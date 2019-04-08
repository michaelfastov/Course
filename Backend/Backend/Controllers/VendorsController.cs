using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.DataAccessLayer;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Backend.ViewModels;

using System.Security.Claims;

namespace Backend.Controllers
{
    [Produces("application/json")]
    [Route("api/Vendors")]
    //[Authorize(Policy = "Admin")]
    //[Authorize(Policy = "ApiUser")]
    public class VendorsController : Controller
    {
        private readonly BackendContext _context;
        private readonly ClaimsPrincipal _caller;

        public VendorsController(BackendContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _caller = httpContextAccessor.HttpContext.User;
        }

            public static bool isOwner(int venodrId, ClaimsPrincipal _caller, BackendContext _context)
        {
            var userId = _caller.Claims.Single(c => c.Type == "id");
            var customer = _context.Customers.Include(c => c.Identity).Single(c => c.Identity.Id == userId.Value);

            var vendor = _context.Vendors.SingleOrDefault(m => m.ID == venodrId);
            if (customer.ID == vendor.CustomerID) return true;
            return false;
        }

        // GET: api/Vendors
        [HttpGet]
        public IEnumerable<VendorViewModel> GetVendors()
        {
            return _context.Vendors.Select(c => new VendorViewModel
            {
                ID = c.ID,
                Name = c.Name,
                Description = c.Description,
                CustomerID = c.CustomerID
            })
               .ToList();
        }

        // GET: api/Vendors/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVendor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vendor = await _context.Vendors.SingleOrDefaultAsync(m => m.ID == id);

            if (vendor == null)
            {
                return NotFound();
            }

            return Ok(vendor);
        }

        [Route("getMyVendors")]
        [HttpGet]
        public IEnumerable<VendorViewModel> getMyVendors()
        {
            List<VendorViewModel> myVendors = new List<VendorViewModel>();
            var Vendors = _context.Vendors.Select(c => new VendorViewModel
            {
                ID = c.ID,
                Name = c.Name,
                Description = c.Description,
                CustomerID = c.CustomerID
            })
               .ToList();

            foreach (var vendor in Vendors)
                if (isOwner(vendor.ID, _caller, _context)) myVendors.Add(vendor);
            //myCompanies.Add
            return myVendors;
        }

        // PUT: api/Vendors/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVendor([FromRoute] int id, [FromBody] Vendor vendor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vendor.ID)
            {
                return BadRequest();
            }

            _context.Entry(vendor).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VendorExists(id))
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

        // POST: api/Vendors
        [HttpPost]
        public async Task<IActionResult> PostVendor([FromBody] Vendor vendor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Vendors.Add(vendor);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetVendor", new { id = vendor.ID }, vendor);
        }

        // DELETE: api/Vendors/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVendor([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var vendor = await _context.Vendors.SingleOrDefaultAsync(m => m.ID == id);
            if (vendor == null)
            {
                return NotFound();
            }

            _context.Vendors.Remove(vendor);
            await _context.SaveChangesAsync();

            return Ok(vendor);
        }

        private bool VendorExists(int id)
        {
            return _context.Vendors.Any(e => e.ID == id);
        }
    }
}