'use client';
import { useState, useEffect, useRef } from "react";
import ChatInterface from "@/components/ChatInterface";
import { usePathname } from 'next/navigation'

export default function EducationBot() {
    interface ChatLogItem {
        type: 'bot' | 'user';
        message: any;
    }
    const currentPage = usePathname();
    
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
            sessionStorage.removeItem('botMessage_edu');

            // const isDataRemoved = sessionStorage.getItem('botMessage_edu') === null;
            // console.log('Is session storage data removed:', isDataRemoved);
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
        // console.log(contextText);

        const prevBotMessage = sessionStorage.getItem('botMessage_edu');

        const systemContent = `You are a friendly chatbot. You must refer to CONTEXT to answer question. 
        You respond in a concise, technically credible tone. If you're uncertain and the answer isn't explicitly stated
        in the provided CONTEXT, respond with: "Sorry, I'm not sure how to help with that."
        You use the language of the question given to respond.
        You automatically make currency exchange based on the language asked, if not provided specific currency.`;

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
                sessionStorage.setItem('botMessage_edu', responseData.message);
                // Assuming responseData is an object with the bot's message
                setChatLog(prevChatLog => [...prevChatLog, { type: 'bot', message: responseData.message }]);
            } else {
                // If the response is not JSON, treat it as plain text
                const responseText = await response.text();
                sessionStorage.setItem('botMessage_edu', responseText);

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
        <ChatInterface
            clearChat={clearChat}
            chatLog={chatLog}
            isLoading={isLoading}
            inputQuestion={inputQuestion}
            setInputQuestion={setInputQuestion}
            handleSubmit={handleSubmit}
            chatEnd={chatEnd}
            currentPage={currentPage}
        />

    );
};


