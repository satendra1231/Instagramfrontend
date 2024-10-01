
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import YourBlogs from './pages/YourBlogs';
import { useContext } from 'react';
import UserContext from './context/UserContext';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile';


function App() {
  let ctx = useContext(UserContext)
  console.log(ctx)

  let login = ctx.details.login
  console.log(login) 
  return (
    <div className="App">
       
       <BrowserRouter>
     <Navbar/>
        <Routes>
            {<Route path='/' element = {login===true?<Home/> :<Navigate to={'/login'}/>}/>}
            <Route path='/login' element = {login===false ?<Login/>:<Navigate to={'/'}/>}/>
            <Route path='/sign' element = {<Signup/>}/>
            <Route path='/yourpost' element = {login===true? <YourBlogs/>: <Navigate to="/login"/> }/>
            <Route path='/user/profile' element = {login===true? <Profile/>: <Navigate to="/login"/> }/>
            <Route path='/forgetpassword' element={<ForgetPassword/>}/>
            {/* <Route path='/signin' element={<SignIn/>}/> */}
        </Routes>
        <ToastContainer/>
     </BrowserRouter>

    </div>
  );
}

export default App;
