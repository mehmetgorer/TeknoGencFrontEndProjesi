import React, { useState, useEffect } from 'react';
import { Button, Card, Typography, Radio, Input, Modal } from 'antd';
import { Link } from 'react-router-dom';
import './QuizStyle.css';

const { Title, Paragraph } = Typography;

const English = () => {
  const questions = [
    {
      question: '1) What is the capital of the United Kingdom?',
      options: ['London', 'Paris', 'Rome', 'Berlin'],
      correctAnswer: 'London',
    },
    {
      question: '2) Which word is a synonym for "happy"?',
      options: ['Sad', 'Joyful', 'Angry', 'Tired'],
      correctAnswer: 'Joyful',
    },
    {
      question: '3) What is the past tense of "go"?',
      options: ['Went', 'Goes', 'Gone', 'Going'],
      correctAnswer: 'Went',
    },
    {
      question: '4) Which of the following is a noun?',
      options: ['Quickly', 'Beautiful', 'Cat', 'Run'],
      correctAnswer: 'Cat',
    },
    {
      question: '5) What is the plural form of "child"?',
      options: ['Childs', 'Children', 'Childes', 'Childrens'],
      correctAnswer: 'Children',
    },
    {
      question: '6) What is the comparative form of "good"?',
      options: ['Better', 'Best', 'Gooder', 'Goods'],
      correctAnswer: 'Better',
    },
    {
      question: '7) What is the opposite of "young"?',
      options: ['Old', 'New', 'Child', 'Teen'],
      correctAnswer: 'Old',
    },
    {
      question: '8) Which word is a synonym for "begin"?',
      options: ['Start', 'End', 'Finish', 'Close'],
      correctAnswer: 'Start',
    },
    {
      question: '9) What is the past tense of "write"?',
      options: ['Writed', 'Writing', 'Wrote', 'Writes'],
      correctAnswer: 'Wrote',
    },
    {
      question: '10) Which sentence is grammatically correct?',
      options: [
        'She don’t like the movie.',
        'She doesn’t likes the movie.',
        'She doesn’t like the movie.',
        'She not like the movie.',
      ],
      correctAnswer: 'She doesn’t like the movie.',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [examCode, setExamCode] = useState('');
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Her soru için 30 saniye süre verdim

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
      updatedScore += 10; // Doğru cevap için 10 puan ekler
    } else if (selectedAnswer !== null) {
      setIncorrectAnswers(incorrectAnswers + 1); // Yanlış cevap sayısını artır
      if ((incorrectAnswers + 1) % 4 === 0) {
        updatedScore -= 10; // Her 4 yanlış cevap için 10 puan eksilt
      }
    }

    // Skor günceller
    setScore(updatedScore);

    setCurrentQuestionIndex(currentQuestionIndex + 1); // Sonraki soruya geçiş yapar
    setSelectedAnswer(null); // Seçilen cevabı sıfırla
    setTimeLeft(30); // Süreyi sıfırlar
  
    // Sonucu localStorage'a kaydet
    localStorage.setItem('englishQuizScore', JSON.stringify(updatedScore));
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
            title="Important Reminder"
            visible={isModalVisible}
            onOk={handleConfirm}
            onCancel={() => setIsModalVisible(false)}
            okText="Okay"
          >
            <Paragraph>Bu sınava yalnızca bir kez girilebilir.</Paragraph>
          </Modal>
        </div>
      ) : (
        <div className="quiz-content">
          <Title level={2} className="quiz-title">İngilizce Sınavı</Title>
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
export default English;
