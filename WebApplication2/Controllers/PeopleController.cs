using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System;
using System.Linq;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
	public class PeopleController : Controller
	{
		[Route("/peoples")]
		public ActionResult Index(int page = 1, int pageSize = 5)
		{
			int totalItems = GetStaticPeopleData().Count;

			int totalPages = (int)Math.Ceiling((double)totalItems / pageSize);
			List<Person> peopleData = GetStaticPeopleData();
			List<Person> paginatedData = peopleData.Skip((page - 1) * pageSize).Take(pageSize).ToList();
			ViewBag.PageNumber = page;
			ViewBag.TotalPages = totalPages;
			ViewBag.PageSize = pageSize;
			return View(paginatedData);
		}

		private List<Person> GetStaticPeopleData()
		{
			// Create and return static people data
			return new List<Person>
			{
			new Person { Name = "John Doe", Age = 25, City = "New York" },
			new Person { Name = "Amarnath", Age = 30, City = "Los Angeles" },
			new Person { Name = "Karthik", Age = 33, City = "Hyderabad" },
			new Person { Name = "Ajay", Age = 35, City = "Rutherford" },
			new Person { Name = "Daniel", Age = 30, City = "Hustan" },
			new Person { Name = "Jenny", Age = 33, City = "Paris" },
			new Person { Name = "Janne Doe", Age = 37, City = "Whitehouse" },
			new Person { Name = "Jennifer", Age = 31, City = "Los Angeles" },
			new Person { Name = "Jane Doe", Age = 30, City = "Hyderabad" },
			new Person { Name = "Jane Doe", Age = 40, City = "Los Angeles" },
			new Person { Name = "Sitakanth", Age = 30, City = "Banaglur" },
			new Person { Name = "Jane Doe", Age = 43, City = "Los Angeles" },
			new Person { Name = "Jane Doe", Age = 45, City = "Los Angeles" },
			new Person { Name = "Jane Doe", Age = 12, City = "Los Angeles" },
			new Person { Name = "Jane Doe", Age = 32, City = "Los Angeles" },
			new Person { Name = "Jane Doe", Age = 43, City = "Los Angeles" },
            // Add more entries as needed
        };
		}
	}
}