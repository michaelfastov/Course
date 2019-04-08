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
    [Route("api/InvoiceItems")]
    public class InvoiceItemsController : Controller
    {
        private readonly BackendContext _context;

        public InvoiceItemsController(BackendContext context)
        {
            _context = context;
        }

        // GET: api/InvoiceItems
        [HttpGet]
        public IEnumerable<InvoiceItemViewModel> GetInvoiceItems()
        {
            return _context.InvoiceItems.Select(c => new InvoiceItemViewModel
            {
                ID = c.ID,
                InvoiceID = c.InvoiceID,
                ProductID = c.ProductID,
                ProductQuantity = c.ProductQuantity,
                ProductWeight = c.ProductWeight
            })
            .ToList();
        }


        [HttpGet("GetInvoiceItemsOfInvoice/{id}")]
        public IEnumerable<InvoiceItemViewModel> GetInvoiceItemsOfInvoice([FromRoute] int id)
        {
            var allInvoiceItems = GetInvoiceItems();
            List<InvoiceItemViewModel> myInvoiceItems = new List<InvoiceItemViewModel>();
            foreach (var ii in allInvoiceItems)
                if (ii.InvoiceID == id)
                    myInvoiceItems.Add(ii);

            return myInvoiceItems;
        }

        //[Route("GetInvoiceItemsOfCompanies")]
        //[HttpGet("{id}")]
        //public IEnumerable<InvoiceItemViewModel> GetInvoiceItemsOfCompanies([FromRoute] int invoiceId)
        //{
        //    var allInvoiceItems = GetInvoiceItems();
        //    List<InvoiceItemViewModel> myInvoiceItems = new List<InvoiceItemViewModel>();
        //    foreach (var ii in allInvoiceItems)
        //        if (ii.InvoiceID == invoiceId)
        //            myInvoiceItems.Add(ii);

        //    return myInvoiceItems;
        //}

        // GET: api/InvoiceItems/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoiceItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoiceItem = await _context.InvoiceItems.SingleOrDefaultAsync(m => m.ID == id);

            if (invoiceItem == null)
            {
                return NotFound();
            }

            return Ok(invoiceItem);
        }

        // PUT: api/InvoiceItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInvoiceItem([FromRoute] int id, [FromBody] InvoiceItem invoiceItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != invoiceItem.ID)
            {
                return BadRequest();
            }

            _context.Entry(invoiceItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InvoiceItemExists(id))
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

        // POST: api/InvoiceItems
        [HttpPost]
        public async Task<IActionResult> PostInvoiceItem([FromBody] InvoiceItem invoiceItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.InvoiceItems.Add(invoiceItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetInvoiceItem", new { id = invoiceItem.ID }, invoiceItem);
        }

        // DELETE: api/InvoiceItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceItem([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var invoiceItem = await _context.InvoiceItems.SingleOrDefaultAsync(m => m.ID == id);
            if (invoiceItem == null)
            {
                return NotFound();
            }

            _context.InvoiceItems.Remove(invoiceItem);
            await _context.SaveChangesAsync();

            return Ok(invoiceItem);
        }

        private bool InvoiceItemExists(int id)
        {
            return _context.InvoiceItems.Any(e => e.ID == id);
        }
    }
}