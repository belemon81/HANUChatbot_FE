import React from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingDots from "@/components/LoadingDots";

const ChatInterface = ({ clearChat, chatLog, isLoading, inputQuestion, setInputQuestion, handleSubmit, chatEnd, currentPage }) => {
    return (
        <div className="h-screen flex">
            {/* Sidebar */}
            <div className="bg-gray-900 w-1/5 flex flex-col justify-center items-center">
                <Image src="/logo.png" width={100} height={100} alt={"logo"}></Image>
                <h1 className="text-white py-4 text-2xl font-semibold mb-6">HanuGPT</h1>
                <div className="p-4">
                    <Link href="/education">
                        <div className={`rounded-lg p-4 text-white cursor-pointer transition duration-300 hover:bg-gray-800 font-semibold mb-4 ${currentPage === "/education" ? "bg-gray-500" : "bg-slate-600"}`}>Educational Program</div>
                    </Link>
                    <Link href="/services">
                        <div className={`rounded-lg p-4 text-white cursor-pointer transition duration-300 hover:bg-gray-800 font-semibold ${currentPage === "/services" ? "bg-gray-500" : "bg-slate-600"}`}>Public Administration</div>
                    </Link>
                    <div className="mt-4">
                        <button onClick={clearChat} className="bg-slate-600 hover:bg-slate-800 text-white px-4 py-2 rounded-full w-full flex items-center justify-center focus:outline-none">
                            <Image src="/trash.png" width={15} height={15} alt="trash" />
                            <span className="ml-2">Clear Conversation</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Chat Interface */}
            <div className="flex flex-col flex-grow bg-slate-200">
                <div className="flex-grow p-6 overflow-auto">
                    <div className="flex flex-col space-y-4">
                        {chatLog.map((message: any, index: any) => (
                            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {message.type === 'user' && (
                                    <div className="flex items-center">
                                        <div className={`${message.type === 'user' ? 'bg-red-400' : 'bg-gray-600'} rounded-lg p-4 text-white max-w-xl mr-2`} style={{ wordWrap: 'break-word' }}>
                                            {message.message}
                                        </div>
                                        <Image src="/avatar.jpg" width={50} height={50} alt={"avatar"} className="w-8 h-8 rounded-full" />
                                    </div>
                                )}
                                {message.type === 'bot' && (
                                    <div className="flex items-center">
                                        <Image src="/logo.png" width={50} height={50} alt={"logo"} className="w-8 h-8 rounded-full mr-2" />
                                        <div className={`${message.type === 'user' ? 'bg-red-400' : 'bg-gray-600'} rounded-lg p-4 text-white max-w-xl`} style={{ wordWrap: 'break-word', whiteSpace: 'pre-line' }}>
                                            {message.message}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))
                        }
                        {isLoading && (
                            <div className="flex justify-start">
                                <Image src="/logo.png" width={50} height={50} alt={"logo"} className="w-8 h-8 rounded-full mr-2" />
                                <div className="bg-gray-600 rounded-lg p-4 text-white max-w-sm">
                                    <LoadingDots />
                                </div>
                            </div>
                        )}
                        <div ref={chatEnd} />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex-none p-6">
                    <div className="flex rounded-lg border border-gray-700 bg-gray-800">
                        <input
                            type="text"
                            className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none"
                            placeholder="Type your message..."
                            value={inputQuestion}
                            onChange={(e) => setInputQuestion(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-red-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-red-600 transition-colors duration-300"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChatInterface;
