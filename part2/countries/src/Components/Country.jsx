const Country = ({countries}) => {
    const country = countries[0];

    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map((languaje,index) => (
                    <li key={index}>{languaje}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
        </div>
    );
}

export default Country;