import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/FinTarck__1_-removebg-preview.png';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (passwordHash !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/users/signup', {
        email,
        passwordHash,
        firstName,
        lastName,
      });

      console.log(response.data);
      navigate('/verify', { state: { email } });
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const evaluatePasswordStrength = (password) => {
    const strongPasswordPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    if (strongPasswordPattern.test(password)) {
      setPasswordStrength('Strong');
    } else if (password.length >= 6) {
      setPasswordStrength('Medium');
    } else {
      setPasswordStrength('Weak');
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordHash(password);
    evaluatePasswordStrength(password);
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
            <form onSubmit={handleSubmit}>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-black bg-white focus:outline-none focus:border-indigo-600"
                      placeholder="First Name"
                      required
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      First Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-black bg-white focus:outline-none focus:border-indigo-600"
                      placeholder="Last Name"
                      required
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Last Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-black bg-white focus:outline-none focus:border-indigo-600"
                      placeholder="Email Address"
                      required
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="passwordHash"
                      name="passwordHash"
                      type="password"
                      value={passwordHash}
                      onChange={handlePasswordChange}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-black bg-white focus:outline-none focus:border-indigo-600"
                      placeholder="Password"
                      required
                    />
                    <label
                      htmlFor="passwordHash"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Password
                    </label>
                    {passwordHash && (
                      <div className={`text-sm mt-2 ${passwordStrength === 'Strong' ? 'text-green-500' : passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>
                        Password Strength: {passwordStrength}
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-black bg-white focus:outline-none focus:border-indigo-600"
                      placeholder="Confirm Password"
                      required
                    />
                    <label
                      htmlFor="confirmPassword"
                      className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                    >
                      Confirm Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      type="submit"
                      className="bg-indigo-500 text-white rounded-md px-2 py-1"
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Sign Up'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
            <div className="mt-4 text-sm">
              <p className='text-black'>
                Already have an account?{' '}
                <span
                  className="text-blue-500 cursor-pointer"
                  onClick={() => navigate('/')}
                >
                  Login here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
