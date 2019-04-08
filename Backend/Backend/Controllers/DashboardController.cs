using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Backend.DataAccessLayer;
using Backend.Helpers;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    //[Authorize(Policy = "Admin")]
    //[Authorize(Policy = "ApiUser")]
    [Route("api/[controller]/[action]")]
    public class DashboardController : Controller
    {
        private readonly ClaimsPrincipal _caller;
        private readonly BackendContext _appDbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public DashboardController(UserManager<AppUser> userManager, BackendContext appDbContext, IHttpContextAccessor httpContextAccessor)
        {
            _caller = httpContextAccessor.HttpContext.User;
            _appDbContext = appDbContext;
            _httpContextAccessor = httpContextAccessor;
        }

        // GET api/dashboard/home

        [HttpGet]
        public async Task<IActionResult> Home()
        {
            // retrieve the user info
            //HttpContext.User
            //return new OkObjectResult(_httpContextAccessor.HttpContext.User.Claims);
                var userId = _caller.Claims.Single(c => c.Type == "id");

            var customer = await _appDbContext.Customers.Include(c => c.Identity).SingleAsync(c => c.Identity.Id == userId.Value);

            return new OkObjectResult(new
            {
                customer.ID,
                Message = "This is secure API and user data!",
                customer.Identity.FirstName,
                customer.Identity.LastName,
                customer.Identity.PictureUrl,
                customer.Identity.FacebookId,
                customer.Location,
                customer.Locale,
                customer.Gender
            });
        }


        [HttpGet]
        public async Task<IActionResult> getID()
        {
            // retrieve the user info
            //HttpContext.User
            //return new OkObjectResult(_httpContextAccessor.HttpContext.User.Claims);
            var userId = _caller.Claims.Single(c => c.Type == "id");

            var customer = await _appDbContext.Customers.Include(c => c.Identity).SingleAsync(c => c.Identity.Id == userId.Value);

            return new OkObjectResult(new
            {
                customer.ID
            });
        }
        //[HttpGet]
        //public async Task<IActionResult> getIdByEmail(string email)
        //{
        //    var id = _appDbContext.Customers.Select(i=>i.)
        //}

    }
}