
import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Radio, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './QuizStyle.css';

const { Title, Paragraph } = Typography;

const Turkish = () => {
  const questions = [
    {
      question: '1- Aşağıdaki cümlelerin hangisinde "de" bağlacı doğru kullanılmıştır?',
      options: [
        'O da gelecekmiş.',
        'Sende gel.',
        'Bu dağ çok yüksekte.',
        'Çocukta ağladı.'
      ],
      correctAnswer: 'O da gelecekmiş.',
    },
    {
      question: '"2- Küçük" kelimesinin zıt anlamlısı nedir?',
      options: ['Büyük', 'Geniş', 'Uzun', 'Dar'],
      correctAnswer: 'Büyük',
    },
    {
      question: '3- Aşağıdaki cümlelerin hangisinde "ki" bağlacı doğru kullanılmıştır?',
      options: [
        'Biliyorki o gelmeyecek.',
        'Duydumki çok başarılıymış.',
        'Öyleki anlatamam.',
        'O kadar çalıştı ki sınavı kazandı.'
      ],
      correctAnswer: 'O kadar çalıştı ki sınavı kazandı.',
    },
    {
      question: '4- Aşağıdaki cümlelerin hangisinde yazım yanlışı vardır?',
      options: [
        'Bu akşam yemeğe gideceğiz.',
        'Her gün okula giderim.',
        'Bu işde çok zordu.',
        'Dün gece çok güzeldi.'
      ],
      correctAnswer: 'Bu işde çok zordu.',
    },
    {
      question: '"5- Hızlı" kelimesinin zıt anlamlısı nedir?',
      options: ['Çabuk', 'Yavaş', 'Geniş', 'Uzun'],
      correctAnswer: 'Yavaş',
    },
    {
      question: '6- Aşağıdaki cümlelerin hangisinde "mi" soru eki doğru kullanılmıştır?',
      options: [
        'Sen de mi geliyorsun?',
        'Bu kadarmı zor?',
        'Geldiğinimi sandın?',
        'Geldimi hemen sorar.'
      ],
      correctAnswer: 'Sen de mi geliyorsun?',
    },
    {
      question: '"7- Kalemini kaybettiği için yazamıyor." cümlesinde hangi sözcük dolaylı tümleçtir?',
      options: ['Kalemini', 'kaybettiği', 'için', 'yazamıyor'],
      correctAnswer: 'Kalemini',
    },
    {
      question: '8- Aşağıdaki cümlelerin hangisinde "ile" bağlacı doğru kullanılmıştır?',
      options: [
        'Ali ile Veli gelmedi.',
        'Sen ile ben konuşmalıyız.',
        'Bu işi o ile bitirdik.',
        'O ile mi geldin?'
      ],
      correctAnswer: 'Ali ile Veli gelmedi.',
    },
    {
      question: '"9- Güzel" kelimesinin zıt anlamlısı nedir?',
      options: ['Çirkin', 'Kötü', 'Küçük', 'Dar'],
      correctAnswer: 'Çirkin',
    },
    {
      question: '10- Aşağıdaki cümlelerin hangisinde nesne vardır?',
      options: [
        'O çok çalışkan bir öğrencidir.',
        'Sabah erkenden kalktı.',
        'Kitabı masaya koydu.',
        'Dışarıda yağmur yağıyor.'
      ],
      correctAnswer: 'Kitabı masaya koydu.',
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
      updatedScore += 10; // Doğru cevap için 10 puan ekle
    } else if (selectedAnswer !== null) {
      setIncorrectAnswers(incorrectAnswers + 1); // Yanlış cevap sayısını artır
      if ((incorrectAnswers + 1) % 4 === 0) {
        updatedScore -= 10; // Her 4 yanlış cevap için 10 puan eksilt
      }
    }

    // Skoru güncelle
    setScore(updatedScore);

    setCurrentQuestionIndex(currentQuestionIndex + 1); // Sonraki soruya geç
    setSelectedAnswer(null); // Seçili cevabı sıfırla
    setTimeLeft(30); // Süreyi sıfırla
  
    // Sonucu localStorage'a kaydet
    localStorage.setItem('turkishQuizScore', JSON.stringify(updatedScore));
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
          <Title level={2} className="quiz-title">Türkçe Sınavı</Title>
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
                <Paragraph className="timer">Kalan Zaman {timeLeft} saniye</Paragraph>
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
              <Title level={3} className="quiz-finished-title">Sınav Tamamlandı</Title>
              <Paragraph className="score-text">Puanınız: {score} / 100</Paragraph>
              <Link to="/LessonSelection">
                <Button type="primary" className="back-button">Ders Seçimine geri dön</Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Turkish;
