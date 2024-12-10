import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNews, getNewsDetail, deleteNews } from "./newsService"; // Update the import

// Thunk untuk fetch semua berita
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const data = await getNews();
  return data;
});

// Thunk ini buat fetch detail berita berdasarkan ID
export const fetchNewsDetail = createAsyncThunk(
  "news/fetchNewsDetail",
  async (newsId) => {
    const data = await getNewsDetail(newsId);
    return data;
  }
);

// Thunk untuk menghapus berita berdasarkan ID
export const removeNews = createAsyncThunk(
  "news/removeNews",
  async (newsId, { dispatch }) => {
    await deleteNews(newsId);
    dispatch(fetchNews()); // Refresh the news list after deletion
    return newsId;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    detailNews: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchNewsDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNewsDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.detailNews = action.payload;
      })
      .addCase(fetchNewsDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeNews.fulfilled, (state, action) => {
        state.loading = false;
        state.news = state.news.filter(news => news.id !== action.payload);
      })
      .addCase(removeNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
