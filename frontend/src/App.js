import React from 'react'
import Login from './Login'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './Signup'
import ProtectedRoute from './Component/ProtectedRoute'
import ShowProduct from './Component/ShowProduct'

function App(){
    return (
    
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='' element={<ProtectedRoute/>}>
        <Route path='' element={<ShowProduct />}></Route>
        </Route>
      </Routes>
    )
}

export default App
