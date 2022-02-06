import "./Patients.css"
import React, { useContext } from 'react';
import { AppContext } from "../../Contexts/AppContext";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Patients = () => {

    const { isLogon, patients } = useContext(AppContext)

    const handleDeactivate = (event => {
        event.target.style = "display:none"
        event.target.previousElementSibling.innerHTML = "<strong>Aktif:</strong> pasif"
    })

    const handleActivate = (event => {
        event.target.style = "display:none"
        event.target.previousElementSibling.innerHTML = "<strong>Aktif:</strong> aktif"
    })

    if (isLogon) {
        return (
            <div className="patientsOuterContainer">
                <Sidebar />
                <div className="patientsInnerContainer">
                    Patients
                    <div className="accordion">
                        {patients && patients.map((patient, index) => (
                            <Accordion key={index} style={{ width: "60vw" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{patient.name} {patient.surname}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <p><strong>Ağırlık:</strong> {patient.weight}</p>
                                        <p><strong>IBAN:</strong> {patient.ibanNo}</p>
                                        <p><strong>Facebook:</strong> {patient.facebookLink}</p>
                                        <p><strong>Instagram:</strong> {patient.instagramLink}</p>
                                        <p><strong>Gereken:</strong> {patient.requiredAmount}</p>
                                        <p><strong>Toplanan:</strong> {patient.collectedAmount}</p>
                                        <p><strong>Şehir:</strong> {patient.city}</p>
                                        <p><strong>Sorumlu:</strong> {patient.responsibleName}</p>
                                        <p><strong>Telefon:</strong> {patient.responsiblePhone}</p>
                                        <p><strong>Mail:</strong> {patient.responsibleEmail}</p>
                                        <p><strong>Aktif:</strong> {patient.isActive ? "aktif" : "pasif"}</p>
                                        {patient.isActive ?
                                            <button className="deactivate" onClick={handleDeactivate}>Pasifleştir</button>
                                            :
                                            <button className="activate" onClick={handleActivate}>Aktifleştir</button>
                                        }
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="patientsOuterContainer">
                <Sidebar />
                <div className="patientsInnerContainer">
                    Lütfen giriş yapınız.
                </div>
            </div>
        );
    }

};

export default Patients;
