import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typography, Button, Row, Col, Card } from 'antd';
import { ArrowRightOutlined, ExperimentOutlined, NumberOutlined, ReadOutlined, GlobalOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase'; // firebase.js dosyası ile aynı klasörde olduğu için sadece './firebase' şeklinde import edilebilir

const { Title, Paragraph } = Typography;

const LessonSelection = ({ handleLogout }) => {
  const navigate = useNavigate();
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
    return <h1>Yükleniyor</h1>;
  }

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/login');
  };

  const cardStyle = { 
    backgroundColor: '#F0DDF3', 
    textAlign: 'center', 
    height: '100%' 
  };

  const logoutButtonStyle = {
    backgroundColor: '#EF9DC3',
    borderColor: '#9944A9',
    color: '#FFF',
    fontSize: '16px',
    padding: '10px 20px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '150px', // Buton genişliği ayarı
  };

  const usernameButtonStyle = {
    backgroundColor: '#EF9DC3', // Pembe renk
    color: '#FFF', // Beyaz yazı rengi
    fontSize: '24px',
    padding: '10px 20px',
    borderRadius: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.4s',
    marginRight: '20px', // Sağdan boşluk
    animation: 'shadowGlow 0.3s ease-in-out', // Üzerine gelindiğinde gölgelendirme ve ışıltı animasyonu
  };

  // Gölgelendirme ve ışıltı animasyonunun tanımı
  const glowKeyframes = `
    @keyframes shadowGlow {
      0% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
      50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
      100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
    }
  `;
  const glowStyles = document.createElement('style');
  glowStyles.innerHTML = glowKeyframes;
  document.head.appendChild(glowStyles);

  // Handle navigation to profile page
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div style={{ padding: '30px' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button type="text" style={usernameButtonStyle} onClick={handleProfileClick}>
          {user.displayName}
        </Button>
      </div>
      <Title level={2} style={{ marginBottom: '50px', textAlign: 'center' }}>
      Bir Ders Seçin
      </Title>
      <Row gutter={[16, 16]} style={{ marginTop: '50px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card
            title="Science"
            bordered={false}
            hoverable
            style={cardStyle}
            actions={[
              <Link to="/lessons/science">
                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  style={{ backgroundColor: '#450F67', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                >
                  Fen Dersine Git
                </Button>
              </Link>,
            ]}
          >
            <Paragraph style={{ textAlign: 'center' }}>
              <ExperimentOutlined style={{ fontSize: '64px', marginBottom: '10px' }} />
            </Paragraph>
            <Paragraph style={{ textAlign: 'center' }}>Bu Fen Bilimleri dersi.</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            title="Math"
            bordered={false}
            hoverable
            style={cardStyle}
            actions={[
              <Link to="/lessons/math">
                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  style={{ backgroundColor: '#450F67', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                >
                  Matematik Dersine Git
                </Button>
              </Link>,
            ]}
          >
            <Paragraph style={{ textAlign: 'center' }}>
              <NumberOutlined style={{ fontSize: '64px', marginBottom: '10px' }} />
            </Paragraph>
            <Paragraph style={{ textAlign: 'center' }}>Bu Matematik dersidir.</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            title="Turkish"
            bordered={false}
            hoverable
            style={cardStyle}
            actions={[
              <Link to="/lessons/turkish">
                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  style={{ backgroundColor: '#450F67', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                >
                  Türkçe Dersine Git
                </Button>
              </Link>,
            ]}
          >
            <Paragraph style={{ textAlign: 'center' }}>
              <GlobalOutlined style={{ fontSize: '64px', marginBottom: '10px' }} />
            </Paragraph>
            <Paragraph style={{ textAlign: 'center' }}>Bu Türkçe dersi.</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card
            title="English"
            bordered={false}
            hoverable
            style={cardStyle}
            actions={[
              <Link to="/lessons/english">
                <Button
                  type="primary"
                  icon={<ArrowRightOutlined />}
                  style={{ backgroundColor: '#450F67', display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}
                >
                  İngilizce Dersine Git
                </Button>
              </Link>,
            ]}
          >
            <Paragraph style={{ textAlign: 'center' }}>
              <ReadOutlined style={{ fontSize: '64px', marginBottom: '10px' }} />
            </Paragraph>
            <Paragraph style={{ textAlign: 'center' }}>Bu İngilizce dersi.</Paragraph>
          </Card>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Button
          type="primary"
          style={logoutButtonStyle}
          onClick={handleLogoutClick}
          id="logoutButton"
          icon={<LogoutOutlined />}
        >
          Çıkış Yap
        </Button>
      </div>
    </div>
  );
};

export default LessonSelection;
