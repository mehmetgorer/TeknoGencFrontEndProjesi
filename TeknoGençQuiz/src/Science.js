import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Radio, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './QuizStyle.css';

const { Title, Paragraph } = Typography;

const Science = () => {
  const questions = [
    {
      question: '1- En büyük gezegen hangisidir?',
      options: ['Dünya', 'Mars', 'Jüpiter', 'Venüs'],
      correctAnswer: 'Jüpiter',
    },
    {
      question: '2- Hangi elementin kimyasal sembolü "O" dur?',
      options: ['Oksijen', 'Altın', 'Gümüş', 'Demir'],
      correctAnswer: 'Oksijen',
    },
    {
      question: '3- Su kaç derecede kaynar?',
      options: ['90°C', '100°C', '110°C', '120°C'],
      correctAnswer: '100°C',
    },
    {
      question: '4- Bitkilerin fotosentez yapmasını sağlayan pigment hangisidir?',
      options: ['Hemoglobin', 'Melanin', 'Klorofil', 'Keratin'],
      correctAnswer: 'Klorofil',
    },
    {
      question: '5- Evrenin oluşumu hangi teoriyi açıklar?',
      options: ['Büyük Patlama', 'Kuantum Teorisi', 'Görelilik Teorisi', 'Kaos Teorisi'],
      correctAnswer: 'Büyük Patlama',
    },
    {
      question: '6- Işığın hızı ne kadardır?',
      options: ['300,000 km/s', '150,000 km/s', '450,000 km/s', '600,000 km/s'],
      correctAnswer: '300,000 km/s',
    },
    {
      question: '7- Hangi gezegenin halkaları vardır?',
      options: ['Mars', 'Venüs', 'Satürn', 'Jüpiter'],
      correctAnswer: 'Satürn',
    },
    {
      question: '8- Hangi elementin atom numarası 1\'dir?',
      options: ['Helyum', 'Oksijen', 'Hidrojen', 'Karbon'],
      correctAnswer: 'Hidrojen',
    },
    {
      question: '9- En bol bulunan element hangisidir?',
      options: ['Oksijen', 'Hidrojen', 'Azot', 'Karbon'],
      correctAnswer: 'Hidrojen',
    },
    {
      question: '10- Dünyanın en derin noktası neresidir?',
      options: ['Mariana Çukuru', 'Tonga Çukuru', 'Java Çukuru', 'Puerto Rico Çukuru'],
      correctAnswer: 'Mariana Çukuru',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [examCode, setExamCode] = useState('');
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Her soru için 30 saniye süre

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleNextQuestion = () => {
    let updatedScore = score; // Güncel skoru geçici bir değişkende sakla

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      updatedScore += 10; // Doğru cevap için 10 puan ekledim:
    } else if (selectedAnswer !== null) {
      setIncorrectAnswers(incorrectAnswers + 1); // Yanlış cevap sayısını 1 artırma:
      if ((incorrectAnswers + 1) % 4 === 0) {
        updatedScore -= 10; // Her 4 yanlış cevap için 10 puan eksiltiriz.
      }
    }

    // Skoru güncelle
    setScore(updatedScore);

    setCurrentQuestionIndex(currentQuestionIndex + 1); // Sonraki soruya geçer:
    setSelectedAnswer(null); // Seçili cevabı sıfırlar:
    setTimeLeft(30); // Süreyi sıfırladım
  
    // Sonucu localStorage'a kaydet
    localStorage.setItem('scienceQuizScore', JSON.stringify(updatedScore));
  };

  const handleStartExam = () => {
    if (examCode) {
      setIsModalVisible(true);
    } else {
      alert('Lütfen sınav kodunu giriniz.');
    }
  };

  const handleConfirm = () => {
    setIsModalVisible(false);
    setIsCodeEntered(true);
  };

  return (
    <div className="quiz-container">
      {!isCodeEntered ? (
        <div className="code-entry">
          <Title level={2}>Sınav Kodunu Girin</Title>
          <Input
            placeholder="Sınav Kodu"
            value={examCode}
            onChange={(e) => setExamCode(e.target.value)}
            className="exam-code-input"
          />
          <Button type="primary" onClick={handleStartExam} className="start-exam-button">Sınava Başla</Button>
          <Modal
            title="Önemli Hatırlatma"            
            visible={isModalVisible}
            onOk={handleConfirm}
            onCancel={() => setIsModalVisible(false)}
            okText="Okay"
          >
            <Paragraph>Bu sınav sadece 1 kez çözülebilir.</Paragraph>
          </Modal>
        </div>
      ) : (
        <div className="quiz-content">
          <Title level={2} className="quiz-title">Fen Bilimleri Sınavı</Title>
          {currentQuestionIndex < questions.length ? (
            <Card className="question-card">
              <Paragraph className="question-text">{questions[currentQuestionIndex].question}</Paragraph>
              <Radio.Group
                onChange={(e) => setSelectedAnswer(e.target.value)}
                value={selectedAnswer}
                className="options-group"
              >
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <Radio key={index} value={option} className="option-radio">
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
              <div className="button-container">
                <Paragraph className="timer">Kalan zaman: {timeLeft} saniye</Paragraph>
                <Button
                  type="primary"
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="next-button"
                >
                  İleri
                </Button>
              </div>
            </Card>
          ) : (
            <div className="quiz-finished">
              <Title level={3} className="quiz-finished-title">Sınav Tamamlandı!</Title>
              <Paragraph className="score-text">Puanınız {score} / 100</Paragraph>
              <Link to="/LessonSelection">
                <Button type="primary" className="back-button">Ders Seçimine Geri Dön</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Science;

