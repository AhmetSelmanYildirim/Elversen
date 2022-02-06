import "./Responsibles.css"
import React, { useContext, useEffect } from 'react';
import { AppContext } from "../../Contexts/AppContext";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";


const Responsibles = () => {

    const { isLogon, responsibles, activateResponsible, deactivateResponsible, setResponsibles } = useContext(AppContext)

    useEffect(() => {

        const getResponsibles = async () => {
            const { data } = await axios(`${process.env.REACT_APP_SERVER_URL}/r/getResponsibles`)
            setResponsibles(data);
        }
        getResponsibles();

    }, [])

    const handleDeactivate = (event => {
        event.target.style = "display:none"
        deactivateResponsible(event.target.parentElement.childNodes[0].childNodes[2].nodeValue);
        event.target.previousElementSibling.innerHTML = "<strong>Aktif:</strong> pasif"
    })

    const handleActivate = (event => {
        event.target.style = "display:none"
        activateResponsible(event.target.parentElement.childNodes[0].childNodes[2].nodeValue);
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
                                        <p><strong>Email:</strong> {responsible.email}</p>
                                        <p><strong>Telefon:</strong> {responsible.phone}</p>
                                        <p><strong>Aktif:</strong> {responsible.isActive ? "aktif" : "pasif"}</p>
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
