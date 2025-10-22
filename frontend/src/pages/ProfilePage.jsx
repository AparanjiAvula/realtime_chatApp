import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera, User, Mail } from 'lucide-react';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 pt-20 flex justify-center">
      <div className="w-full max-w-md p-6">
        <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 space-y-6 transition-colors duration-300">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Profile</h1>
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-300 mt-1">
              Your profile information
            </p>
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={selectedImage || authUser.profilePic || './avatar.webp'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-gray-800 dark:bg-gray-200 p-2 rounded-full cursor-pointer transition-transform duration-200 hover:scale-110 ${
                  isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
                }`}
              >
                <Camera className="w-5 h-5 text-white dark:text-gray-800" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
              {isUpdatingProfile ? 'Uploading...' : 'Click the camera icon to update your photo'}
            </p>
          </div>

          {/* Personal Info */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 font-bold mb-1">
                <User className="w-4 h-4" /> Full Name
              </div>
              <p className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 font-bold text-gray-800 dark:text-gray-100">
                {authUser?.fullName}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-300 font-bold mb-1">
                <Mail className="w-4 h-4" /> Email Address
              </div>
              <p className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-600 border border-gray-200 dark:border-gray-500 font-bold text-gray-800 dark:text-gray-100">
                {authUser?.email}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 transition-colors duration-300">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Account Information</h2>
            <div className="space-y-2 text-sm font-bold text-gray-700 dark:text-gray-200">
              <div className="flex justify-between">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split('T')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span>Account Status</span>
                <span className="text-green-500 font-bold">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
