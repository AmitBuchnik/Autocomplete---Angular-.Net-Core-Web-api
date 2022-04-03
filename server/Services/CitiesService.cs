using System;
using System.Collections.Generic;
using System.Text;
using TinyCsvParser;
using WorldCities.Models;
using System.Linq;

namespace WorldCities.Services
{
    public interface ICitiesService
    {
        IEnumerable<string> GetCitiesByTerm(string term);
    }

    public class CitiesService : ICitiesService
    {

        public CitiesService()
        {
        }

        public IEnumerable<string> GetCitiesByTerm(string term)
        {
            CsvParserOptions csvParserOptions = new CsvParserOptions(true, ',');
            CsvCityMapping csvMapper = new CsvCityMapping();
            CsvParser<City> csvParser = new CsvParser<City>(csvParserOptions, csvMapper);
            var result = csvParser
                         .ReadFromFile(@"world-cities_csv.csv", Encoding.ASCII)
                         .ToList();

            return result.FindAll(x => x.Result.Name.ToLower().Contains(term.ToLower()))
                .Select(x => x.Result.Name).ToList();
        }
    }
}