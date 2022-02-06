import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from './Pages/Homepage/Homepage';
import Sidebar from './Components/Sidebar/Sidebar';
import Responsibles from "./Pages/Responsibles/Responsibles";
import Patients from "./Pages/Patients/Patients";

const App = () => {
    return (
        <div id="outer-container">
            <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
            <div id="page-wrap" style={{ marginLeft: "45px" }} >
                <Router>
                    <Routes>
                        <Route path="/" element={<Homepage />} />
                        <Route path="/Responsibles" element={<Responsibles />} />
                        <Route path="/Patients" element={<Patients />} />
                    </Routes>
                </Router>
            </div>
        </div>
    );
}

export default App;
