import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (location.pathname === '/signup') {
      setActiveTab('register');
    } else if (location.pathname === '/signin') {
      setActiveTab('login');
    }
  }, [location.pathname]);

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab);
    navigate(tab === 'login' ? '/signin' : '/signup');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-3">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">hepsiburada</h1>
      <div className="w-full max-w-md bg-white rounded-xl shadow border px-6 py-8">
        <div className="flex mb-4 border-b">
          <button
            onClick={() => handleTabChange('login')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'login' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
          >
            Giriş yap
          </button>
          <button
            onClick={() => handleTabChange('register')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'register' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
          >
            Üye ol
          </button>
        </div>
        {activeTab === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Auth;