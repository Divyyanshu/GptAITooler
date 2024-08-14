import './App.css'
import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element ={<Homepage/>}/>
        <Route path='/register' element ={<Register/>}/>
        <Route path='/login' element ={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
