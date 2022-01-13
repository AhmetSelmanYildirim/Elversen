import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Homepage from './Pages/Homepage';
import AboutUs from './Pages/AboutUs';
import AddPatient from './Pages/AddPatient';
import ListPatients from './Pages/ListPatients';
import Contact from './Pages/Contact';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/addpatient" element={<AddPatient />} />
          <Route path="/listpatients" element={<ListPatients />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
