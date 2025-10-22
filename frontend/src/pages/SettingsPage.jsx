import { Send, Sun, Moon } from 'lucide-react'
import React from 'react'

const PreviewMessage = [
  { id: 1, content: "Hey! How is it going", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features", isSent: true },
]

const SettingsPage = ({ dark, setDark }) => {
  return (
    <div className='h-screen container mx-auto px-4 pt-20 max-w-5xl'>
      <div className="space-y-6">

        {/* Theme toggle */}
        <div className="flex flex-col gap-1">
          <h2 className='text-lg font-semibold'>Theme</h2>
          <p>Toggle dark/light mode for your chat interface</p>

          {/* Sun/Moon toggle */}
          <div className="mt-2 flex items-center gap-2">
            <Sun className='text-yellow-400' />
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={dark}
                onChange={() => setDark(!dark)}
              />
              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer-checked:bg-gray-700 dark:peer-checked:bg-gray-200 transition-all"></div>
              <div className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transform transition-all ${dark ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </label>
            <Moon className='text-gray-800 dark:text-gray-100' />
          </div>
        </div>

        {/* Preview section */}
        <h3 className='text-lg font-semibold mb-3'>Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden shadow-lg">
          <div className='p-4 bg-base-100'>
            <div className="max-w-lg mx-auto">
              <div className={`bg-base-100 rounded-xl shadow-sm overflow-hidden transition-colors duration-300 ${dark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'}`}>
                {/* Chat Header */}
                <div className='px-4 py-3 border-b border-base-300 bg-base-100'>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      AA
                    </div>
                    <div>
                      <h3 className='font-medium text-sm'>Aparanji Avula</h3>
                      <p className='text-xs text-base-content'>Online</p>
                    </div>
                  </div>
                </div>
                {/* Chat Messages */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto">
                  {PreviewMessage.map(msg => (
                    <div key={msg.id} className={`flex ${msg.isSent ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] rounded-xl p-3 shadow-sm ${msg.isSent ? "bg-primary text-primary-content" : "bg-base-200"}`}>
                        <p className="text-sm">{msg.content}</p>
                        <p className="text-[10px] mt-1.5 text-base-content/70">12:00 PM</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Chat Input */}
                <div className="p-4 border-t border-base-300">
                  <div className="flex gap-2">
                    <input type="text" className='input input-bordered flex-1 text-sm h-10' placeholder='Type a message...' value="This is a Preview!!" readOnly />
                    <button className='btn btn-primary h-10 min-h-0'>
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SettingsPage
