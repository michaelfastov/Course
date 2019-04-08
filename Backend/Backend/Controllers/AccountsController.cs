using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.DataAccessLayer;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using Backend.ViewModels;
using Backend.Helpers;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class AccountsController : Controller
    {
        private readonly BackendContext _appDbContext;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;

        public AccountsController(UserManager<AppUser> userManager, IMapper mapper, BackendContext appDbContext)
        {
            _userManager = userManager;
            _mapper = mapper;
            _appDbContext = appDbContext;
        }

        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userIdentity = _mapper.Map<AppUser>(model);

            var result = await _userManager.CreateAsync(userIdentity, model.Password);

            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));

            await _appDbContext.Customers.AddAsync(new Customer { IdentityId = userIdentity.Id, Location = model.Location });
            await _appDbContext.SaveChangesAsync();

            return new OkObjectResult("Account created");
        }

        //[HttpGet]
        //public int getId(string email)
        //{
        //    var user = _userManager.FindByEmailAsync(email);
        //    foreach (var i in _appDbContext.Customers)
        //    {
        //        if (i.IdentityId == user.Id.ToString()) return i.ID;
        //    }
        //    return 0;

        //    //var userToVerify =  _mapper.Map<AppUser>(userName);
        //    //int res = _appDbContext.Customers.Select(m => m.IdentityId == userToVerify.Id);
        //    //return userToVerify.Id;
        //}
    }
}