import './style/app.css';
import NavBar from './components/NavBar';
//import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList'
import UpdateTask from './components/UpdateTask'; 
import Login from './components/login';
import Signup from './components/signup';
import Protected from './components/protected';


import Google from './components/google'

// function App() {
//   return (
//     <>
//       <NavBar />
//       <Routes>
               


//         <Route path="/" element={<Protected><TaskList /></Protected>} />
//         <Route path="/add-Task" element={<Protected><AddTask /></Protected>} /> 
//             <Route path="/update/:id" element={<Protected><UpdateTask /></Protected>} />
//             <Route path="/login" element={<Login />} />
//    <Route path="/signup" element={<Signup />} />
         
//       </Routes>
//     </>
//   );
// }









function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Protected><TaskList /></Protected>} />
        <Route path="/add-task" element={<Protected><AddTask /></Protected>} />
        <Route path="/update/:id" element={<Protected><UpdateTask /></Protected>} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;