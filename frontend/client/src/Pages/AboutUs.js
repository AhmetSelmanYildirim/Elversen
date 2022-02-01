import React, { useContext } from 'react'
import Header from '../Components/Header'
import { strings } from "../Languages/Strings";
import { AppContext } from "../Contexts/AppContext";
import "../Styles/styles.css"
import Footer from "../Components/Footer"
import HomepageContent from "../Components/HomepageContent"

const AboutUs = () => {
    const { } = useContext(AppContext)

    return (
        <div className='pageContainer' >
            <Header />
            <div className='innerPageContainer'>
                <p className='aboutUsTitle'>{strings.about}</p>
                
                <div className='aboutUsParagraph'>
                    <p>Bu bir başlangıç olsun istiyoruz.</p>
                    <p>Adım adım büyüyelim, hep birlikte büyüyelim istiyoruz.</p>
                    <p>SMA’lı daha çok çocuğumuza ulaşalım. Ümidimiz tüm çocuklarımıza, tüm hastalarımıza ve oradan da tüm ihtiyaç sahiplerimize ulaşabileceğimiz bir platform oluşturmak.</p>
                </div>
                <div className='aboutUsParagraph'>
                    <p className='aboutUsTitle'>Nasıl doğdu?</p>
                    <p>SMA’lı çocuklarımıza sosyal medyada rastlarken doğdu bu fikir. Önümüzdeki akışa düşen çocuklarımıza yardımcı olmaya çalışıyoruz. Peki ya sosyal medyada karşımıza çıkamayanlar? Peki ya daha acil olanlar? İşte onlara ulaşmakta zorlanıyoruz.</p>
                </div>
                <div className='aboutUsParagraph'>
                    <p className='aboutUsTitle'>Amacımız</p>
                    <p>Bu platformla Türkiye’deki tüm SMA’lı çocuklarımızı tek bir yerde listelemek ve herhangi bir çocuğumuza yardım etmek isteyenler için bir platform oluşturmak. Böylece hem kamuoyunun dikkatini daha çok çekmiş oluruz, hem de tüm çocuklarımıza aynı anda destek verecek bir altyapımız olur.</p>
                </div>
                <div className='aboutUsParagraph'>
                    <p className='aboutUsTitle'>Nasıl Çalışıyor?</p>
                    <p>SMA’lı çocuğumuzun velisi çocuğumuzun bilgilerini valilik onayıyla birlikte sisteme girer. Gönüllü arkadaşımız onayladıktan sonra çocuğumuzun bilgileri listelenir. Veliden haftalık olarak bilgilerde güncelleme yapması beklenir. İki hafta üst üstü güncelleme yapılmayan hesaplar askıya alınır. Veli, valilik onayında ismi geçen anne-babadan birisi olmalıdır.</p>
                </div>
                <div className='aboutUsParagraph'>
                    <p className='aboutUsTitle'>Biz Kimiz?</p>
                    <p>Aslında bunun hiç önemi yok. Fakat insanlar bir işin arkasında olanları da merak ederler. Bu, güven duygularını da artırır.</p>
                    <p>Biz bir dernek değiliz, vakıf değiliz, para/ödeme almıyoruz. Biz gönüllüleriz.</p>
                    <p>Fikri ateşleyen Hüseyin Hakan Yıldırım ile yazılımı yapan ve birlikte geliştirdikleri Ahmet Selman Yıldırım tarafından bu proje başlatıldı. Ama biz yalnız değiliz, olmak da istemiyoruz. Gönüllülerimizle birlikte olmak istiyoruz. Bu yüzden gönüllü tüm desteklere açığız.</p>
                </div>
            </div>


            <Footer />
        </div>
    )
}

export default AboutUs
