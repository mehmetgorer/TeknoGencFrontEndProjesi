import React, { useState, useCallback } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { Form, Input, Button, Typography, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';

const { Title } = Typography;

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = useCallback(async () => {
    if (!name || !email || !password) {
      console.error('İsim, e-posta ve şifre gereklidir.');
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });

      console.log('Kullanıcı başarıyla kaydoldu!');
      message.success('Kayıt başarılı! Lütfen giriş yapın.');
      navigate('/login');
    } catch (error) {
      console.error('Kayıt sırasında hata oluştu:', error.message);
      message.error('Kayıt başarısız. Lütfen tekrar deneyin.');
    }
  }, [name, email, password, navigate]);

  return (
    <div className="signup-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Card style={{ width: 400, borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', color: '#6a1b9a' }}>Sign Up</Title>
        <Form
          name="signupForm"
          initialValues={{ remember: true }}
          onFinish={handleSignUp}
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Lütfen adınızı giriniz!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Adınızı Girin"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Lütfen e-postanızı giriniz!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              type="email"
              placeholder="E-posta"
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
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', backgroundColor: '#6a1b9a', borderColor: '#6a1b9a' }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: 'center' }}>
        Zaten bir hesabınız var mı? <Link to="/login">Giriş Yap</Link>
        </div>
      </Card>
    </div>
  );
};

export default SignUp;
