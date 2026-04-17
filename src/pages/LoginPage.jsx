import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAppContext } from '../context/AppContext';

function LoginPage() {
  const { login, authError, authLoading, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(location.state?.from?.pathname ?? '/', { replace: true });
    }
  }, [isAuthenticated, location.state, navigate]);

  async function handleLogin(credentials) {
    const result = await login({
      email: credentials.email,
      password: credentials.password,
    });

    if (result.success) {
      navigate(location.state?.from?.pathname ?? '/', { replace: true });
    }
  }

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Log in to keep your saved questions, important picks, and completed topics tied to your account only."
      buttonLabel="Login"
      alternateLabel="Need an account?"
      alternatePath="/register"
      onSubmit={handleLogin}
      authError={authError}
      authLoading={authLoading}
    />
  );
}

export default LoginPage;
