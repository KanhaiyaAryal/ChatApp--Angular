using System;
using Microsoft.AspNetCore.Http;

namespace ChatApp.API.Helpers
{
    public static class Extensions
    {
        public static void AddApplicationError(this HttpResponse respone, string message)
        {
            respone.Headers.Add("Application-Error",message);
            respone.Headers.Add("Access-Control-Expose-Headers","Application-Errors");
            respone.Headers.Add("Access-Control-Allow-Orign","*");
        }
        public static int CalculateAge(this DateTime theDateTime)
        {
            var age = DateTime.Today.Year - theDateTime.Year;

            if(theDateTime.AddYears(age) > DateTime.Today) {
                age --;
            }
            return age;   
        }
    }
}