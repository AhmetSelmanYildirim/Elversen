import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer"
import { Heart } from '@pxblue/react-progress-icons';
import Select from "react-select";

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
                if (a.name < b.name) { return 1; }
                if (a.name > b.name) { return -1; }
                return 0;
            })
            setAllPatients([...allPatients], everyPatients)

        }
        if (sorting.value === "age") {
            everyPatients = allPatients.sort((a, b) => {
                if ((new Date(a.dateOfEnd) - today) / 86400000 < (new Date(b.dateOfEnd) - today) / 86400000) { return 1; }
                if ((new Date(a.dateOfEnd) - today) / 86400000 > (new Date(b.dateOfEnd) - today) / 86400000) { return -1; }
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
                <div style={{ marginBottom: 20 }}>
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
                            Fotoğraf
                        </div>
                        <div className='infoArea'>
                            <div className='personalInfo'>
                                <p>İsim Soyisim</p>
                            </div>
                            <div className='personalInfo'>
                                <p>Gereken TL</p>
                            </div>
                            <div className='personalInfo'>
                                <p>Toplanan TL</p>
                            </div>
                            <div className='personalInfo'>
                                <p>Şehir</p>
                            </div>
                            <div className='personalInfo'>
                                <p>Kalan Gün</p>
                            </div>
                            <div className='personalInfo'>
                                <p>Kalan Kilo</p>
                            </div>
                            <div className='remainingAmount' >
                                Kalan TL
                            </div>
                        </div>

                    </div>
                </div>
                {allPatients && allPatients.map((item, index) => (
                    <div key={item + index} className='listItemContainer'>
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
                ))
                }
            </div>
            <Footer />
        </div>
    )
}

export default ListPatients
