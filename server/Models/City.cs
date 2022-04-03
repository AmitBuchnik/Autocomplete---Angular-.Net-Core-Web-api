using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WorldCities.Models
{
    public class City
    {
        public string Name { get; set; }
        public string Country { get; set; }
        public string SubCountry { get; set; }
        public int GeonameId { get; set; }
    }
}
