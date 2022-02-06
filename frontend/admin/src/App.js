import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './Pages/Homepage/Homepage';
import Responsibles from "./Pages/Responsibles/Responsibles";
import Patients from "./Pages/Patients/Patients";

const App = () => {
    return (
        <div id="container">
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/Responsibles" element={<Responsibles />} />
                    <Route path="/Patients" element={<Patients />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
