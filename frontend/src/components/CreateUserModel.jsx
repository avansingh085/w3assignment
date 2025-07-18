import React, { useState, useRef } from 'react';
import { getSocket } from '../socket/socket';

const CreateUserModel = ({ onClose }) => {
    const usernameInput = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateUser = () => {
        const username = usernameInput.current.value.trim();
        const Socket = getSocket();
        if (!username) {
            setError("Username cannot be empty!");
            return;
        }

        if (!Socket) {
            setError("Socket not connected!");
            return;
        }


        setError("");
        setLoading(true)
        Socket.emit('create-new-user', { username });
        setTimeout(() => {
            //clear value
            
            usernameInput.current.value = ""
            setLoading(false);
        }, 1000)
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">Create New User</h2>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    ref={usernameInput}
                    className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                    placeholder="Enter username"
                    disabled={loading}
                />

                <div className="flex gap-3">
                    <button
                        onClick={handleCreateUser}
                        className={`flex-1 py-2 px-4 rounded-md text-white font-medium transition-colors ${loading ? 'bg-green-600 opacity-70' : 'bg-green-600 hover:bg-green-700'
                            }`}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating...
                            </span>
                        ) : 'Create'}
                    </button>

                    <button
                        onClick={onClose}
                        className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors disabled:opacity-50"
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateUserModel;