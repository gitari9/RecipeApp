import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie'
const Login = () => {
    const[formData, setFormData] = useState({
        email: '', password: ''
    })
    const loginCreator = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:5000/creator-login', formData)
        console.log(response)
        //response.data.token
        Cookies.set('creatorToken', response.data.token)
        // store the userId as a code
        
        window.open('/dashboard', '_self')
    }
    return (
        <>
        <div className='box'>
            <h1>Tasty Treats</h1>
            <div className='cont'>
                <div className='ctn'>
                    <p>Login as creator</p>
                    <Form onSubmit={loginCreator}>
                        <Form.Group className="mb-3" >
                            <Form.Control type="email" placeholder="Email Address" 
                            value={formData.email}
                            onChange = {(e) =>{
                                setFormData({...formData, email: e.target.value})
                            }}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3"> 
                            <Form.Control type="password" placeholder="Password"
                            value={formData.password}
                            onChange={(e) =>{
                                setFormData({...formData, password: e.target.value})
                            }}
                        />
                        </Form.Group>
                        <Button className="mb-3" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
        </>
    )
}
export default Login