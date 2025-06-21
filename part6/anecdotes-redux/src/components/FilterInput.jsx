import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from 'react-redux'

const FilterInput = () => {
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const content = event.target.value
        dispatch(filterChange(content))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange}/>
        </div>
    )
}

export default FilterInput