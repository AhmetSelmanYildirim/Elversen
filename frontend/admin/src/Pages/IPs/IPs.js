import "./IPs.css"
import React, { useContext, useEffect } from 'react';
import { AppContext } from "../../Contexts/AppContext";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";


const IPs = () => {

    const { isLogon, ips, setIps } = useContext(AppContext)

    useEffect(() => {

        const getIPs = async () => {
            const { data } = await axios(`${process.env.REACT_APP_SERVER_URL}/ips`)
            setIps(data);
        }
        getIPs();

    }, [])

    if (isLogon) {
        return (
            <div className="ipOuterContainer">
                <Sidebar />
                <div className="ipInnerContainer">
                    IPs
                    <div className="accordion">
                        {ips && ips.map((ip, index) => (
                            <Accordion key={index} style={{ width: "60vw" }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography>{ip.IPv4}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <div>
                                        <p><strong>IPv4:</strong> {ip.IPv4}</p>
                                        <p><strong>Şehir:</strong> {ip.city}</p>
                                        <p><strong>Eyalet:</strong> {ip.state}</p>
                                        <p><strong>Posta kodu:</strong> {ip.postal}</p>
                                        <p><strong>Ülke kodu:</strong> {ip.country_code}</p>
                                        <p><strong>Ülke adı:</strong> {ip.country_name}</p>
                                        <p><strong>Giriş sayısı:</strong> {ip.count}</p>
                                        <p><strong>İlk Giriş tarihi: </strong> 
                                        <span>{new Date(ip.createdAt).getDate()}/
                                        {(new Date(ip.createdAt).getMonth()) < 10 ? ("0".concat(new Date(ip.createdAt).getMonth().toString())) : new Date(ip.createdAt).getMonth()}/
                                        {new Date(ip.createdAt).getFullYear()}  </span><span>
                                        {(new Date(ip.createdAt).getHours()) < 10 ? ("0".concat(new Date(ip.createdAt).getHours().toString())) : new Date(ip.createdAt).getHours()}:
                                        {(new Date(ip.createdAt).getMinutes()) < 10 ? ("0".concat(new Date(ip.createdAt).getMinutes().toString())) : new Date(ip.createdAt).getMinutes()}:
                                        {(new Date(ip.createdAt).getSeconds()) < 10 ? ("0".concat(new Date(ip.createdAt).getSeconds().toString())) : new Date(ip.createdAt).getSeconds()}
                                        </span>
                                        <span> GMT:{(new Date(ip.createdAt).getTimezoneOffset()) < 0 ? ("-".concat(new Date(ip.createdAt).getTimezoneOffset().toString())) : (new Date(ip.createdAt).getTimezoneOffset()) > 0 ? ("+".concat(new Date(ip.createdAt).getTimezoneOffset().toString())) : (new Date(ip.createdAt).getTimezoneOffset())}</span>    
                                        </p>
                                        {/* latitude,longitude*/}
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
            <div className="ipOuterContainer">
                <Sidebar />
                <div className="ipInnerContainer">
                    Lütfen giriş yapınız.
                </div>
            </div>
        );
    }

}

export default IPs