import React, { useContext } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import Footer from "../Components/Footer"
import { Heart } from '@pxblue/react-progress-icons';


const ListPatients = () => {
    const { patients } = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer' >
                {strings.listpatients}

                {patients && patients.map((item, index) => (
                    <div key={item + index} className='listItemContainer'>
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
                                    <p>{item.weight ? item.weight : "Weight"}kg</p>
                                </div>
                                <div className='amountInfo' >
                                    <p>{strings.requiredAmount}: {item.requiredAmount} TL</p>
                                    <p>{strings.collectedAmount}: {item.collectedAmount} TL</p>
                                    <p>{strings.remainingAmount}: {item.requiredAmount - item.collectedAmount} TL</p>
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
