using System.ComponentModel.DataAnnotations;

namespace ChatApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You must specify the password between 8 and 4 characters")]
        public string Password { get; set; }
    }
}