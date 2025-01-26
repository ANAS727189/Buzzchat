import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const TypingIndicator = () => {
    return (
        <span className="flex items-center ml-2 text-primary-500">
            <span className="animate-typing mr-0.5 inline-block h-1.5 w-1.5 bg-primary-500 rounded-full opacity-75"></span>
            <span className="animate-typing animation-delay-100 mr-0.5 inline-block h-1.5 w-1.5 bg-primary-500 rounded-full opacity-75"></span>
            <span className="animate-typing animation-delay-200 inline-block h-1.5 w-1.5 bg-primary-500 rounded-full opacity-75"></span>
            <span className="ml-1.5 text-xs">Typing</span>
        </span>
    );
};

const ChatHeader = () => {
    const { selectedUser, setSelectedUser, isUserTyping } = useChatStore();
    const { onlineUsers } = useAuthStore();

    return (
        <div className="p-2.5 border-b border-base-300">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="avatar">
                        <div className="size-10 rounded-full relative">
                            <img 
                                src={selectedUser.profilePic || "/avatar.png"} 
                                alt={selectedUser.fullName} 
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>
                    </div>

                    {/* User info */}
                    <div>
                        <h3 className="font-medium">{selectedUser.fullName}</h3>
                        <p className="flex flex-row items-center text-sm text-base-content/70">
                            {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
                            {isUserTyping && <TypingIndicator />}
                        </p>
                    </div>
                </div>

                {/* Close button */}
                <button 
                    onClick={() => setSelectedUser(null)} 
                    className="hover:bg-base-200 rounded-full p-1.5 transition-colors"
                >
                    <X className="size-5" />
                </button>
            </div>
        </div>
    );
};

export default ChatHeader;