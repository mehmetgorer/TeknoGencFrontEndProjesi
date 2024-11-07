# Quiz Web Uygulaması

Bu proje, kullanıcıların çeşitli kategorilerdeki soruları çözüp puan toplayabildiği bir **quiz web sitesi** uygulamasıdır. Kullanıcılar, **Firebase** kullanarak sisteme kayıt olabilir, giriş yapabilir ve üyelik bilgileri ile topladıkları puanlar Firebase üzerinde tutulur.

## Proje Özellikleri

- **Kategorilere Göre Quizler**: Farklı kategorilerdeki soruları çözerek puan kazanabilirsiniz.
- **Puan Takibi**: Çözülen sorulardan kazanılan puanlar kullanıcıya özel olarak Firebase üzerinde saklanır.
- **Kullanıcı Girişi ve Üye Kaydı**: Firebase Authentication ile kolayca üye olabilir ve giriş yapabilirsiniz.
- **Mobil Uyumlu Tasarım**: Her cihazda düzgün görünecek şekilde tasarlanmıştır.

## Proje Hakkında

Quiz Web Uygulaması, kullanıcıların bilgi seviyelerini test edebileceği, eğlenceli ve eğitici bir platform sunar. Kullanıcılar farklı kategorilerdeki soruları çözerek bilgi birikimlerini arttırabilir ve elde ettikleri puanlarla diğer kullanıcılarla rekabet edebilir. Sistemde üyelik oluşturup giriş yapan kullanıcılar, tüm puan geçmişlerini ve quiz istatistiklerini Firebase veritabanında saklanan kişisel profilleri aracılığıyla takip edebilirler. Platform, kullanıcı dostu ve mobil uyumlu bir arayüze sahiptir, bu sayede hem masaüstü hem de mobil cihazlarda rahatlıkla kullanılabilir.

## Kullanılan Teknolojiler

Projede aşağıdaki teknolojiler ve kütüphaneler kullanılmıştır:

- **React**: Kullanıcı arayüzü geliştirme için kullanılan JavaScript kütüphanesi.
- **Firebase**: Kullanıcı kimlik doğrulama, veritabanı ve barındırma gibi işlevler için kullanılan backend hizmeti.
  - **Firebase Authentication**: Kullanıcı girişi ve kayıt işlemleri için.
  - **Firebase Firestore/Realtime Database**: Kullanıcı puanları gibi verilerin saklanması için.
- **React Router**: Farklı sayfalar ve bileşenler arasında gezinmek için kullanılan yönlendirme kütüphanesi.
- **Ant Design (Antd)**: UI bileşenleri ve tasarım sistemi için kullanılan stil ve kullanıcı arayüzü kütüphanesi.
- **React-Firebase-Hooks**: Firebase ile React uygulamasını entegre ederken kullanılan yardımcı fonksiyonlar.
- **Testing Library**: Uygulamanın test edilmesi için kullanılan araçlar.

## Kurulum ve Çalıştırma

**Proje Deposu**: Bu projeyi klonlayın veya zip dosyasını indirip açın.

bash
git clone https://github.com/mehmetgorer/TeknoGencFrontEndProjesi.git

Bağımlılıkları Yükleyin: Aşağıdaki komut ile gerekli bağımlılıkları yükleyin.

bash
npm install
Firebase Yapılandırması: Firebase ayarlarınızı src/firebaseConfig.js dosyasına ekleyin.

Uygulamayı Çalıştırın: Geliştirme sunucusunu başlatmak için aşağıdaki komutu kullanın.

bash
npm start
Uygulama, varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

---

## Ekran Görüntüleri // Screenshots


![](https://github.com/mehmetgorer/TeknoGencFrontEndProjesi/blob/main/FrontEndProjeScreenShots/Screenshot_1.png)

![](https://github.com/mehmetgorer/TeknoGencFrontEndProjesi/blob/main/FrontEndProjeScreenShots/Screenshot_2.png)

![](https://github.com/mehmetgorer/TeknoGencFrontEndProjesi/blob/main/FrontEndProjeScreenShots/Screenshot_3.png)

![](https://github.com/mehmetgorer/TeknoGencFrontEndProjesi/blob/main/FrontEndProjeScreenShots/Screenshot_4.png)

![](https://github.com/mehmetgorer/TeknoGencFrontEndProjesi/blob/main/FrontEndProjeScreenShots/Screenshot_5.png)

![](https://github.com/mehmetgorer/TeknoGencFrontEndProjesi/blob/main/FrontEndProjeScreenShots/Screenshot_6.png)

![](https://github.com/mehmetgorer/TeknoGencFrontEndProjesi/blob/main/FrontEndProjeScreenShots/Screenshot_7.png)

![](https://github.com/mehmetgorer/TeknoGencFrontEndProjesi/blob/main/FrontEndProjeScreenShots/Screenshot_8.png)

![](https://github.com/mehmetgorer/TeknoGencFrontEndProjesi/blob/main/FrontEndProjeScreenShots/Screenshot_9.png)


# Quiz Web Application

This project is a **quiz website** application where users can answer questions across various categories to earn points. Users can register, log in to the system using **Firebase**, and their scores and membership details are stored securely on Firebase.

## Project Features

- **Category-Based Quizzes**: Answer questions in different categories and earn points.
- **Score Tracking**: Points earned from answered questions are stored on Firebase for each user.
- **User Login and Registration**: Easily sign up and log in with Firebase Authentication.
- **Mobile-Friendly Design**: Optimized to display correctly on all devices.

## About the Project

The Quiz Web Application provides a fun and educational platform where users can test their knowledge. By answering questions from a variety of categories, users can expand their knowledge and compete with others based on the points they earn. Users who register and log in can track their entire score history and quiz statistics through their profiles, stored on Firebase. The platform is user-friendly and mobile-responsive, making it accessible on both desktop and mobile devices.

## Technologies Used

This project utilizes the following technologies and libraries:

- **React**: A JavaScript library for building user interfaces.
- **Firebase**: A backend service used for user authentication, database, and hosting.
  - **Firebase Authentication**: For user login and registration processes.
  - **Firebase Firestore/Realtime Database**: For storing user scores and other data.
- **React Router**: A routing library used for navigation between different pages and components.
- **Ant Design (Antd)**: A styling and UI library used for design components and styling.
- **React-Firebase-Hooks**: A set of helper functions for integrating Firebase with React applications.
- **Testing Library**: Tools for testing the application.
  
## Installation and Running

**Clone the Repository**: Clone this project or download and extract the zip file.

bash
git clone https://github.com/mehmetgorer/TeknoGencFrontEndProjesi.git


   Install Dependencies: Install the necessary dependencies using the following command.

bash
npm install
Firebase Configuration: Add your Firebase settings to the src/firebaseConfig.js file.

Start the Application: Use the following command to start the development server.

bash
npm start
The application will run by default at http://localhost:3000.
