import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectRoute = ({component: Component, ...rest}) => {
    const isAuthenticated = Cookies.get('creatorToken')
    return(
        <>
            {
                isAuthenticated ? <Component {...rest}/> : <Navigate to = '/creator-login'/>
            }
        </>
    )
}
export default ProtectRoute