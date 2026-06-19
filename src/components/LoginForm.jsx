import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import * as authService from '../services/authService';

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    // Clear previous errors
    setError('');

    // Client-side validation
    if (!email || email.trim().length === 0) {
      setError('Email is required');
      return;
    }

    if (!password || password.trim().length === 0) {
      setError('Password is required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Call authentication service
      const result = await authService.login(email.trim(), password);

      if (result.success && result.token && result.user) {
        // Store authentication state
        login(result.token, result.user);
        
        // Redirect to dashboard
        navigate('/dashboard');
      } else {
        // Show error message
        setError(result.error || 'Login failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleInputChange = () => {
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
  };

  return (
    <form className="login-card" aria-label="Login form" onSubmit={handleSubmit}>
      <div className="login-card__header">
        <p className="eyebrow">Secure access</p>
        <h1>Welcome Back</h1>
        <p className="login-card__subtitle">Sign in to access your portfolio dashboard</p>
      </div>

      {error && (
        <div className="login-card__error" role="alert">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {error}
        </div>
      )}

      <div className="login-card__fields">
        <div className="field-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-shell">
            <span className="input-shell__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
                <path d="m22 7-10 6L2 7" />
              </svg>
            </span>
            <input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="demo@portfolio.com" 
              autoComplete="email" 
              required 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                handleInputChange();
              }}
              disabled={isSubmitting}
            />
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="password">Password</label>
          <div className="input-shell input-shell--with-toggle">
            <span className="input-shell__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="10" rx="2" />
                <path d="M7 11V8a5 5 0 0 1 10 0v3" />
              </svg>
            </span>
            <input 
              id="password" 
              name="password" 
              type={showPassword ? 'text' : 'password'} 
              placeholder="Portfolio@123" 
              autoComplete="current-password" 
              required 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange();
              }}
              disabled={isSubmitting}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              disabled={isSubmitting}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
      </div>

      <div className="login-card__meta">
        <label className="remember-me" htmlFor="rememberMe">
          <input id="rememberMe" name="rememberMe" type="checkbox" disabled={isSubmitting} />
          <span>Remember Me</span>
        </label>
        <a href="#forgot-password">Forgot Password?</a>
      </div>

      <button type="submit" className="login-card__submit" disabled={isSubmitting} aria-busy={isSubmitting}>
        <span className={`login-card__submit-label ${isSubmitting ? 'is-loading' : ''}`}>
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </span>
        <span className="login-card__spinner" aria-hidden="true" />
      </button>

      <p className="login-card__hint">
        Demo credentials: demo@portfolio.com / Portfolio@123
      </p>
    </form>
  );
}