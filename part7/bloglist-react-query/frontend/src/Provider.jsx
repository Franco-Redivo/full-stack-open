import { NotificationProvider } from './context/NotificationContext'
import { LoginContextProvider } from './context/LoginContext'
import { BlogFormContextProvider } from './context/BlogFormContext'
import { ErrorProvider } from './context/ErrorContext'
import { LoadingProvider } from './context/LoadingContext'


const Provider = ({ children }) => {
    return (
       
        <ErrorProvider>
            <LoadingProvider>
                <NotificationProvider>
                    <LoginContextProvider>
                        <BlogFormContextProvider>
                            {children}
                        </BlogFormContextProvider>
                    </LoginContextProvider>
                </NotificationProvider>
            </LoadingProvider>
        </ErrorProvider>
        
    )
}

export default Provider