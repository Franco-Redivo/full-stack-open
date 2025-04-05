import { useState, useEffect } from 'react';
import Filter from "./Components/Filter.jsx";
import getAll from "./services/countries.js";
import Content from "./Components/Content.jsx";


function App() {
  const [filterValue, setFilterValue] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [allCountries, setAllcountries] = useState([]);
  
  useEffect(() => {
    getAll().then((allCountries) => {
      setAllcountries(allCountries);
    });
  }, []);

  const handleFilter = (e) => {
    const newFilter = e.target.value;
    const countries =
      newFilter.trim().length === 0
        ? allCountries
        : allCountries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(newFilter.trim().toLowerCase())
          );
    setFilterValue(newFilter);
    setFilteredCountries(countries);
  }
  return (
    <>
      <Filter handleChange={handleFilter} value={filterValue}/>
      <Content countries={filteredCountries}/>
    </>
  )
}

export default App
