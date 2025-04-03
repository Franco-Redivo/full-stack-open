const Filter = ({handleFilter, filterValue}) => {
    return (
        <div>
        filter shown with <input type='text' onChange={handleFilter} value={filterValue}></input>
        </div>
    )
}

export default Filter;