import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import NoChatSelected from '../components/NoChatSelected.jsx'
import Sidebar from '../components/Sidebar.jsx'
import ChatContainer from '../components/ChatContainer.jsx'

const HomePage = ({ dark }) => {
  const { selectedUser } = useChatStore()

  return (
    <div className={`h-screen transition-colors duration-300 ${dark ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <div className="flex items-center justify-center pt-20 px-4">
        <div className={`rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)] transition-colors duration-300 ${dark ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar dark={dark} />
            {selectedUser ? <ChatContainer dark={dark} /> : <NoChatSelected />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
