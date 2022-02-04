import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer"
import { Heart } from '@pxblue/react-progress-icons';
import Select from "react-select";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const contentStyle = {
    background: '#76429c',
    width: "50vw",
    border: "0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
};
const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { display: "none" }; // style for an svg element
const popupInnerContainer = {
    width: "100%",
    height: "100%",
    background: "#ff6600",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    padding: "5%",
}


const today = new Date()

const ListPatients = () => {
    const { patients } = useContext(AppContext)
    const options = [
        { value: 'name', label: strings.sortingName },
        { value: 'age', label: strings.sortingAge },
        { value: 'weight', label: strings.sortingWeight },
    ]
    const [sorting, setSorting] = useState({ value: 'choose', label: strings.sort });
    const [allPatients, setAllPatients] = useState([])
    let everyPatients = []

    useEffect(() => {
        if (patients) {
            everyPatients = patients.map(item => {
                return item
            });

            setAllPatients(everyPatients)
        }
    }, [patients])

    // Sorting degisirse allpatient stateini guncelle
    useEffect(() => {

        if (sorting.value === "name") {
            everyPatients = allPatients.sort((a, b) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            })
            setAllPatients([...allPatients], everyPatients)

        }
        if (sorting.value === "age") {
            everyPatients = allPatients.sort((a, b) => {
                if ((new Date(a.dateOfEnd) - today) / 86400000 < (new Date(b.dateOfEnd) - today) / 86400000) { return -1; }
                if ((new Date(a.dateOfEnd) - today) / 86400000 > (new Date(b.dateOfEnd) - today) / 86400000) { return 1; }
                return 0;
            })
            setAllPatients([...allPatients], everyPatients)

        }
        if (sorting.value === "weight") {
            everyPatients = allPatients.sort((a, b) => {
                if (a.weight < b.weight) { return 1; }
                if (a.weight > b.weight) { return -1; }
                return 0;
            })
            setAllPatients([...allPatients], everyPatients)

        }

    }, [sorting])


    return (
        <div className='pageContainer' >
            <Header />


            <div className='innerPageContainer' >
                <div style={{ marginBottom: 10, marginTop: "7vh" }}>
                    <Select
                        placeholder={strings.sort}
                        defaultValue={strings.sort}
                        onChange={setSorting}
                        options={options}
                    />
                </div>
                <div className='listItemContainerTitle'>
                    <div className='listItemInnerContainer'>

                        <div className='photoContainer'>
                            {strings.photo}
                        </div>
                        <div className='infoArea'>
                            <div className='personalInfo'>
                                <p>{strings.listingName}</p>
                            </div>
                            <div className='personalInfo'>
                                <p>{strings.listingRequiredMoney}</p>
                            </div>
                            <div className='personalInfo'>
                                <p>{strings.listingCollectedMoney}</p>
                            </div>
                            <div className='personalInfo'>
                                <p>{strings.listingCity}</p>
                            </div>
                            <div className='personalInfo'>
                                <p>{strings.listingRemainingDays}</p>
                            </div>
                            <div className='personalInfo'>
                                <p>{strings.listingRemainingWeight}</p>
                            </div>
                            <div className='remainingAmount' >
                                {strings.listingRemainingMoney}
                            </div>
                        </div>

                    </div>
                </div>
                {allPatients && allPatients.map((item, index) => (
                    <Popup key={item + index} trigger={
                        <div className='listItemContainer'>
                            <div className='listItemInnerContainer'>

                                <div className='photoContainer'>

                                    {item.photo !== "default.png" ?
                                        <img src={`${process.env.REACT_APP_SERVER_URL}/${item.responsibleEmail}/${item.photo}`}
                                            alt='childsphoto'
                                        />
                                        :
                                        <img src={`${process.env.REACT_APP_SERVER_URL}/default.png`}
                                            alt='childsphoto'
                                        />
                                    }

                                </div>
                                <div className='infoArea'>
                                    <div className='personalInfo'>
                                        <p>{item.name} {item.surname}</p>
                                    </div>
                                    <div className='personalInfo'>
                                        <p>{item.requiredAmount}</p>
                                    </div>
                                    <div className='personalInfo'>
                                        <p>{item.collectedAmount}</p>
                                    </div>
                                    <div className='personalInfo'>
                                        <p>{item.city}</p>
                                    </div>
                                    <div className='personalInfo'>
                                        <p>{parseInt((new Date(item.dateOfEnd) - today) / 86400000)}</p>
                                    </div>
                                    <div className='personalInfo'>
                                        <p>{item.weight}/<strong style={{ color: "pink" }}>13.5</strong></p>
                                    </div>
                                    <div className='remainingAmount' >
                                        <p className='heart'><Heart percent={(item.collectedAmount / item.requiredAmount) * 100} size={100} color={'purple'} outlined={true} /></p>
                                        <p className='heartText'>%{((item.collectedAmount / item.requiredAmount) * 100).toFixed(1)}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    }
                        {...{ contentStyle, overlayStyle, arrowStyle }}
                        position="center"
                    >
                        <div style={popupInnerContainer}>
                            <div><strong>{strings.listingName}:</strong> {item.name} {item.surname}</div>
                            <div><strong>{strings.dateOfBirth}:</strong> {`${new Date(item.dateOfBirth).getDate()}/${new Date(item.dateOfBirth).getMonth() + 1}/${new Date(item.dateOfBirth).getFullYear()}`}</div>
                            <div><strong>{strings.listingCity}:</strong> {item.city}</div>
                            <div><strong>{strings.formWeight}:</strong> {item.weight}kg</div>
                            <div><strong>{strings.listingRequiredMoney}:</strong> {item.requiredAmount} TL </div>
                            <div><strong>{strings.listingCollectedMoney}:</strong> {item.collectedAmount} TL</div>
                            <div><strong>IBAN:</strong> {item.ibanNo} </div>
                            <div><strong>{strings.formResponsibleName}:</strong> {item.responsibleName} </div>
                            <div><strong>{strings.formResponsibleEmail}:</strong> <a href={`mailto: ${item.responsibleEmail}`}>{item.responsibleEmail}</a>  </div>
                            {/* <div>{item.responsiblePhone} </div> */}
                            <div style={{marginTop:"10px"}}><a style={{ marginRight: "10px" }} href={item.facebookLink} target="_blank"><i style={{ color: "#0165E1" }} className="fab fa-facebook fa-2x"></i></a>
                                <a href={item.instagramLink} target="_blank"><i style={{ color: "#B403AA" }} className="fab fa-instagram fa-2x"></i></a>
                            </div>
                        </div>
                    </Popup>
                ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default ListPatients
