import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as authService from '../services/authService';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const result = await authService.forgotPassword(email);

    setMessage(result.message);
    setLoading(false);
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>

        {message && <p>{message}</p>}

        <Link to="/login">Back to Login</Link>
      </form>
    </div>
  );
}