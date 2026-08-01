import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../services/authService';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { jwtDecode } from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Auth() {
  const { t } = useTranslation();

  const [isLogin, setIsLogin] = useState(true);
  const { loginUser } = useContext(AuthContext);
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstname: '',
    lastname: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const payloadData = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = isLogin
        ? await login(payloadData)
        : await register(payloadData);

      // 🔹 Si l'utilisateur doit changer son mot de passe
      if (res.mustChangePassword) {
        navigate('/change-password', { state: { userId: res.userId } });
        return;
      }

      // 🔹 Si on a reçu un token
      if (res.token) {
        const payload = jwtDecode(res.token);
        const userId = payload.id;
        const roles = Array.isArray(payload.roles) ? payload.roles : [];

        // 🔹 Stockage du token + ID dans le contexte
        loginUser(res.token, userId);
        
        localStorage.setItem('userEmail', form.email);
        
        // 🔹 Navigation selon le rôle
        if (roles.includes('Admin')) {
          navigate('/admin');
        } else if (roles.includes('Jury')) {
          navigate(`/dashboard/jury/${userId}`); // <-- ici on met l'ID dans l'URL
        } else {
          navigate('/');
        }

        setSuccess(t('auth.successLogin'));
        return;
      }

      if (!isLogin) {
        setSuccess(t('auth.successRegister'));
        setIsLogin(true);
      }
    } catch (err) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  };
  window.scrollTo(0, 0);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6 py-12">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl border border-slate-200">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-widest text-[#1e293b]">
          {isLogin ? t('auth.loginTitle') : t('auth.registerTitle')}
        </h2>

        {success && (
          <div className="mb-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-emerald-100 px-5 py-3 text-emerald-800 text-sm shadow-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-slate-700">
              {t('auth.email')}
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              autoComplete="email"
              onChange={handleChange}
              className="w-full p-3 border border-slate-200 rounded-xl bg-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-[#0f766e] transition"
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-slate-700">
              {t('auth.password')}
            </label>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 pr-12 border border-slate-200 rounded-xl bg-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-[#0f766e] transition"
                required
                autoComplete={isLogin ? 'current-password' : 'new-password'}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0f766e] transition"
                aria-label={
                  showPassword ? t('auth.hidePassword') : t('auth.showPassword')
                }
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-slate-700">
                  {t('auth.firstname')}
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={form.firstname}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-[#0f766e] transition"
                  required
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2 uppercase tracking-wider text-slate-700">
                  {t('auth.lastname')}
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={form.lastname}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 rounded-xl bg-[#f1f5f9] focus:outline-none focus:ring-2 focus:ring-[#0f766e] focus:border-[#0f766e] transition"
                  required
                />
              </div>
            </>
          )}

          {error && (
            <p className="text-red-600 mb-4 text-sm font-medium">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#1e293b] hover:bg-[#1e293bc8] text-white py-3 rounded-xl font-semibold tracking-wide shadow-md hover:shadow-lg transition duration-200"
            disabled={loading}
          >
            {loading
              ? t('auth.loading')
              : isLogin
                ? t('auth.loginButton')
                : t('auth.registerButton')}
          </button>
        </form>

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="mt-6 block text-center text-[#1e293b] font-medium hover:underline transition"
        >
          {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
        </button>
      </div>
    </div>
  );
}
