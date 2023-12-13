import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link } from "react-router-dom"
const NavBar = ({transparentBg}) => {
    return(
        <>
        <div className={`menu ${transparentBg}`}>
            <Link className="menul" to = "/tasty-treats">Tasty Treats</Link>

            <div className="menuli">
                <Link className="menuly" to = "/">Home</Link>
                <Link className="menuly" to = "/recipe">Recipes</Link>
                <Link className="menuly" to = "/about-us">About Us</Link>
                <Link className="menuly" to = "/contact-us">Contact Us</Link>
                <AccountCircleRoundedIcon className='icn'/> 
            </div> 
        </div>
        </>
    )
}
export default NavBar





 