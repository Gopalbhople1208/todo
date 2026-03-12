import './style/app.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList'

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-Task" element={<AddTask />} /> 
      </Routes>
    </>
  );
}

export default App;