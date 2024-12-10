import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNewsComments = createAsyncThunk(
  'newsComments/fetchNewsComments',
  async (newsId, { getState }) => {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`http://localhost:8000/api/v1/news/${newsId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  }
);

// Thunk untuk menghapus semua komentar terkait berita
export const deleteAllComments = createAsyncThunk(
  'newsComments/deleteAllComments',
  async (newsId, { getState }) => {
    const token = sessionStorage.getItem('token');
    await axios.delete(`http://localhost:8000/api/v1/news/${newsId}/comments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return newsId;
  }
);

// Thunk untuk menghapus komentar
export const deleteComment = createAsyncThunk(
  'newsComments/deleteComment',
  async ({ newsId, commentId }, { getState }) => {
    const token = sessionStorage.getItem('token');
    await axios.delete(`http://localhost:8000/api/v1/news/${newsId}/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return commentId;
  }
);

// Thunk untuk menambahkan komentar baru
export const addComment = createAsyncThunk(
  'newsComments/addComment',
  async ({ newsId, text }, { getState }) => {
    const token = sessionStorage.getItem('token');
    const response = await axios.post(`http://localhost:8000/api/v1/news/${newsId}/comments`, 
      { comment: text },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.data; // Mengembalikan data komentar yang baru ditambahkan
  }
);

const newsCommentSlice = createSlice({
  name: 'newsComments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchNewsComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteAllComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(comment => comment.newsId !== action.payload);
      })
      .addCase(deleteAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(comment => comment.id !== action.payload);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload); // Menambahkan komentar baru ke state
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsCommentSlice.reducer;
