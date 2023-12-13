import './App.css'
import Home from './pages/Home.jsx'
import EnquiryTest from './pages/admin/EnquiryTest'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Recipe from './pages/Recipe.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import CreatorRegister from './pages/admin/auth/Register'
import CreatorLogin from './pages/admin/auth/Login'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProtectRoute from './pages/admin/auth/ProtectedRoute.jsx'


function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route exact path = '/' element ={<Home/>}/>
      <Route exact path = '/enquiry' element ={<EnquiryTest/>}/>
      <Route exact path = '/register' element ={<Register/>}/>
      <Route exact path = '/login' element ={<Login/>}/>
      <Route exact path = '/recipe/:id' element ={<Recipe/>}/>
      <Route exact path = '/contact-us' element ={<Contact/>}/>
      <Route exact path = '/about-us' element ={<About/>}/>


      <Route exact path = '/creator-register' element ={<CreatorRegister/>}/>
      <Route exact path = '/creator-login' element ={<CreatorLogin/>}/>
      <Route exact path = '/dashboard' 
            element ={<ProtectRoute component={Dashboard}/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
