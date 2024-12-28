
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Login"
import ListAdmin from "./pages/SuperAmin/ListAdmin"
import ListUser from "./pages/SuperAmin/ListUser"
import HomePage from "./pages/Home"
import SuperAdminRoute from './route/PrivatSuperAdmin'
import Adminroute from './route/PrivatAdmin'
import Dashboard from "./pages/Dashboard"
import Category from "./pages/Category"
import Complaint from "./pages/complaints/Complaint";
import DetailComplaint from "./pages/complaints/Complaint-Detail"
// import News from "./pages/news/news"
import NewsPage from "./pages/news"
import CreateNews from './pages/news/CreateNews'
import EditNews from './pages/news/EditNews'
import DetailNews from "./pages/Berita/detailNews";
import ChatListPage from "./pages/chat/ChatList"
import ChatDetailPage from "./pages/chat/chatDetail"
import NotFound from './pages/404-NotFound';
import Schedule from "./pages/schedules/schedules"

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />

        {/* Privat route Admin */}
        <Route element={<Adminroute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/category" element={<Category />} /> 
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/complaint-detail/:id" element={<DetailComplaint />} />
          <Route path="/news-create" element={<CreateNews />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news-detail/:id/edit" element={<EditNews />} />
          <Route path="/news-detail/:id" element={<DetailNews />} />
          <Route path="/chat-user" element={<ChatListPage />} />
          <Route path="/schedules" element={<Schedule />} />
          <Route path="/chat-user/:id" element={<ChatDetailPage />} />
        </Route>

        {/* Privat route Super Admin */}
        <Route element={<SuperAdminRoute />}>
          <Route path="/super-admin/admin" element={<ListAdmin />} />
          <Route path="/super-admin/user" element={<ListUser />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
