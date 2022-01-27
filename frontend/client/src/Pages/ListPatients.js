import React, { useContext, useEffect, useState } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer"
import { Heart } from '@pxblue/react-progress-icons';
import Select from "react-select";

const options = [
    { value: 'name', label: 'Name' },
    { value: 'age', label: 'Age' },
    { value: 'weight', label: 'Weight' },
]

const ListPatients = () => {
    const { patients } = useContext(AppContext)
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
                if (a.age < b.age) { return 1; }
                if (a.age > b.age) { return -1; }
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
            <Select
                placeholder={strings.sort}
                defaultValue={sorting}
                onChange={setSorting}
                options={options}
            />

                {allPatients && allPatients.map((item, index) => (
                    <div key={item + index} className='listItemContainer'>
                        <div className='listItemInnerContainer'>

                            <div className='photoContainer'>
                                <img src="./img/child.png"
                                    alt='childsphoto'
                                />
                            </div>
                            <div className='infoArea'>
                                <div className='personalInfo'>
                                    <p>{item.name}</p>
                                    <p>{item.age}</p>
                                    <p>{item.weight}kg</p>
                                    {item.instagramLink && <p><a style={{textDecoration:"none", color:"white"}} href={item.instagramLink} target="_blank"> Instagram</a></p>}
                                    {item.facebookLink && <p><a style={{textDecoration:"none", color:"white"}} href={item.facebookLink} target="_blank"> Facebook</a></p>}
                                </div>
                                <div className='amountInfo' >
                                    <p>{strings.requiredAmount}: {item.requiredAmount} TL</p>
                                    <p>{strings.collectedAmount}: {item.collectedAmount} TL</p>
                                    <p>{strings.remainingAmount}: {item.requiredAmount - item.collectedAmount} TL</p>
                                    <p>IBAN: {item.ibanNo}</p>
                                </div>
                                <div className='remainingAmount' >
                                    <p className='heart'><Heart percent={(item.collectedAmount / item.requiredAmount) * 100} size={100} color={'purple'} outlined={true} /></p>
                                    <p className='heartText'>{((item.collectedAmount / item.requiredAmount) * 100).toFixed(1)}</p>
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
