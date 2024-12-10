import React, { useState } from 'react';
import { RiSendPlaneLine } from "react-icons/ri";
import { addComment } from '../../services/newsCommentSlice';
import { useDispatch } from 'react-redux';

const CommentInput = ({ newsId }) => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addComment({ newsId, text }));
            setText('');
        }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className="flex items-center py-6 px-7 border-t bg-white w-full"
      >
        <img
          src="http://localhost:8000/profile-photos/admin-default.jpg"
          alt="User avatar"
          className="rounded-full mr-4"
          style={{ width: "40px", height: "40px" }}
        />
        <input
          type="text"
          className="flex-grow rounded px-4 py-2 text-gray-600 font-montserrat border-none"
          placeholder="Tambahkan komentar..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="w-px h-9 mx-3 border border-slate-300" />
        <button type="submit" className="text-2xl">
          <RiSendPlaneLine className="hidden md:flex" />
        </button>
      </form>
    );
};

export default CommentInput;
