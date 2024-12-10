import React, { useState } from 'react';
import CommentList from '../../components/Berita/commentList';
import CommentInput from '../../components/Berita/commentInput';

const Comment = ({ newsId }) => {

    return (
        <div className="lg:w-6/12">
            <CommentList newsId={newsId} />
            <CommentInput newsId={newsId} />
        </div>
    );
};

export default Comment;
