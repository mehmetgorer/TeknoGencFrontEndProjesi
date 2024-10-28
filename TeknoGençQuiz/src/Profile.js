import React from 'react';
import { Card, Typography, Descriptions, Row, Col, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './Profile.css'; // Stil dosyanızı import edin

const { Title, Paragraph } = Typography;

const Profile = ({ user }) => {
  // localStorage'dan quiz skorlarını al
  const quizScores = {
    science: JSON.parse(localStorage.getItem('scienceQuizScore')),
    math: JSON.parse(localStorage.getItem('mathQuizScore')),
    english: JSON.parse(localStorage.getItem('englishQuizScore')),
    turkish: JSON.parse(localStorage.getItem('turkishQuizScore')),
    // Diğer dersler buraya eklenebilir
  };

  return (
    <div className="profile-container">
      {user ? (
        <Card className="profile-card" bordered={false} style={{ backgroundColor: '#D2DFF3', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}>
          <Row justify="center" align="middle" gutter={[16, 16]}>
            <Col span={4}>
              <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#90A3F0', color: '#fff' }} />
              {/* Yukarıdaki stil Avatar bileşeninin arka plan rengini ve ikon rengini ayarlar */}
            </Col>
            <Col span={20}>
              <div style={{ textAlign: 'center' }}>
                <Title level={3}>{user.displayName}</Title>
                <Paragraph>{user.email}</Paragraph>
              </div>
            </Col>
          </Row>
          <Descriptions bordered column={1} className="quiz-scores">
            <Descriptions.Item label="Fen Bilimleri Sınav Puanı" style={{ backgroundColor: '#e6f7ff' }}>
              {quizScores.science ? quizScores.science : 'Mevcut değil'}
            </Descriptions.Item>
            <Descriptions.Item label="Matematik Sınav Puanı" style={{ backgroundColor: '#f6ffed' }}>
              {quizScores.math ? quizScores.math : 'Mevcut değil'}
            </Descriptions.Item>
            <Descriptions.Item label="İngilizce Sınav Puanı" style={{ backgroundColor: '#fffbe6' }}>
              {quizScores.english ? quizScores.english : 'Mevcut değil'}
            </Descriptions.Item>
            <Descriptions.Item label="Türkçe Quiz Skoru" style={{ backgroundColor: '#f9f0ff' }}>
              {quizScores.turkish ? quizScores.turkish : 'Mevcut değil'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      ) : (
        <div className="no-user-message">
          <Title level={4}>Lütfen giriş yapın.</Title>
        </div>
      )}
    </div>
  );
};

export default Profile;

