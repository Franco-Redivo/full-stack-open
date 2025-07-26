import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notoficationReducer'
import { logOut } from '../reducers/userReducer'

const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logOut())
        dispatch(setNotification({
        content: 'Logged out successfully',
        style: 'message'
        }, 5))
        navigate('/')
    }
    return (
        <div>
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
            <div>
                <span>{user.name} logged in</span>
                <button onClick={handleLogout}>logout</button>
            </div>
        </div>
    )
}

export default Menu