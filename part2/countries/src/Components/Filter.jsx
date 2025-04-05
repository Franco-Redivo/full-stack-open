const Filter = ({handleChange, value}) => {
    return (
        <div>
        find countries <input type='text' onChange={handleChange} value={value}></input>
        </div>
    )
}

export default Filter;