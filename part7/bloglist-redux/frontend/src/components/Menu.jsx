import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setNotification } from '../reducers/notoficationReducer'
import { logOut } from '../reducers/userReducer'
import { Button, Navbar, Nav, NavDropdown } from 'react-bootstrap'


const Menu = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const padding = {
        padding: 5
    }

    const handleLogout = () => {
        dispatch(logOut())
        dispatch(setNotification({
        content: 'Logged out successfully',
        style: 'success'
        }, 5))
        navigate('/')   
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className='rounded mb-3'>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link href="#" as="span" className='d-flex align-items-center'>
                    <Link style={padding} to="/">blogs</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span" className='d-flex align-items-center'>
                    <Link style={padding} to="/users">users</Link>
                </Nav.Link>
                <Nav.Link href="#" as="span" className='d-flex align-items-center'>
                    {user
                    ? 
                    <div className='d-flex align-items-center'>
                        <em style={padding}>{user.name} logged in</em>
                        <Button variant="secondary" onClick={handleLogout}>logout</Button>
                    </div> 
                    : <Link style={padding} to="/login">login</Link>
                    }
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Menu