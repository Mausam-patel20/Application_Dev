using System;
using Application_Auth.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Application_Auth.Data
{
	public class ApplicationDbContext: IdentityDbContext<ApplicationUser>
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext>options) : base(options)
		{

		}
		public DbSet<ApplicationUser> ApplicationUsers { get; set; }
	}
}

