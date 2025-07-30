import { useSelector } from "react-redux";
import { Alert } from 'react-bootstrap';

const Notification = () => {
    const notification = useSelector(state => state.notifications)
    
    if (!notification || notification.content === ''){
        return null;
    }

    return(
        <Alert variant={notification.style}>
            {notification.content}
        </Alert>
    );
}

export default Notification