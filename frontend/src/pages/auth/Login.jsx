import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cookies from 'js-cookie'
const Login = () => {
    const [formData, setFormData] =useState({
        email: '', password: ''
    });
    const login = async(e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:5000/login', formData)
        console.log(response)
        // response.data.token
        Cookies.set('token', response.data.token)
        Cookies.set('userId', response.data.user._id)
        window.open('/', '_self')
    }
    return(
        <>
        <div className='box'>
            <h1>Tasty Treats</h1>
            <div className='cont'>
                <div className='ctn'>
                    <p>Login</p>
                    <Form onSubmit={login}>
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