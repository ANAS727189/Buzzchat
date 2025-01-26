import { MessageSquare, Sparkles } from "lucide-react";

const NoChatSelected = () => {
    return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
            <div className="max-w-md text-center space-y-6">
                {/* Icon Display */}
                <div className="flex justify-center mb-4">
                    <div className="relative group">
                        <div className="size-24 rounded-full bg-yellow-500/20 flex items-center justify-center 
                            animate-bounce group-hover:animate-pulse transition-all duration-300">
                            <img 
                                src="/bee-new-logo.gif" 
                                alt="BuzzChat Logo" 
                                className="size-16 object-contain group-hover:scale-110 transition-transform"
                            />
                        </div>
                        <div className="absolute -top-2 -right-2 animate-ping">
                            <Sparkles className="text-yellow-500 size-6 animate-spin" />
                        </div>
                    </div>
                </div>

                {/* Welcome Text */}
                <h2 className="text-4xl font-bold">
                    Welcome to{' '}
                    <span className="inline-block">
                        <span className="animate-pulse text-yellow-600">B</span>
                        <span className="hover:animate-wiggle inline-block">uzz</span>
                        <span className="animate-pulse text-yellow-600">C</span>
                        <span className="hover:animate-spin inline-block">hat</span>!
                    </span>
                </h2>
                <p className="text-base-content/60 flex items-center justify-center">
                    {/* <Sparkles className="mr-2 text-yellow-500 animate-bounce" /> */}
                    Select a buzzy chat from the list to start chatting with your friends & family.
                    {/* <Sparkles className="ml-2 text-yellow-500 animate-bounce" /> */}
                </p>
            </div>
        </div>
    );
};

export default NoChatSelected;