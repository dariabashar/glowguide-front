import { useState } from 'react';
import { login, register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc'

const features = [
  { text: 'AI-powered analysis of your unique features' },
  { text: 'Personalized makeup recommendations' },
  { text: 'Virtual try-on in real time' },
  { text: 'Exclusive tips from beauty experts' },
];

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const handleGoogleLogin = () => {
  const clientId = "197273667925-2udbubul9pd2j4qfo4cj05rk3sodn4qe.apps.googleusercontent.com";
  const redirectUri = "http://localhost:8000/auth/callback";
  const scope = "openid email profile";

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}` +
    `&redirect_uri=${redirectUri}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent(scope)}`;

  window.location.href = googleAuthUrl;
};


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data: { access_token: string } = await login(email, password);
      localStorage.setItem('token', data.access_token);
      navigate('/home');
    } catch {
      setError('Login failed');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!agree) {
      setError('You must agree to the Terms of Service');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await register(email, password);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsLogin(true);
      }, 1500);
    } catch {
      setError('Registration failed');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 50%, #fef3cd 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 0',
    }}>
      <div style={{
        display: 'flex',
        maxWidth: 1100,
        width: '100%',
        background: 'transparent',
        borderRadius: 24,
        boxShadow: 'none',
        gap: 48,
        alignItems: 'stretch',
        justifyContent: 'center',
      }}>
        {/* Левая часть */}
        <div style={{
          flex: 1.2,
          minWidth: 340,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '32px 0 32px 40px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{
              background: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ fontSize: 28, color: 'white' }}>★</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: 24, color: '#a855f7', letterSpacing: 1 }}>GlowGuide</span>
          </div>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0, color: '#222', lineHeight: 1.1 }}>Discover your<br /><span style={{ color: '#a855f7' }}>perfect beauty</span></h1>
          <p style={{ fontSize: '1.15rem', color: '#444', margin: '28px 0 32px 0', maxWidth: 500 }}>
            Join thousands of users who have already discovered personalized AI-powered makeup recommendations.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: 32 }}>
            {features.map(f => (
              <li key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1.1rem', color: '#6b21a8', marginBottom: 10 }}>
                <span style={{ color: '#222', fontWeight: 500 }}>{f.text}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Правая часть — форма */}
        <div style={{
          flex: 1,
          minWidth: 340,
          background: 'white',
          borderRadius: 24,
          boxShadow: '0 8px 32px rgba(168,85,247,0.10)',
          padding: '40px 36px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.5rem', marginBottom: 18, color: '#222', textAlign: 'center' }}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </div>
          <div style={{ color: '#666', fontSize: '1.05rem', marginBottom: 24, textAlign: 'center' }}>
            {isLogin ? 'Sign in to your account to continue' : 'Join the beauty community'}
          </div>
          <form onSubmit={isLogin ? handleLogin : handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {!isLogin && (
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Full Name"
                style={{
                  padding: '14px 18px',
                  borderRadius: 8,
                  border: '1.5px solid #e5e7eb',
                  fontSize: '1.05rem',
                  outline: 'none',
                  background: '#fafaff',
                  marginBottom: 2,
                }}
                required
              />
            )}
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email address"
              style={{
                padding: '14px 18px',
                borderRadius: 8,
                border: '1.5px solid #e5e7eb',
                fontSize: '1.05rem',
                outline: 'none',
                background: '#fafaff',
                marginBottom: 2,
              }}
              required
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              style={{
                padding: '14px 18px',
                borderRadius: 8,
                border: '1.5px solid #e5e7eb',
                fontSize: '1.05rem',
                outline: 'none',
                background: '#fafaff',
                marginBottom: 2,
              }}
              required
            />
            {!isLogin && (
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                style={{
                  padding: '14px 18px',
                  borderRadius: 8,
                  border: '1.5px solid #e5e7eb',
                  fontSize: '1.05rem',
                  outline: 'none',
                  background: '#fafaff',
                  marginBottom: 2,
                }}
                required
              />
            )}
            {!isLogin && (
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.98rem', color: '#666', marginBottom: 2 }}>
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} required style={{ accentColor: '#a855f7' }} />
                I agree to the Terms of Service
              </label>
            )}
            {error && <div style={{ color: 'red', fontWeight: 500, fontSize: '1.05rem', marginBottom: 2 }}>{
              error === 'Login failed' ? 'Login failed' :
              error === 'You must agree to the Terms of Service' ? 'You must agree to the Terms of Service' :
              error === 'Passwords do not match' ? 'Passwords do not match' :
              error === 'Registration failed' ? 'Registration failed' :
              error === 'Please fill in all fields' ? 'Please fill in all fields' :
              error
            }</div>}
            {success && <div style={{ color: '#10b981', fontWeight: 500, fontSize: '1.05rem', marginBottom: 2 }}>Registration successful! You can now sign in.</div>}
            <button type="submit" style={{
              background: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.15rem',
              border: 'none',
              borderRadius: 8,
              padding: '14px 0',
              marginTop: 8,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(167,139,250,0.08)',
              transition: 'all 0.2s',
            }}>{isLogin ? 'Sign In' : 'Sign Up'}</button>
            <div style={{ textAlign: 'center', marginTop: 10, color: '#666', fontSize: '1rem' }}>
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span
                style={{ color: '#a855f7', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => { setIsLogin(!isLogin); setError(null); }}
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </span>
            </div>
          </form>
          <div style={{ textAlign: 'center', margin: '18px 0 8px 0', color: '#888', fontSize: '1rem', fontWeight: 500 }}>или</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
            <button onClick={handleGoogleLogin} style={{
              background: 'white',
              border: '1.5px solid #e5e7eb',
              borderRadius: 8,
              padding: '10px 24px',
              fontWeight: 700,
              fontSize: '1rem',
              color: '#222',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 1px 4px rgba(167,139,250,0.04)',
            }}><span style={{ fontSize: 20 }}><FcGoogle size={20}/></span> Google</button>
          </div>
        </div>
      </div>
    </div>
  );
} 