// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/FinTarck__1_-removebg-preview.png';

const VerifyScreen = () => {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email; // Get the email passed from the signup screen

  const handleVerifyCode = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/users/verify', { email, code: inputCode });
      if (response.data.message === 'Email verified successfully.') {
        setError('');
        navigate('/'); // Navigate to a success page or home page after successful verification
      } else {
        setError('Verification code is incorrect.');
      }
    } catch (error) {
      setError('Verification failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-300 to-indigo-400 py-6 flex flex-col justify-center sm:py-12 bg-cover bg-center">
      <div className="relative py-3 shadow-l sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-indigo-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <img src={logo} alt="FinTrack Logo" />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div className="relative">
                <input
                  autoComplete="off"
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-black bg-white focus:outline-none focus:border-indigo-600"
                  placeholder="Enter Verification Code"
                  required
                />
                <label
                  htmlFor="verificationCode"
                  className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Verification Code
                </label>
                <button
                  type="button"
                  className="mt-2 bg-indigo-500 text-white rounded-md px-2 py-1"
                  onClick={handleVerifyCode}
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify Code'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyScreen;
