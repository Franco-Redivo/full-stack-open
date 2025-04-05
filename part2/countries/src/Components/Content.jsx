import Countries from "./Countries.jsx";
import Country from "./Country.jsx";

const Content = ({countries, handleCountrySelect}) => {
    if(countries.length > 10){
        return <p>Too many matches ({countries.length}),be more specific</p>
    }

    if(countries.length <= 10 && countries.length > 1){
        return <Countries countries={countries} onShow={handleCountrySelect}/>
    }

    if(countries.length === 1){
        return <Country countries={countries}/>
    }

    return<p>No matches</p>;
}

export default Content;