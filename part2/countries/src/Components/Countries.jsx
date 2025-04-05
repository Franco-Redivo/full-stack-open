const Countries = ({countries, onShow}) => {
    return (
        <div>
            {countries.map(country => {
                return(
                    <div key={country.name.common}>
                        <p>{country.name.common} 
                            <button onClick={() => onShow(country)}>Show</button>
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default Countries;