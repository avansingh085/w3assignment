import React from 'react';
import { getSocket } from '../socket/socket';

const UserCard = ({ user, isCurrentUser = false }) => {
  
    const addRandomPoint = () => {
       
        const socket = getSocket();
        socket.emit('add-random-point', { userId: user._id });
    };

    const getAvatarColor = (username) => {
        const colors = [
            'bg-blue-500', 'bg-green-500', 'bg-purple-500', 
            'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
            'bg-amber-500', 'bg-rose-500'
        ];
        const charCode = username.charCodeAt(0) || 0;
        return colors[charCode % colors.length];
    };

    const getScoreColor = (score) => {
        if (score >= 100) return 'bg-purple-100 text-purple-800';
        if (score >= 50) return 'bg-blue-100 text-blue-800';
        if (score >= 20) return 'bg-green-100 text-green-800';
        return 'bg-gray-100 text-gray-800';
    };

    return (
        <button
            onClick={addRandomPoint}
           
            className={`w-full text-left bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border-2 ${
                isCurrentUser 
                    ? 'border-blue-500 hover:border-blue-600' 
                    : 'border-gray-200 hover:border-blue-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent relative overflow-hidden`}
            aria-label={`Add random point to ${user.username}`}
        >
            

          

            <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center space-x-3">
                    <div className={`${getAvatarColor(user.username)} text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold`}>
                        {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left">
                        <div className="font-medium text-gray-800 truncate max-w-[120px]">
                            {user.username}
                        </div>
                        {isCurrentUser && (
                            <div className="text-xs text-blue-600">(You)</div>
                        )}
                    </div>
                </div>
                <div className={`${getScoreColor(user.score)} px-3 py-1 rounded-full text-sm font-semibold min-w-[80px] text-center`}>
                    <span className="font-mono">{user.score}</span>
                    {user.score > 0 && (
                        <span className="ml-1 text-xs">pts</span>
                    )}
                </div>
            </div>
        </button>
    );
};


export default UserCard;