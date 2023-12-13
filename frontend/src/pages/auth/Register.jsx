import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
const Register = () => {
    const[formData, setFormData] = useState({
        firstName: '', lastName: '', email: '', phoneNumber: ''
    })

    const registerUser = async(e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:5000/register',formData);
        console.log(response);
        window.open('/login', '_self');
    }

    return(
        <div className='box'>
            <h1>Tasty Treats</h1>
            <div className='cont'>
                <div className='ctn'>
                    <p>Create an account</p>
                    <Form onSubmit={registerUser}>
                        <Row className="mb-3">
                            <Col>
                            <Form.Control type="text" placeholder="First Name"
                                value = {formData.firstName}
                                onChange = {(e) => {
                                    setFormData({...formData, firstName:e.target.value})
                                }}
                            />
                            </Col>
                            <Col>
                            <Form.Control type="text" placeholder="Last Name"
                                value = {formData.lastName}
                                onChange = {(e) => {
                                    setFormData({...formData, lastName:e.target.value})
                                }}
                            />
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" >
                            <Form.Control type="email" placeholder="Email Address" 
                                value = {formData.email}
                                onChange={(e) => {
                                    setFormData({...formData, email:e.target.value})
                                }}
                            />
                        </Form.Group>

                        <Row className="mb-3" >
                            <Col>
                            <Form.Control type="password" placeholder="Password" 
                                value = {formData.password}
                                onChange={(e) => {
                                    setFormData({...formData, password:e.target.value})
                                }}
                            />
                            </Col>
                            <Col>
                            <Form.Control type="text" placeholder="Phone Number"
                                value = {formData.phoneNumber}
                                onChange={(e) => {
                                    setFormData({...formData, phoneNumber:e.target.value})
                                }}
                            />
                            </Col>
                        </Row>
                        <Button className="mb-3" variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
export default Register