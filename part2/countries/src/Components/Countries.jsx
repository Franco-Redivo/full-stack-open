const Countries = ({countries}) => {
    return (
        <div>
            {countries.map(country => {
                return(
                    <p key={country.name.common}>
                        {country.name.common}
                    </p>
                );
            })}
        </div>
    );
}

export default Countries;