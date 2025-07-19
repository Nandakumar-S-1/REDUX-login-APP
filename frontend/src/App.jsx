import React from 'react'
import {Router} from 'react-dom'
import { Route, Routes } from 'react-router-dom'
import {UserProtect,UserLoginProtect} from './secure/UserProtect'
import signUp from './components/signUp/SignUp'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={
          <UserLoginProtect>
            <signUp/>
          </UserLoginProtect>
        }/>
        <Route path='/' element={
          <UserLoginProtect>
            
          </UserLoginProtect>
        }/>
      </Routes>
    </Router>
  )
}

export default App
