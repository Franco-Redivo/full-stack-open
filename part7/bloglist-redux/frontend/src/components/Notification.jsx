import "../styles/notification.css";
import { useSelector } from "react-redux";

const Notification = () => {
    const notification = useSelector(state => state.notifications)
    
    if (!notification || notification.content === ''){
        return null;
    }

    return(
        <div className={notification.style}>
            {notification.content}
        </div>
    );
}

export default Notification