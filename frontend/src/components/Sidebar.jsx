// src/components/Sidebar.jsx
import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton.jsx'
import { Users } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore.js'

const Sidebar = ({ dark }) => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = showOnlineOnly
    ? users.filter(user => onlineUsers.includes(user._id))
    : users;

  useEffect(() => {
    getUsers()
  }, [getUsers])

  if (isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className={`h-full w-20 lg:w-72 border-r flex flex-col transition-all duration-200
      ${dark ? 'bg-gray-900 text-gray-100 border-gray-700' : 'bg-white text-gray-800 border-gray-200'}`}
    >
      {/* Header */}
      <div className="border-b w-full p-5 flex flex-col gap-3 border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className='font-medium hidden lg:block'>Contacts</span>
        </div>

        {/* Online filter */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className='cursor-pointer flex items-center gap-2'>
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className='checkbox checkbox-sm'
            />
            <span className='text-sm'>Show online only</span>
          </label>
          <span className='text-sm text-zinc-500'>({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      {/* Users list */}
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map(user => {
          const isSelected = selectedUser?._id === user._id;
          return (
            <button
  key={user._id}
  onClick={() => setSelectedUser(user)}
  className={`w-full p-3 flex items-center gap-3 transition-colors rounded
    ${isSelected ? (dark ? 'bg-gray-700 ring-gray-500' : 'bg-gray-300 ring-gray-400') : ''}
    ${dark
      ? 'hover:bg-gray-600'
      : 'hover:bg-gray-200'
    }`}
>
  <div className="relative mx-auto lg:mx-0">
    <img
      src={user.profilePic || '/avatar.webp'}
      alt={user.fullName}
      className='size-12 object-cover rounded-full'
    />
    {onlineUsers.includes(user._id) && (
      <span className='absolute bottom-0 right-0 size-3.5 bg-green-500 rounded-full ring-2 ring-white dark:ring-gray-900' />
    )}
  </div>

  {/* User Info */}
  <div className="hidden lg:block text-left min-w-0">
    <div className={`font-medium truncate ${isSelected ? (dark ? 'text-gray-100' : 'text-gray-800') : dark ? 'text-gray-100' : 'text-gray-800'}`}>
      {user.fullName}
    </div>
    <div className={`text-sm ${isSelected ? (dark ? 'text-gray-300' : 'text-gray-600') : 'text-zinc-400'}`}>
      {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
    </div>
  </div>
</button>

          )
        })}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            No online users
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
