import React, { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import MessageSkeleton from './skeletons/MessageSkeleton.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import { formateMsgTime } from '../lib/utils.js';

const ChatContainer = ({ dark }) => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subcribeToMessages, unsubcribeMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessages(selectedUser._id);
    subcribeToMessages();

    return () => unsubcribeMessages();
  }, [getMessages, selectedUser?._id, subcribeToMessages, unsubcribeMessages]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className={`flex-1 flex flex-col overflow-auto transition-colors duration-300 ${dark ? "bg-gray-700 text-gray-100" : "bg-yellow-50 text-gray-800"}`}>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div className={`chat ${msg.senderId?.toString() === authUser?._id?.toString() ? "chat-end" : "chat-start"}`} key={msg._id}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    msg.senderId?.toString() === authUser?._id?.toString()
                      ? authUser.profilePic || '/avatar.webp'
                      : selectedUser.profilePic || '/avatar.webp'
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-sm opacity-50 ml-1">{formateMsgTime(msg.createdAt)}</time>
            </div>
            <div className="chat-bubble flex flex-col">
              {msg.image && <img src={msg.image} alt="Attachment" className="sm:max-w-[200px] rounded-md mb-2" />}
              {msg.text && <p>{msg.text}</p>}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Override MessageInput text color */}
      <MessageInput inputClassName="text-black" />
    </div>
  );
};

export default ChatContainer;
