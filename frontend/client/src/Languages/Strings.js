import LocalizedStrings from "react-localization";

export const strings = new LocalizedStrings({
    tr: {
        // Header
        homepage: "Anasayfa",
        about: "Hakkımızda",
        addpatient: "SMA'lı Çocuk Ekle",
        listpatients: "SMA'lı Çocukları Listele",
        contact: "İletişim",
        socialMedia: "Sosyal Medya",
        navigation: "Navigasyon",
        headerLogin: "Sorumlu Girişi",
        headerLogout: "Sorumlu Çıkış",
        headerProfile: "Sorumlu Profil",

        // Add patient
        formName: "Ad",
        formSurname: "Soyad",
        formDateOfBirth: "Doğum tarihi: gg.aa.yyyy",
        formResponsibleName: "Sorumlu kişi isim",
        formResponsiblePhone: "Sorumlu kişi telefon numarası",
        formResponsibleEmail: "Sorumlu kişi e-posta",
        formCollectedAmount: "Toplanan tutar",
        formRequiredAmount: "Tedavi tutarı",
        formWeight: "Ağırlık",
        IBANNumber: "IBAN No",
        governmentPermit: "Valilik izni",
        submitForm: "Gönder",
        formEmail: "E-posta",
        formPhone: "Telefon",
        formSubject: "Konu",
        formMessage: "Mesaj",
        formTermsAndConditions: "Şartlar ve Koşulları kabul ediyorum",
        formPassword: "Şifre",
        username: "kullanıcı_adı",

        // Form Validation
        required: "Zorunlu alan",
        tooShort: "Çok kısa",
        tooLong: "Çok uzun",
        permitRequired: "Valilik izni yüklenmesi zorunludur",
        termsAndConditionsRequired: "Şartlar ve koşulların kabul edilmesi zorunludur",
        weightTooLow: "Kilo 0 dan az olamaz",
        collectedAmountTooLow: "Toplanan miktar 0 dan az olamaz",
        ibanValidation: "Lütfen 26 haneli IBAN numarasının sadece sayı kısmını giriniz",

        termsAndConditions: "Şartlar ve Koşullar",

        mailExists: "Bu mail zaten kullanımda",
        accontCreated: "Bilgiler alındı teşekkür ederiz.",
        responsible: "Sorumlu",
        loginError: "Girilen bilgiler hatalı",
        loginAuthorizationError: "Lütfen onay maili için bekleyiniz",
        requiredAmount: "Tedavi tutarı",
        remainingAmount: "Kalan miktar",
        collectedAmount: "Toplanan miktar",

        // Listing page
        facebookLink: "Facebook Linki",
        instagramLink: "Instagram Linki",
        photo: "Çocuğumuzun fotoğrafı",
        city: "Şehir",
        sort: "Sıralama",
        infoDetail: "Çocukların detaylı bilgileri için ögelere tıklayabilirsiniz",

        // Password reset
        currentPassword: "Şimdiki şifreniz",
        newPassword: "Yeni şifreniz",
        renewPassword: "Tekrar yeni şifreniz",
        resetPassword: "Şifreyi yenile",
        passwordMatch: "Yeni şifre, tekrarıyla aynı değil",
        passwordChangeFail: "Şifre değiştirilemedi",
        passwordChangeSuccess: "Şifre başarıyla değiştirildi",

        // Update patient info
        patientInfo: "SMA'lı çocuğunuzun bilgilerini gücelleme",
        dateOfBirth: "Doğum tarihi",
        updateFacebookLink: "Facebook Link",
        updateInstagramLink: "Instagram Link",
        infoUpdateSuccess: "Bilgiler başarıyla güncellendi",
        infoUpdateFail: "Bir hata oluştu",

        thanksForContactUs: "Mesajınız başarıyla bize ulaşmıştır. İlginiz için teşekkür ederiz.",
        uploadGovernmentPermit: "Lütfen valilik izninizi yükleyiniz.",
        patientAdded: "İsteğiniz bize ulaştı. Kontroller yapıldıktan sonra listeleme sayfasında çocuğunuzu görebileceksiniz. Mail adresinize iletilen şifre ile giriş yapıp güncellemeleri yapabileceksiniz.",
        updatePhoto: "Fotoğrafı güncelleyin",

        emailAlreadyInUse: "Email zaten kullanımda",

        //Listing
        sortingName: "İsim",
        sortingAge: "Kalan günler",
        sortingWeight: "Kalan ağırlık",
        sortingMoneyDecrease: "Kalan para azalan",
        sortingMoneyIncrease: "Kalan para artan",

        listPhoto: "Fotoğraf",
        listingName: "İsim",
        listingRequiredMoney: "Tedavi tutarı",
        listingRemainingMoney: "Kalan",
        listingCollectedMoney: "Toplanan",
        listingCity: "Şehir",
        listingRemainingDays: "Gün",
        listingRemainingWeight: "Kilo",

        // Forgotten password
        forgottenPassword: "Şifremi sıfırla",
        forgottenPasswordLink: "Şifrenizi mi unuttunuz?",
        forgottenPasswordInfoConfirm: "Şifrenizi sıfırlamak için mail kutunuza gelen maili kontrol ediniz.",
        forgottenPasswordInfoWarning: "Lütfen önce hesabınızın aktif olduğundan emin olunuz.",
        forgottenPasswordInfoError: "Kullanıcı bulunamadı.",
        tokenIsNotValid: "Token geçerli değil",

        // Homepage
        hText1: "Bir el versen! Bir el ver, sen!",
        hText2: "Her şey olmasa da, bir şey daha güzel olacak.",
        hText3: "Türkiye’deki tüm SMA’lı çocuklarımız bir arada.",
        hText4: "Tüm çocuklarımıza daha kolay ulaşın diye.",
        hText5: "Daha fazla bilgi için buraya bakabilirsiniz.",

        // About us
        aboutText1: "Bu bir başlangıç olsun istiyoruz.",
        aboutText2: "Adım adım büyüyelim, hep birlikte büyüyelim istiyoruz.",
        aboutText3: "SMA’lı daha çok çocuğumuza ulaşalım. Ümidimiz tüm çocuklarımıza, tüm hastalarımıza ve oradan da tüm ihtiyaç sahiplerimize ulaşabileceğimiz bir platform oluşturmak.",
        aboutTitle1: "Nasıl doğdu?",
        aboutText4: "SMA’lı çocuklarımıza sosyal medyada rastlarken doğdu bu fikir. Önümüzdeki akışa düşen çocuklarımıza yardımcı olmaya çalışıyoruz. Peki ya sosyal medyada karşımıza çıkamayanlar? Peki ya daha acil olanlar? İşte onlara ulaşmakta zorlanıyoruz.",
        aboutTitle2: "Amacımız",
        aboutText5: "Elversen platformu ile Türkiye’deki tüm SMA’lı çocuklarımızı tek bir yerde listelemek ve herhangi bir çocuğumuza yardım etmek isteyenler için bir platform oluşturmak. Böylece hem kamuoyunun dikkatini daha çok çekmiş oluruz, hem de tüm çocuklarımıza aynı anda destek verecek bir altyapımız olur.",
        aboutTitle3: "Nasıl Çalışıyor?",
        aboutText6: "SMA’lı çocuğumuzun velisi çocuğumuzun bilgilerini valilik onayıyla birlikte sisteme girer. Gönüllü arkadaşımız onayladıktan sonra çocuğumuzun bilgileri listelenir. Veliden haftalık olarak bilgilerde güncelleme yapması beklenir. İki hafta üst üstü güncelleme yapılmayan hesaplar askıya alınır. Veli, valilik onayında ismi geçen anne-babadan birisi olmalıdır.",
        aboutTitle4: "Biz Kimiz?",
        aboutText7: "Aslında bunun hiç önemi yok. Fakat insanlar bir işin arkasında olanları da merak ederler. Bu, güven duygularını da artırır.",
        aboutText8: "Biz bir dernek değiliz, vakıf değiliz, para/ödeme almıyoruz. Biz gönüllüleriz.",
        aboutText9: "Fikri ateşleyen Hüseyin Hakan Yıldırım ile yazılımı yapan ve birlikte geliştirdikleri Ahmet Selman Yıldırım tarafından bu proje başlatıldı. Ama biz yalnız değiliz, olmak da istemiyoruz. Gönüllülerimizle birlikte olmak istiyoruz. Bu yüzden gönüllü tüm desteklere açığız.",

        // Terms and Conditions
        termsText1: "Elversen bir gönüllü organizasyondur.",
        termsText2: "Amaç, Türkiye’deki SMA’lı çocuklarla yardımseverleri buluşturmaktır.",
        termsText3: "1.	SMA’lı giriş formu valilik onayında ismi geçen veya SMA’lı çocuğumuzun anne-babasından birisi tarafından doldurulmalıdır. Bu kişi, bundan sonra “sorumlu” olarak anılacaktır.",
        termsText4: "2.	Sorumlu, verdiği tüm bilgilerin doğruluğundan da sorumludur.",
        termsText5: "3.	Sorumlu, verdiği tüm bilgilerin doğruluğunu Kabul eder.",
        termsText6: "4.	Veriler, haftalık olarak güncellenmelidir. Üst üstü iki hafta ve ayrı zamanlar beş hafta güncellenmeyen hesaplar askıya alınır.",
        termsText7: "5.	Sorumlu, siteye verdiği tüm bilgilerin platformumuz tarafından internette, sosyal medyada, tüm platformlarda ve üçüncü kişilerle paylaşılmasını Kabul eder.",

    },
    en: {
        // Header
        homepage: "Homepage",
        about: "About us",
        addpatient: "Add Child with SMA ",
        listpatients: "List Children with SMA ",
        contact: "Contact",
        socialMedia: "Social Media",
        navigation: "Navigation",
        headerLogin: "Responsible Login",
        headerLogout: "Responsible Logout",
        headerProfile: "Responsible Profile",

        // Add patient
        formName: "Name",
        formSurname: "Surname",
        formDateOfBirth: "Date of Birth: dd.mm.yyyy",
        formResponsibleName: "Responsible Person Name",
        formResponsiblePhone: "Responsible Person Phone",
        formResponsibleEmail: "Responsible Person E-Mail",
        formCollectedAmount: "Collected Amount",
        formRequiredAmount: "Treatment Amount",
        formWeight: "Weight",
        IBANNumber: "IBAN No",
        governmentPermit: "Government Permit",
        submitForm: "Submit",
        formEmail: "E-mail",
        formPhone: "Phone",
        formSubject: "Subject",
        formMessage: "Message",
        formTermsAndConditions: "Accept Terms and Conditions",
        formPassword: "Password",
        username: "username",

        // Form Validation
        required: "Required field",
        tooShort: "Too short",
        tooLong: "Too long",
        permitRequired: "Government permit is required",
        termsAndConditionsRequired: "The terms and conditions must be accepted",
        weightTooLow: "Weight cannot lower than 0",
        collectedAmountTooLow: "Collected amount cannot lower than 0",
        ibanValidation: "Please enter only the numeric part of the 26-digit IBAN",

        termsAndConditions: "Terms and Conditions",

        mailExists: "This mail is already in use",
        accontCreated: "Data received successfully",
        responsible: "Responsible",
        loginError: "The entered information is invalid.",
        loginAuthorizationError: "Please wait for approvement mail",
        requiredAmount: "Treatment amount",
        remainingAmount: "Remaining amount",
        collectedAmount: "Collected amount",

        // Listing page
        facebookLink: "Facebook URL:",
        instagramLink: "Instagram URL:",
        photo: "The child's photo",
        city: "City",
        sort: "Sort by",
        infoDetail: "You can click on the items for detailed information about children",

        // Password reset
        currentPassword: "Current password",
        newPassword: "New password",
        renewPassword: "Re-new password",
        resetPassword: "Reset Password",
        passwordMatch: "New passwords doesn't match",
        passwordChangeSuccess: "Password reset successfully",
        passwordChangeFail: "Password reset failed",

        // Update patient info
        patientInfo: "Update info of your child with SMA",
        dateOfBirth: "Date of Birth",
        updateFacebookLink: "Facebook Link",
        updateInstagramLink: "Instagram Link",
        infoUpdateSuccess: "Info updated successfully",
        infoUpdateFail: "An error occured while updating info",

        thanksForContactUs: "Your message has reached us successfully. Thank you for your attention.",
        uploadGovernmentPermit: "Please add your government permit.",
        patientAdded: "Your request has reached us. After the checks are made, you will be able to see your child on the listing page. You will be able to log in with the password sent to your e-mail address and make updates.",
        updatePhoto: "Upload photo",

        // Listing
        sortingName: "Name",
        sortingAge: "Remaining days",
        sortingWeight: "Remaining weight",
        sortingMoneyDecrease: "Remaining money decreasing",
        sortingMoneyIncrease: "Remaining money increasing",
        emailAlreadyInUse: "Email already in use",

        listPhoto: "Photo",
        listingName: "Name",
        listingRequiredMoney: "Treatment amount",
        listingRemainingMoney: "Remaining",
        listingCollectedMoney: "Collected",
        listingCity: "City",
        listingRemainingDays: "Days",
        listingRemainingWeight: "Weight",

        // Forgotten password
        forgottenPassword: "Reset password",
        forgottenPasswordLink: "Forgot your password?",
        forgottenPasswordInfoConfirm: "Please check your mail box to reset the password.",
        forgottenPasswordInfoWarning: "Please be sure your account has activated.",
        forgottenPasswordInfoError: "Responsible not found",
        tokenIsNotValid: "Token is not valid",

        // Homepage
        hText1: "Give us a hand! ",
        hText2: "Although not everything, but one more thing will be great.",
        hText3: "All our children with SMA in Turkey are together.",
        hText4: "To reach all our children more easily.",
        hText5: "You can check here for more information.",

        // About us
        aboutText1: "We want this to be a begin.",
        aboutText2: "Let’s grow step by step, we want to grow together.",
        aboutText3: "Let’s reach more child with SMA. Our hope is to create a platform that we can reach all children, all patients and to all needy.",
        aboutTitle1: "How was it born?",
        aboutText4: "This idea was born when we came across our children with SMA on social media. We are trying to help our children who fall into the flow ahead. What about those who can't appear on social media? But what about the more urgent ones? Here we are having trouble reaching them.",
        aboutTitle2: "Our purpose",
        aboutText5: "With Elversen, to list all our children with SMA in one place in Turkey and to create a platform for those who want to help any of our children. Thus, we will not only attract the attention of the public more, but also have an infrastructure that will support all our children at the same time.",
        aboutTitle3: "How it works?",
        aboutText6: "The person responsible for the child with SMA enters the information of our child into the system with the approval of the governorship. After our volunteer friend approves, the child's information is listed. The responsible person is expected to update the information on a weekly basis. Accounts that do not update for two consecutive weeks will be suspended. The responsible person must be one of the parents whose name is mentioned in the governor's approval.",
        aboutTitle4: "Who are we?",
        aboutText7: "Actually, it doesn't matter. But people also wonder who is behind a job. This also increases feelings of trust.",
        aboutText8: "We are not an association, we are not a foundation, we do not receive money/payment. We are volunteers.",
        aboutText9: "This project was initiated by Hüseyin Hakan Yıldırım, who sparked the idea, and Ahmet Selman Yıldırım, who made and developed the software together. But we are not alone, nor do we want to be. We want to be with our volunteers. That's why we welcome all voluntary support.",

        // Terms and Conditions
        termsText1: "Elversen is a volunteer organization.",
        termsText2: "The aim is to bring together philanthropists and children with SMA in Turkey.",
        termsText3: "1. The entry form with SMA must be filled in by one of the parents of our child with SMA, whose name is mentioned in the governor's approval. This person is hereinafter referred to as “responsible”.",
        termsText4: "2. The responsible person is also responsible for the accuracy of all the information he/she gives.",
        termsText5: "3. The responsible person accepts the accuracy of all the information that he/she has gave.",
        termsText6: "4. Data should be updated weekly. Accounts that are not updated two weeks in a row and five weeks apart will be suspended.",
        termsText7: "5. The responsible person accepts that all the information that he/she gave to Elversen could share by our platform on the internet, social media, all platforms and with third parties.",



    }
})