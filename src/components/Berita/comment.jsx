import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Comment = ({ commentId, username, time, text, profilePhoto, alignRight, onDelete }) => {

    const handleDeleteClick = () => {
        Swal.fire({
          title: 'Apakah Anda yakin?',
          text: "Anda tidak dapat mengembalikan ini!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus!',
          cancelButtonText: 'Batal'
        }).then((result) => {
          if (result.isConfirmed) {
            onDelete(commentId);
            Swal.fire(
              'Dihapus!',
              'Komentar telah dihapus.',
              'success'
            );
          }
        });
      };

    return (
         <div className={`flex items-start p-4 border-b font-montserrat ${alignRight ? 'justify-end' : 'justify-start'}`}>
            {alignRight ? (
                <>
                    <div className="flex-grow">
                        <div className="flex justify-between items-center">
                            <button onClick={handleDeleteClick} className="text-red-500">
                                <FaTrash className="inline" /> Hapus
                            </button>
                            <div>
                                
                                <span className="text-gray-500 text-sm">{time}</span>
                                <span className="font-bold ml-2">{username}</span>
                            </div>
                        </div>
                        <p className='text-right'>{text}</p>
                    </div>
                    <img
                        src={`http://localhost:8000/${profilePhoto}`}
                        alt="User avatar"
                        className="rounded-full ml-4"
                        style={{ width: '40px', height: '40px' }}
                    />
                </>
            ) : (
                <>
                    <img
                        src={`http://localhost:8000/${profilePhoto}`}
                        alt="User avatar"
                        className="rounded-full mr-4"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <div className="flex-grow">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="font-bold">{username}</span>
                                <span className="text-gray-500 text-sm ml-2">{time}</span>
                            </div>
                            <button onClick={handleDeleteClick} className="text-red-500">
                                <FaTrash className="inline" /> Hapus
                            </button>
                        </div>
                        <p>{text}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default Comment;
