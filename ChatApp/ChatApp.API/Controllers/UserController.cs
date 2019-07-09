using Microsoft.AspNetCore.Mvc;
using ChatApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using AutoMapper;
using ChatApp.API.Dtos;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using System.Security.Claims;
using System;
using Microsoft.AspNetCore.Http;

namespace ChatApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("EnableCORS")]
    [AllowAnonymous]
    public class UserController : Controller
    {
        private readonly IChatRepository _repo;
        private readonly IMapper _mapper;
        public UserController(IChatRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersToReturn);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailsDto>(user);
            return Ok(userToReturn);
        }
        [HttpPut("{id?}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserForUpdateDto userForUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            //var currentUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var userFromRepo = await _repo.GetUser(id);
            // if (userFromRepo == null)
            //     return NotFound($"Could not find user with an ID of {id}");

            // if (currentUserId != userFromRepo.Id)
            //     return Unauthorized();
            
            _mapper.Map(userForUpdateDto, userFromRepo);
            if (await _repo.SaveAll())
                return NoContent();

            throw new Exception($"Updating user {id} failed on save");
        }
    }
}