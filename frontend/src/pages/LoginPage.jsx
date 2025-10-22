import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import AuthImagePattern from '../components/AuthImagePattern';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { login, isLogging } = useAuthStore();

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid === true) {
      await login(formData);
    }
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-gray-50 dark:bg-gray-900'>
      {/* Left side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className='w-full max-w-md space-y-8'>
          {/* Header */}
          <div className='text-center mb-8 space-y-2 flex flex-col items-center'>
            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center'>
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Welcome Back</h1>
            <p className='text-gray-700 dark:text-gray-300 text-base'>Login to your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>

            {/* Email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-800 dark:text-gray-100'>Email</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className="size-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  className='input input-bordered w-full pl-10 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
                  placeholder='Enter your email'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-800 dark:text-gray-100'>Password</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className="size-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className='input input-bordered w-full pl-10 pr-10 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
                  placeholder='Enter password'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 px-3 text-gray-600 dark:text-gray-300"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className='btn btn-primary w-full'
                disabled={isLogging}
              >
                {isLogging ? 'Logging in...' : 'Login'}
              </button>

              <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
                Don’t have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline font-medium">
                  Create Account
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Auth image */}
      <AuthImagePattern
        title="Welcome Back"
        subtitle="Continue your conversations and stay connected"
      />
    </div>
  );
};

export default LoginPage;
