import { useDispatch, useSelector } from 'react-redux';
import Comment from './comment';
import { deleteComment } from '../../services/newsCommentSlice';

const CommentList = ({ newsId }) => {
  // Mengambil data komentar dan status loading dari Redux store
  const { comments, loading } = useSelector((state) => state.newsComments);
  const dispatch = useDispatch();

  const handleDelete = (commentId) => {
    dispatch(deleteComment({ newsId, commentId }));
  };

  return (
    <div className="bg-white rounded-t-2xl rounded max-h-[500px] overflow-y-auto">
      {loading ? (
        <div className="flex justify-center items-center py-4">
          <span>Loading...</span>
        </div>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <Comment
            key={comment.id}
            commentId={comment.id}
            username={comment.admin ? comment.admin.name : comment.user.name}
            time={comment.update_at}
            text={comment.comment}
            profilePhoto={comment.admin ? comment.admin.profile_photo : comment.user.profile_photo}
            alignRight={comment.admin ? true : false}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <div className="flex justify-center items-center py-4">
          <span>Belum ada komentar yang masuk</span>
        </div>
      )}
    </div>
  );
};

export default CommentList;
