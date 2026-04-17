import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './layouts/AppShell';
import HomePage from './pages/HomePage';
import TrackPage from './pages/TrackPage';
import TopicPage from './pages/TopicPage';
import SavedQuestionsPage from './pages/SavedQuestionsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Admin panel — completely separate layout, handles its own auth */}
      <Route path="/admin" element={<AdminPage />} />

      {/* Main app shell */}
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/track/:trackId" element={<TrackPage />} />
          <Route path="/track/:trackId/topic/:topicId" element={<TopicPage />} />
          <Route path="/saved" element={<SavedQuestionsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
