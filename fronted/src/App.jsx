import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style/app.css'
import NavBar from './components/NavBar'
import {Route,Routes} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    //call navbar.jsx
   <NavBar />

   //add data in routes
 <Routes>
  <Route path="/" element={<h1>Task List</h1>} />
   <Route path="/add" element={<h1>Add Task</h1>} />
 </Routes>
  </>
  )
}

export default App
