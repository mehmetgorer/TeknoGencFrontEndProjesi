
import React, { useState, useCallback } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title } = Typography;

const SignIn = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    if (!email || !password) {
      console.error('E-posta ve şifre gereklidir.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Kullanıcı başarıyla oturum açtı!');
      message.success('Giriş başarılı!');
      onLoginSuccess({ email });
      navigate('/LessonSelection');
    } catch (error) {
      console.error('Giriş yaparken hata oluştu:', error.message);
      message.error('Giriş başarısız. Lütfen kimlik bilgilerinizi kontrol edin.');
    }
  }, [email, password, navigate, onLoginSuccess]);

  return (
    <div className="login-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: 500, borderRadius: '14px', boxShadow: '40px 40px 8px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', color: '#6a1b9a' }}>Giriş Yap</Title>
        <Form
          name="loginForm"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Lütfen kullanıcı adınızı giriniz!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Kullanıcı adı"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi giriniz!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#6a1b9a', borderColor: '#6a1b9a' }}>
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
        Hesabınız yok mu? <Link to="/signup">Kayıt Olun</Link>
        </div>
      </Card>
    </div>
  );
};

export default SignIn;