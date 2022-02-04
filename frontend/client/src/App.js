import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Homepage from './Pages/Homepage';
import AboutUs from './Pages/AboutUs';
import AddPatient from './Pages/AddPatient';
import ListPatients from './Pages/ListPatients';
import Contact from './Pages/Contact';
import TermsAndConditions from './Pages/TermsAndConditions';
import Login from './Pages/Login';
import ResponsibleProfile from './Pages/Responsible/ResponsibleProfile';
import ThankYou from './Pages/ThankYou';
import PatientAdded from './Pages/PatientAdded';
import ForgottenPassword from './Pages/ForgottenPassword';
import ResetPassword from './Pages/ResetPassword';


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
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/r/profile/:id" element={<ResponsibleProfile authorized={false} />} />
          <Route path="/contact/thankyou" element={<ThankYou />} />
          <Route path="/addpatient/patientadded" element={<PatientAdded />} />
          <Route path="/forgottenPassword" element={<ForgottenPassword />} />
          <Route path="/resetPassword/:id/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
