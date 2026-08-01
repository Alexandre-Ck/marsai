import { Link } from 'react-router-dom';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ButtonLogOut from '../ui/Buttons';
import ProfileConnect from '../ui/ProfileConnect';
import LanguageSwitcher from '../ui/LanguageSwitcher';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Header({ isSidebarOpen, setIsSidebarOpen }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <nav className=" px-6 py-6 flex items-center justify-between">
        {/* Chevron Sidebar (admin) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden text-slate-700 mr-4"
          aria-label="Sidebar"
        >
          {isSidebarOpen ? (
            <ChevronLeft size={26} />
          ) : (
            <ChevronRight size={26} />
          )}
        </button>

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-[#0f172a]"
        >
          MARS.AI
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10 font-semibold text-slate-700">
          <li>
            <Link to="/gallery">{t('nav.gallery')}</Link>
          </li>
          <li>
            <Link to="/">{t('nav.program')}</Link>
          </li>
          <li>
            <Link
              to="/form-director"
              className="bg-[#0f172a] text-white rounded-4xl py-2 px-6 hover:bg-[#1e293b] transition-all duration-300"
            >
              {t('nav.submit')}
            </Link>
          </li>
        </ul>

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center gap-6">
          <LanguageSwitcher />
          <ButtonLogOut />
          <ProfileConnect />
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden ml-4 text-2xl"
          onClick={() => setIsNavOpen(prev => !prev)}
        >
          {isNavOpen ? (
            <RxCross2 />
          ) : (
            <RxHamburgerMenu aria-label="Menu burger" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {isNavOpen && (
        <div className="md:hidden px-8 pb-6 flex flex-col gap-6 font-semibold text-slate-700">
          <Link to="/gallery" onClick={() => setIsNavOpen(false)}>
            {t('nav.gallery')}
          </Link>
          <Link to="/" onClick={() => setIsNavOpen(false)}>
            {t('nav.program')}
          </Link>
          <Link
            to="/form-director"
            onClick={() => setIsNavOpen(false)}
            className="bg-[#0f172a] text-white rounded-xl py-2 px-6 text-center"
          >
            {t('nav.submit')}
          </Link>

          <div className="flex items-center gap-6 pt-4">
            <LanguageSwitcher />
            <ButtonLogOut />
            <ProfileConnect />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
