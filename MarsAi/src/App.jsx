import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import AdminRoute from './routes/AdminRoutes';
import Header from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import FormDirector from './pages/FormDirector';
import Auth from './pages/Auth';
import DashbordAdmin from './pages/DashbordAdminPage/DashbordAdmin';
import AdminJury from './pages/DashbordAdminPage/AdminJury';
import AdminConfig from './pages/DashbordAdminPage/AdminConfig';
import AdminEvents from './pages/DashbordAdminPage/AdminEvents';
import AdminMovies from './pages/DashbordAdminPage/AdminMovies';
import AdminMoviesResult from './pages/DashbordAdminPage/AdminMoviesResult';
import SubmitMovie from './pages/SubmitMovie';
import DashboardJury from './pages/DashboardJuryPage/DashboardJury';
import JuryRoutes from './routes/JuryRoutes';
import { AuthProvider } from './context/AuthProvider';
import MoviePage from './pages/MovieDetail';
import JuryRating from './pages/DashboardJuryPage/JuryRating';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Toast container global pour toute l'application */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Header uniquement si pas admin */}
      {!isAdminRoute && <Header />}

      <main>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/gallery" element={<Movies />} />
          <Route path="/form-director" element={<FormDirector />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/submit-movie" element={<SubmitMovie />} />
          <Route path="/movie-detail/:id" element={<MoviePage />} />

          {/* Jury */}
          <Route
            path="/dashboard/jury/:id"
            element={
              <JuryRoutes>
                <DashboardJury />
              </JuryRoutes>
            }
          />
          <Route
            path="/dashboard/jury/movies/:id"
            element={
              <JuryRoutes>
                <JuryRating />
              </JuryRoutes>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <DashbordAdmin />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/jury"
            element={
              <AdminRoute>
                <AdminJury />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/config"
            element={
              <AdminRoute>
                <AdminConfig />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <AdminEvents />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/films"
            element={
              <AdminRoute>
                <AdminMovies />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/results"
            element={
              <AdminRoute>
                <AdminMoviesResult />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;