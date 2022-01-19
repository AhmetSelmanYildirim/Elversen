import React, { useContext } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer"


const ListPatients = () => {
    const { patients } = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                {strings.listpatients}

                {patients && patients.map((item,index) => (
                    <div key={item+index} className='listItemContainer'>
                        <div className='listItemInnerContainer'>

                            <div className='photoContainer'>
                                <img src="./img/child.png"
                                    alt='photophoto'
                                />
                            </div>
                            <div className='infoArea'>
                                <div className='personalInfo'>
                                    <p>{item.name}</p>
                                    <p>{item.age ? item.age : "Age"}</p>
                                </div>
                                <div className='amountInfo' >
                                    <p>{strings.collectedAmount}:{item.collectedAmount}</p>
                                    <p>{strings.remainingAmount}:{item.requiredAmount - item.collectedAmount}</p>
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
