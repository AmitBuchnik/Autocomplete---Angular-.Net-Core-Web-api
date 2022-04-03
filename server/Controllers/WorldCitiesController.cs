using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using WorldCities.Services;

namespace WorldCities.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorldCitiesController : ControllerBase
    {
        private ICitiesService _citiesService;

        private readonly IConfiguration _configuration;

        public WorldCitiesController(IConfiguration configuration, ICitiesService citiesService)
        {
            _configuration = configuration;
            _citiesService = citiesService;
        }

        [HttpGet("{term}")]
        public IEnumerable<string> GetCitiesByTerm(string term)
        {
            try
            {
                return _citiesService.GetCitiesByTerm(term);
            }
            catch (Exception ex)
            {
                // return error message if there was an exception
                throw new HttpRequestException(ex.Message);
            }
        }
    }
}
