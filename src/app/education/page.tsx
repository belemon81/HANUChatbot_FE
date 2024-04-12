'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingDots from "@/components/LoadingDots";

export default function publicAdminBot() {
    interface ChatLogItem {
        type: 'bot' | 'user';
        message: any;
    }

    const [inputQuestion, setInputQuestion] = useState('');
    const [chatLog, setChatLog] = useState<ChatLogItem[]>([
        { type: 'bot', message: 'Ask me anything about Hanoi University educational program' }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const chatEnd = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEnd.current) {
            chatEnd.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatLog]);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!inputQuestion.trim()) {
            return;
        }
        setChatLog(prevChatLog => [...prevChatLog, { type: 'user', message: inputQuestion }]);
        fetchDocuments(inputQuestion);
        setInputQuestion('');
    }


    const clearChat = () => {
        if (chatLog.length > 1) {
            setChatLog([{ type: 'bot', message: 'Ask me anything about Hanoi University educational program' }]);
            sessionStorage.removeItem('botMessage');
        }
    };

    async function fetchDocuments(question: string) {
        const url = 'http://localhost:2305/hanu-chatbot/educational-program';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch documents');
            }
            const docsData = await response.json();
            console.log('Documents:', docsData);
            sendMessage(question, docsData);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    }

    const sendMessage = async (question: string, docsData: any) => {
        const url = '/api/chat';
        let contextText = "";

        if (docsData && docsData.relevant_docs && docsData.relevant_docs.length > 0) {
            for (let i = 0; i < docsData.relevant_docs.length; i++) {
                const document = docsData.relevant_docs[i];
                contextText += `${document}\n`; // Assuming each document is a string
            }
        }
        console.log("testing ", contextText);

        const prevBotMessage = sessionStorage.getItem('botMessage');

        const systemContent = `You are a friendly chatbot. You must refer to CONTEXT to answer question. 
        You respond in a concise, technically credible tone. If you're uncertain and the answer isn't explicitly stated
        in the provided CONTEXT, respond with: "Sorry, I'm not sure how to help with that."
        You use the language of the question given to respond.
        You automatically make currency exchange based on the language asked, if not provided specific currency.`;

        const userContent = `CONTEXT:
        ChatGPT is an AI conversational model developed by OpenAI. It's designed to generate human-like text based on the input it's given.
        SOURCE: https://openai.com/blog/chatgpt

        QUESTION: 
        what is chatgpt ?
        `;

        const assistantContent = `ChatGPT is an AI conversational model developed by OpenAI. It's designed to generate human-like text based on the input it's given.

        SOURCES:
        https://openai.com/blog/chatgpt`;

        const userMessage = `CONTEXT:
        ${contextText}
        
        PREVIOUS RESPONSE:
        ${prevBotMessage}

        USER QUESTION: 
        ${question}  
        `;

        let data;

        if (docsData && docsData.relevant_docs && docsData.relevant_docs.length > 0) {
            data = {
                messages: [
                    {
                        role: "system",
                        content: systemContent
                    },
                    {
                        role: "user",
                        content: userContent
                    },
                    {
                        role: "assistant",
                        content: assistantContent
                    },
                    {
                        role: "user",
                        content: userMessage
                    }
                ],
                relevant_docs: docsData,
                prev_bot_message: prevBotMessage
            };
        } else {
            const systemContent = `You are a friendly chatbot. You respond in a concise, technically credible tone.
            You use the language of the question given to respond.
            You automatically make currency exchange based on the language asked, if not provided specific currency.`;
            data = {
                messages: [
                    {
                        role: "system",
                        content: systemContent
                    },
                    {
                        role: "user",
                        content: userContent
                    },
                    {
                        role: "assistant",
                        content: assistantContent
                    },
                    {
                        role: "user",
                        content: userMessage
                    },
                ]
            };
        }

        setIsLoading(true);

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Check the content type of the response
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // If the response is JSON, parse it as JSON
                const responseData = await response.json();
                sessionStorage.setItem('botMessage', responseData.message);
                // Assuming responseData is an object with the bot's message
                setChatLog(prevChatLog => [...prevChatLog, { type: 'bot', message: responseData.message }]);
            } else {
                // If the response is not JSON, treat it as plain text
                const responseText = await response.text();
                sessionStorage.setItem('botMessage', responseText);

                // Assuming responseText contains the bot's message
                setChatLog(prevChatLog => [...prevChatLog, { type: 'bot', message: responseText }]);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };





    return (
        <div className="h-screen flex">
            {/* Sidebar */}
            <div className="bg-gray-900 w-1/5 flex flex-col justify-center items-center">
                <Image src="/logo.png" width={100} height={100} alt={"logo"}></Image>
                <h1 className="text-white py-4 text-2xl font-semibold mb-6">HanuGPT</h1>
                <div className="p-4">
                    <div className="bg-gray-500 rounded-lg p-4 text-white mb-4 cursor-pointer transition duration-300">
                        <p className="font-semibold">Educational Program</p>
                    </div>
                    <Link href="/publicAd">
                        <div className="bg-gray-700 rounded-lg p-4 text-white cursor-pointer transition duration-300 hover:bg-gray-800 font-semibold">Public Administration</div>
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
                        {
                            chatLog.map((message, index) => (
                                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {message.type === 'user' && (
                                        <div className="flex items-center">
                                            <div className={`${message.type === 'user' ? 'bg-red-400' : 'bg-gray-600'} rounded-lg p-4 text-white max-w-xl`} style={{ wordWrap: 'break-word' }}>
                                                {message.message}
                                            </div>
                                            <div className="w-3 h-3 bg-orange-500 rounded-full ml-2" />
                                        </div>
                                    )}
                                    {message.type === 'bot' && (
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                                            <div className={`${(message as ChatLogItem).type === 'user' ? 'bg-red-400' : 'bg-gray-600'} rounded-lg p-4 text-white max-w-xl`} style={{ wordWrap: 'break-word' }}>
                                                {message.message}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                        {
                            isLoading &&
                            <div key={chatLog.length} className="flex justify-start">
                                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                                    <LoadingDots />
                                </div>
                            </div>
                        }
                        <div ref={chatEnd} />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="flex-none p-6">
                    <div className="flex rounded-lg border border-gray-700 bg-gray-800">
                        <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" placeholder="Type your message..." value={inputQuestion} onChange={(e) => setInputQuestion(e.target.value)} />
                        <button type="submit" className="bg-red-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-red-600 transition-colors duration-300">Send</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

