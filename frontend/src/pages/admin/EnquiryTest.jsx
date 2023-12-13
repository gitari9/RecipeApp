import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const EnquiryTest = () => {
    const[email, setEmail] = useState('');
    const[message, setMessage] = useState('');
    const[enquiry, setEnquiry] = useState([]);
    const[status, setStatus] = useState('create');
    const[id, setId] = useState(null)

    const createEnqiury = async(e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:5000/enquiry',{email,message});
        console.log(response.data)
        setEnquiry([response.data.data, ...enquiry])
    }
    const getEnquiry = async() => {
        const response = await axios.get('http://localhost:5000/enquiry');
        console.log(response.data.data)
        setEnquiry(response.data.data)
    }
     const deleteEnquiry = async(id) => {
        const response = await axios.delete(`http://localhost:5000/enquiry/${id}`)
        console.log(response.data.data)
        const newEnquiry = enquiry.filter((enq) => {
            if(enq._id !== id)
            return enq
        })
        setEnquiry(newEnquiry) 
     }
     const getEnquiri = async(id) => {
        setStatus('update')
        const response = await axios.get(`http://localhost:5000/enquiry/get/${id}`)
        console.log(response.data.data)
        setEmail(response.data.data.email)
        setMessage(response.data.data.message)
        setId(response.data.data._id)
     }

     const updateEnquiry = async(e) => {
        e.preventDefault()
        const response = await axios.put(`http://localhost:5000/enquiry/${id}`,{email, message})
        console.log(response.data.data)
        const newEnquiry = enquiry.map((enq) => {
            if(enq._id === id){
                return response.data.data
            } else{
                return enq
            }
        })
        setEnquiry(newEnquiry);
     }

    useEffect (() => {
        getEnquiry()
    },[])

     
    return(
        <>
        <h1>Enquiry Test</h1>
        <form onSubmit= {status === 'create' ? createEnqiury : updateEnquiry}>
            <input 
                placeholder='Enter email' 
                type='email'
                value = {email}
                onChange = {(e) => setEmail(e.target.value)}
            />
            <input 
             placeholder='Enter message'
             type='text'
             value = {message}
             onChange = {(e) => setMessage(e.target.value)}
             />
            <button>{status === 'create' ? 'Send Enqiury': 'Update Enquiry'}</button>
        </form>


    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>_id</th>
          <th>email</th>
          <th>message</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
           {
                enquiry.map ((enq, index) => {
                    return(
                            <tr key={enq._id}>
                                <td>{index + 1}</td>
                                <td>{enq._id}</td>
                                <td>{enq.email}</td>
                                <td>{enq.message}</td>
                                <td>
                                    <EditIcon onClick={() => getEnquiri(enq._id)} />
                                    <DeleteIcon onClick={() => deleteEnquiry(enq._id)}/>

                                </td>
                                
                            </tr>
                    )
                })
            }        
      </tbody>
    </Table>
        </>
    )
}
export default EnquiryTest
