import NavBar from "./NavBar"
const Contact = () => {
    return(
        <>
            <div className="bl-img">
                <NavBar transparentBg="nav"/>
                <div className="tact"> 
                    <div className="fom">
                        <p>Contact Us</p>
                        <form>
                            <input className="frm" placeholder='Email address'/>
                            <input className="frmr" placeholder='Write us a message'/>
                            <button className="ton">Submit</button>
                        </form>
                    </div>
                </div>
                
            </div>
        </>
    )
}
export default Contact