import './style/app.css';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import AddTask from './components/AddTask';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Task List</h1>} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </>
  );
}

export default App;