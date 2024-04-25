import {Routes, Route} from 'react-router-dom';
import './App.css'
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard.jsx';


function App() {

  return (
      <Routes>
          <Route path="/signup" element={<Signup />}/>
          <Route path="/" element={<Dashboard />}/>
      </Routes>
  )
}



export default App
