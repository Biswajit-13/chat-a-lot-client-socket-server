import React, { useState, useEffect, useRef } from 'react';
import Layout from './layout';
import ChatWindow from './chatWindow';
import ChatList from './chatList';
import { useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import ChatModal from './chatModal';

const Chat = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, SetSelectedUser] = useState([]);
    const [logedUser, setLogedUser] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const navigate = useNavigate();
    const [receivedMessage, setReceivedMessage] = useState(null);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);

    // Function to open the ChatModal
    const openChatModal = () => {
        setIsChatModalOpen(true);
    };

    // Function to close the ChatModal
    const closeChatModal = () => {
        setIsChatModalOpen(false);
    };

    const callUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/users", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();

            setUsers(data);
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    };

    const callAbout = async () => {
        try {
            const res = await fetch("http://localhost:5000/about", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
            const data = await res.json();
            setLogedUser(data);
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        } catch (err) {
            console.log(err);
            navigate("/login");
        }
    };

    useEffect(() => {
        callUsers();
        callAbout();
    }, []);

    return (
        <Layout>
            <div className='grid p-2 bg-gray-50 grid-cols-1 md:grid-cols-4'>
                <div className='md:col-span-1 hidden md:block'>
                    <ChatList
                        users={users}
                        selectedUser={SetSelectedUser}
                        logedUser={logedUser}
                        cId={setChatId}
                        recMessage={setReceivedMessage}
                    />
                </div>
                <div className='md:col-span-3'>
                    <ChatWindow
                        chatId={chatId}
                        receiver={selectedUser}
                        sender={logedUser}
                        className='w-full md:w-4/5 mx-auto' // Adjust the width as needed
                        recMessage={receivedMessage}
                    />
                </div>

                {/* Button to open ChatModal for smaller screens */}
                <div className='md:hidden'>
                    <button onClick={isChatModalOpen ? closeChatModal : openChatModal} className="dashboard-button">
                        Users
                    </button>
                </div>

                {/* Render ChatModal conditionally */}
                {isChatModalOpen && (
                    <ChatModal
                        isOpen={isChatModalOpen}
                        onRequestClose={closeChatModal}
                        users={users}
                        SetSelectedUser={SetSelectedUser}
                        logedUser={logedUser}
                        cId={setChatId}
                        recMessage={setReceivedMessage}
                    />
                )}
            </div>
        </Layout>
    );
};

export default Chat;
