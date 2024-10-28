import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Radio, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './QuizStyle.css';

const { Title, Paragraph } = Typography;

const Math = () => {
  const questions = [
    {
      question: '1- 2x + 3 = 7 denkleminin çözümü nedir?',
      options: ['x = 1', 'x = 2', 'x = 3', 'x = 4'],
      correctAnswer: 'x = 2',
    },
    {
      question: '2- Türev nedir?',
      options: ['Bir fonksiyonun limitidir', 'Bir fonksiyonun integralidir', 'Bir fonksiyonun eğimidir', 'Bir fonksiyonun alanıdır'],
      correctAnswer: 'Bir fonksiyonun eğimidir',
    },
    {
      question: '3- f(x) = x^2 fonksiyonunun x = 2 noktasındaki türevi nedir?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '4',
    },
    {
      question: '4- 3x + 5 = 20 denkleminin çözümü nedir?',
      options: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
      correctAnswer: 'x = 5',
    },
    {
      question: '5- Bir dairenin çevresini bulmak için hangi formül kullanılır?',
      options: ['C = πr', 'C = 2πr', 'C = πr^2', 'C = 2πr^2'],
      correctAnswer: 'C = 2πr',
    },
    {
      question: '6- 2x + 4 = 12 denkleminin çözümü nedir?',
      options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
      correctAnswer: 'x = 4',
    },
    {
      question: '7- 5x + 10 = 30 denkleminin çözümü nedir?',
      options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'],
      correctAnswer: 'x = 4',
    },
    {
      question: '8- Karekök 64 kaçtır?',
      options: ['4', '6', '8', '10'],
      correctAnswer: '8',
    },
    {
      question: '9- 3x + 9 = 27 denkleminin çözümü nedir?',
      options: ['x = 6', 'x = 7', 'x = 8', 'x = 9'],
      correctAnswer: 'x = 6',
    },
    {
      question: '10- Bir üçgenin iç açıları toplamı kaç derecedir?',
      options: ['90°', '180°', '270°', '360°'],
      correctAnswer: '180°',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [examCode, setExamCode] = useState('');
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Her soru için 30 saniye süre tanımladım:

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
    let updatedScore = score; // Güncel skoru geçici bir değişkende sakladım:

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      updatedScore += 10; // Doğru cevap için 10 puan ekle
    } else if (selectedAnswer !== null) {
      setIncorrectAnswers(incorrectAnswers + 1); // Yanlış cevap sayısını artırırız
      if ((incorrectAnswers + 1) % 4 === 0) {
        updatedScore -= 10; // Her 4 yanlış cevap için 10 puan eksiltiriz
      }
    }

    // Skoru güncelle
    setScore(updatedScore);

    setCurrentQuestionIndex(currentQuestionIndex + 1); // Sonraki soruya geçiş
    setSelectedAnswer(null); // Seçili cevabı sıfırla
    setTimeLeft(30); // Süreyi sıfırlar
  
    // Sonucu localStorage'a kaydettim:
    localStorage.setItem('mathQuizScore', JSON.stringify(updatedScore));
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
          <Title level={2} className="quiz-title">Matematik Sınavı</Title>
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
              <Title level={3} className="quiz-finished-title">Sınav Bitti!</Title>
              <Paragraph className="score-text">Puanınız: {score} / 100</Paragraph>
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
export default Math;

