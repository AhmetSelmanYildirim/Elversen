import React, { useContext } from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import { AppContext } from '../Contexts/AppContext'
import { strings } from '../Languages/Strings'


const TermsAndConditions = () => {

    const { } = useContext(AppContext)

    return (
        <div className='pageContainer'>
            <Header />

            <div className='innerPageContainer' >
                {strings.termsAndConditions}
                <div className='aboutUsParagraph'>
                    <p>……… platformu bir gönüllü organizasyondur.</p>
                    <p>Amaç, Türkiye’deki SMA’lı çocuklarla yardımseverleri buluşturmaktır.</p>
                    <p>1.	SMA’lı giriş formu valilik onayında ismi geçen veya SMA’lı çocuğumuzun anne-babasından birisi tarafından doldurulmalıdır. Bu kişi, bundan sonra “sorumlu” olarak anılacaktır.</p>
                    <p>2.	Sorumlu, verdiği tüm bilgilerin doğruluğundan da sorumludur.</p>
                    <p>3.	Sorumlu, verdiği tüm bilgilerin doğruluğunu Kabul eder.</p>
                    <p>4.	Veriler, haftalık olarak güncellenmelidir. Üst üstü iki hafta ve ayrı zamanlar beş hafta güncellenmeyen hesaplar askıya alınır.</p>
                    <p>5.	Sorumlu, siteye verdiği tüm bilgilerin platformumuz tarafından internette, sosyal medyada, tüm platformlarda ve üçüncü kişilerle paylaşılmasını Kabul eder.</p>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default TermsAndConditions
