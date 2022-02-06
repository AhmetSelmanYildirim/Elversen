import "./Responsibles.css"
import React, { useContext } from 'react';
import { AppContext } from "../../Contexts/AppContext";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const Responsibles = () => {

    const { isLogon, responsibles } = useContext(AppContext)

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
            <div className="responsibleOuterContainer">
                <Sidebar />
                <div className="responsibleInnerContainer">
                    Responsibles
                    <div className="accordion">
                        {responsibles && responsibles.map((responsible, index) => (
                            <Accordion key={index} style={{ width: "60vw" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{responsible.name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <p>Email: {responsible.email}</p>
                                        <p>Telefon: {responsible.phone}</p>
                                        <p>Aktif: {responsible.isActive ? "aktif" : "pasif"}</p>
                                        {responsible.isActive ?
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
            <div className="responsibleOuterContainer">
                <Sidebar />
                <div className="responsibleInnerContainer">
                    Lütfen giriş yapınız.
                </div>
            </div>
        );
    }

};

export default Responsibles;
