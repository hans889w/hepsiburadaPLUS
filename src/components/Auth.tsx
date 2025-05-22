import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'girişyap' | 'üyeol'>('girişyap');

  useEffect(() => {
    if (location.pathname === '/girişyap') {
      setActiveTab('girişyap');
    } else if (location.pathname === '/üyeol') {
      setActiveTab('üyeol');
    }
  }, [location.pathname]);

  const handleTabChange = (tab: 'girişyap' | 'üyeol') => {
    setActiveTab(tab);
    navigate(tab === 'girişyap' ? '/girişyap' : '/üyeol');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-3">
      <h1 className="text-3xl font-bold text-orange-500 mb-6">hepsiburada</h1>
      <div className="w-full max-w-md bg-white rounded-xl shadow border px-6 py-8">
        <div className="flex mb-4 border-b">
          <button
            onClick={() => handleTabChange('girişyap')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'girişyap' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
          >
            Giriş yap
          </button>
          <button
            onClick={() => handleTabChange('üyeol')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'üyeol' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
            }`}
          >
            Üye ol
          </button>
        </div>
        {activeTab === 'girişyap' ? <Login /> : <Register />}
      </div>
    </div>
  );
}

export default Auth;