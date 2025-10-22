import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern';
import { toast } from 'react-hot-toast';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full Name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid Email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-gray-50 dark:bg-gray-900'>
      {/* Left side - form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className='w-full max-w-md space-y-8'>
          {/* Header */}
          <div className='text-center mb-8 space-y-2 flex flex-col items-center'>
            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors group-hover:bg-primary/20'>
              <MessageSquare className="size-6 text-primary" />
            </div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100'>Create Account</h1>
            <p className='text-gray-700 dark:text-gray-300 text-base'>Get started with a free account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>

            {/* Full Name */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-800 dark:text-gray-100'>Full Name</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className="size-5 text-gray-500 dark:text-gray-400"/>
                </div>
                <input
                  type="text"
                  name="fullName"
                  className='input input-bordered w-full pl-10 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
                  placeholder='Enter Your Full Name'
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium text-gray-800 dark:text-gray-100'>Email</span>
              </label>
              <div className="relative">
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className="size-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  className='input input-bordered w-full pl-10 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400'
                  placeholder='Enter Your Email'
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
                  placeholder='Enter Password'
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

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className='btn btn-primary w-full'
                disabled={isSigningUp}
              >
                {isSigningUp ? 'Signing up...' : 'Sign Up'}
              </button>
              <div className="text-center text-sm text-gray-600 dark:text-gray-300 mt-2">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - image pattern */}
      <AuthImagePattern
        title="Join Our Community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones"
      />
    </div>
  );
};

export default SignupPage;
