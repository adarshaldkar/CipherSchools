import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import AssignmentListPage from './pages/AssignmentListPage';
import AssignmentAttemptPage from './pages/AssignmentAttemptPage';
import AuthPage from './pages/AuthPage';
import Loading from './components/Loading';
import './styles/main.scss';

function AppRoutes() {
  const { loading } = useAuth();

  if (loading) return <Loading text="Loading…" />;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AssignmentListPage />} />
        <Route path="/assignment/:id" element={<AssignmentAttemptPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
