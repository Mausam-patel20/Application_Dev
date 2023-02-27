using System;
using Microsoft.AspNetCore.Identity;

namespace Application_Auth.Models
{
	public class ApplicationUser: IdentityUser
	{
		public string Name { get; set; }
	}
}

