import React from 'react';
import Modal from 'react-modal';
import ChatList from './chatList';

const ChatModal = ({ isOpen, onRequestClose, users, SetSelectedUser,logedUser, cId, recMessage }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel='Chat Modal'
            className='modal-content'
            overlayClassName='modal-overlay'
            
        >
            <div className='grid grid-cols-1'>
                <div className='col-span-1'>
                    <ChatList
                        users={users}
                        selectedUser={SetSelectedUser}
logedUser={logedUser}
cId={cId}
recMessage={recMessage}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default ChatModal;
