import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAppContext } from '../context/AppContext';

function RegisterPage() {
  const { register, authError, authLoading, isAuthenticated } = useAppContext();
  const navigate = useNavigate();
  const [pendingApproval, setPendingApproval] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  async function handleRegister(credentials) {
    const result = await register(credentials);

    if (result.pending) {
      setPendingApproval(true);
    }
  }

  return (
    <AuthForm
      title="Create your account"
      subtitle="Sign up to save questions and keep your own interview-prep progress synced to the backend."
      buttonLabel="Create account"
      alternateLabel="Already registered?"
      alternatePath="/login"
      onSubmit={handleRegister}
      authError={authError}
      authLoading={authLoading}
      includeName
      includeCourse
      pendingApproval={pendingApproval}
    />
  );
}

export default RegisterPage;
