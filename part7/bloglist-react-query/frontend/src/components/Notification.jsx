import "../styles/notification.css";
import { useNotificationValue } from "../context/NotificationContext";

const Notification = () => {
    const notification = useNotificationValue()
    
    if (!notification) {
        return null;
    }


    return(
        <div className={notification.style}>
            {notification.message}
        </div>
    );
}

export default Notification