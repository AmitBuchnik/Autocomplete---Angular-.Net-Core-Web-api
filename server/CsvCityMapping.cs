using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TinyCsvParser.Mapping;
using WorldCities.Models;

namespace WorldCities
{
    public class CsvCityMapping : CsvMapping<City>
    {
        public CsvCityMapping()
            : base()
        {
            MapProperty(0, x => x.Name);
            MapProperty(1, x => x.Country);
            MapProperty(2, x => x.SubCountry);
            MapProperty(3, x => x.GeonameId);
        }
    }
}
