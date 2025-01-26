import React from 'react'
import { useChatStore } from '../store/useChatStore'
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
import Sidebar from '../components/Sidebar';

const HomePage = () => {
    const { selectedUser } = useChatStore();
    return (
        <div className="min-h-screen bg-base-200 flex mt-12">
            <div className="bg-base-100 rounded-lg shadow-cl w-full m-4">
                <div className="flex h-full">
                    <Sidebar />
                    {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
                </div>
            </div>
        </div>
    )
}

export default HomePage