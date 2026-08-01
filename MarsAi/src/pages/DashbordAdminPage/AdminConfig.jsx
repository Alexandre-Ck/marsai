import { useState, useEffect } from 'react';
import Sidebar from '../../components/DashbordAdmin/Sidebar';
import Header from '../../components/layout/Navbar';
import { FaPalette, FaFont, FaMoon, FaCheck, FaSave, FaImage, FaBullhorn, FaCircleNotch } from 'react-icons/fa';

export default function AdminConfig() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // --- États existants (Thème, Font, DarkMode, Taille) ---
  const [selectedTheme, setSelectedTheme] = useState(() => localStorage.getItem('ui_theme') || 'slate');
  const [selectedFont, setSelectedFont] = useState(() => localStorage.getItem('ui_font') || 'sans');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('ui_darkmode') === 'true');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('ui_fontsize') || 'normal');

  // --- Nouveaux États : Branding & Identity ---
  const [slogan, setSlogan] = useState(() => localStorage.getItem('ui_slogan') || 'Appel à projets 2026');
  const [logoBase64, setLogoBase64] = useState(() => localStorage.getItem('ui_logo') || '');
  const [borderRadius, setBorderRadius] = useState(() => localStorage.getItem('ui_border_radius') || 'ultra');

  const themes = [
    { id: 'slate', name: 'Ardoise Pro', primary: '#1e293b', secondary: '#64748b' },
    { id: 'mars', name: 'Néo Mars (Rouge)', primary: '#FF5845', secondary: '#18181b' },
    { id: 'indigo', name: 'Indigo Tech', primary: '#4f46e5', secondary: '#818cf8' },
    { id: 'emerald', name: 'Émeraude Éco', primary: '#059669', secondary: '#34d399' },
  ];

  const fonts = [
    { id: 'sans', name: 'Inter / Sans-Serif (Moderne & Très Lisible)', class: 'font-sans' },
    { id: 'mono', name: 'JetBrains / Monospace (Technique & Structuré)', class: 'font-mono' },
    { id: 'serif', name: 'Merriweather / Serif (Classique & Éditorial)', class: 'font-serif' },
  ];

  const radiusOptions = [
    { id: 'none', name: 'Brutaliste (Angles droits)', value: '0px' },
    { id: 'standard', name: 'Standard (Arrondi discret)', value: '12px' },
    { id: 'ultra', name: 'Ultra-arrondi (Style initial)', value: '40px' },
  ];

  // Gestion de l'upload et conversion du logo en Base64
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    setLogoBase64('');
  };

  // Appliquer dynamiquement la configuration à l'ensemble du DOM
  const applyDesignConfiguration = (theme, font, dark, size, sloganText, logo, radius) => {
    const root = document.documentElement;
    const body = document.body;

    // 1. Application de la police
    body.classList.remove('font-sans', 'font-mono', 'font-serif');
    if (font === 'mono') body.classList.add('font-mono');
    else if (font === 'serif') body.classList.add('font-serif');
    else body.classList.add('font-sans');

    // 2. Application de la taille du texte
    if (size === 'small') root.style.fontSize = '90%';
    else if (size === 'large') root.style.fontSize = '115%';
    else root.style.fontSize = '100%';

    // 3. Application du mode sombre
    if (dark) {
      root.classList.add('dark');
      body.style.backgroundColor = '#121212';
      body.style.color = '#f4f4f5';
    } else {
      root.classList.remove('dark');
      body.style.backgroundColor = '#f8fafc';
      body.style.color = '#1e293b';
    }

    // 4. Application des variables de couleurs
    const currentThemeObj = themes.find(t => t.id === theme) || themes[0];
    root.style.setProperty('--marsai-primary', currentThemeObj.primary);

    // 5. Application des arrondis (Border Radius variable)
    const selectedRadiusObj = radiusOptions.find(r => r.id === radius) || radiusOptions[2];
    root.style.setProperty('--marsai-radius', selectedRadiusObj.value);

    // 6. Envoi des données de texte à la portée globale (les autres composants peuvent lire les variables CSS ou le localStorage)
    root.style.setProperty('--marsai-slogan', `"${sloganText}"`);
  };

  useEffect(() => {
    applyDesignConfiguration(selectedTheme, selectedFont, darkMode, fontSize, slogan, logoBase64, borderRadius);
  }, []);

  const handleSaveConfig = () => {
    localStorage.setItem('ui_theme', selectedTheme);
    localStorage.setItem('ui_font', selectedFont);
    localStorage.setItem('ui_darkmode', darkMode.toString());
    localStorage.setItem('ui_fontsize', fontSize);
    localStorage.setItem('ui_slogan', slogan);
    localStorage.setItem('ui_logo', logoBase64);
    localStorage.setItem('ui_border_radius', borderRadius);
    
    applyDesignConfiguration(selectedTheme, selectedFont, darkMode, fontSize, slogan, logoBase64, borderRadius);
    
    alert('Identité visuelle de MarsAi enregistrée et déployée avec succès ! 🚀');
  };

  const activeThemeColor = themes.find(t => t.id === selectedTheme)?.primary || '#1e293b';

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800 transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <Header isSidebarOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 p-6 sm:p-8 max-w-4xl w-full mx-auto space-y-8">
          
          <div>
            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter dark:text-white">
              Identité de Marque & Design
            </h2>
            <p className="text-sm text-slate-500 mt-1 dark:text-zinc-400">
              Pilotez l'identité graphique, les visuels de marque et le branding de cette édition du festival.
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-10 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            
            {/* SECTION A : BRANDING & VISUELS DE MARQUE */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2 dark:border-zinc-800">
                <FaImage className="text-slate-400 text-lg" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-zinc-100">
                  01. Visuels & Logo de l'édition
                </h3>
              </div>

              {/* Upload de Logo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800 dark:text-zinc-200">Logo personnalisé</label>
                  <p className="text-xs text-slate-400">Remplacez le logo standard "MarsAi" par celui de votre partenaire ou de l'édition en cours.</p>
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                  />
                </div>

                {/* Prévisualisation du Logo */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50 dark:bg-zinc-800/40 dark:border-zinc-700 min-h-[120px]">
                  {logoBase64 ? (
                    <div className="text-center space-y-3">
                      <img src={logoBase64} alt="Prévisualisation logo" className="max-h-16 max-w-full object-contain mx-auto" />
                      <button 
                        type="button" 
                        onClick={handleResetLogo}
                        className="text-xs font-bold text-red-500 hover:text-red-600 transition"
                      >
                        Supprimer et remettre par défaut
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 font-medium italic">Logo MarsAi standard (par défaut)</p>
                  )}
                </div>
              </div>

              {/* Texte d'annonce dynamique */}
              <div className="space-y-2 pt-4">
                <label htmlFor="slogan-input" className="block text-sm font-bold text-slate-800 dark:text-zinc-200 flex items-center gap-2">
                  <FaBullhorn className="text-slate-400" /> Slogan d'annonce d'accueil
                </label>
                <input 
                  id="slogan-input"
                  type="text" 
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                  placeholder="Ex: Appel à projets 2026"
                  className="w-full bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700 rounded-xl p-4 text-sm font-semibold outline-none focus:ring-2 focus:ring-slate-400 dark:text-white"
                />
              </div>
            </section>

            {/* SECTION B : THÈME & PALETTE */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2 dark:border-zinc-800">
                <FaPalette className="text-slate-400 text-lg" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-zinc-100">
                  02. Couleur thématique
                </h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-800/50
                      ${selectedTheme === theme.id 
                        ? 'border-slate-900 bg-slate-50/50 ring-1 ring-slate-900 dark:border-white dark:ring-white' 
                        : 'border-slate-200 hover:bg-slate-50/30 dark:border-zinc-700 dark:hover:bg-zinc-800'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <span className="w-5 h-5 rounded-full inline-block border border-black/10" style={{ backgroundColor: theme.primary }}></span>
                        <span className="w-5 h-5 rounded-full inline-block border border-black/10" style={{ backgroundColor: theme.secondary }}></span>
                      </div>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{theme.name}</span>
                    </div>
                    {selectedTheme === theme.id && <FaCheck className="text-slate-900 text-xs dark:text-white" />}
                  </button>
                ))}
              </div>
            </section>

            {/* SECTION C : TYPOGRAPHIE & ARRONDIS (LAYOUT) */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2 dark:border-zinc-800">
                <FaFont className="text-slate-400 text-lg" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-zinc-100">
                  03. Typographie & Arrondis (Structure)
                </h3>
              </div>

              {/* Sélection Polices */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-800 dark:text-zinc-200">Style d'écriture</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {fonts.map((font) => (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => setSelectedFont(font.id)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-800/50
                        ${selectedFont === font.id 
                          ? 'border-slate-900 bg-slate-50/50 font-bold dark:border-white' 
                          : 'border-slate-200 hover:bg-slate-50/30 dark:border-zinc-700 dark:hover:bg-zinc-800'
                        }`}
                    >
                      <span className={`text-xs text-slate-800 dark:text-zinc-200 ${font.class}`}>{font.name.split(' / ')[0]}</span>
                      {selectedFont === font.id && <FaCheck className="text-slate-900 text-xs dark:text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sélection Arrondis (Border Radius) */}
              <div className="space-y-2 pt-2">
                <label className="block text-sm font-bold text-slate-800 dark:text-zinc-200">Courbure des composants (Boutons, cartes)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {radiusOptions.map((radius) => (
                    <button
                      key={radius.id}
                      type="button"
                      onClick={() => setBorderRadius(radius.id)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-800/50
                        ${borderRadius === radius.id 
                          ? 'border-slate-900 bg-slate-50/50 font-bold dark:border-white' 
                          : 'border-slate-200 hover:bg-slate-50/30 dark:border-zinc-700 dark:hover:bg-zinc-800'
                        }`}
                    >
                      <span className="text-xs text-slate-800 dark:text-zinc-200">{radius.name}</span>
                      {borderRadius === radius.id && <FaCheck className="text-slate-900 text-xs dark:text-white" />}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION D : CONFORT VISUEL & ACCESSIBILITÉ */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-2 dark:border-zinc-800">
                <FaMoon className="text-slate-400 text-lg" />
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-900 dark:text-zinc-100">
                  04. Confort visuel & Accessibilité
                </h3>
              </div>

              <div className="space-y-4 pt-2">
                {/* Switch Mode Sombre */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl dark:bg-zinc-800/40">
                  <div>
                    <label htmlFor="dark-mode-toggle" className="font-bold text-sm text-slate-900 block dark:text-zinc-200">Mode Sombre</label>
                    <span className="text-xs text-slate-400 dark:text-zinc-500">Bascule l'interface complète en mode nuit.</span>
                  </div>
                  <button
                    id="dark-mode-toggle"
                    type="button"
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 outline-none focus:ring-2 focus:ring-slate-400
                      ${darkMode ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-zinc-700'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>

                {/* Taille globale */}
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl dark:bg-zinc-800/40">
                  <div>
                    <label htmlFor="font-size-select" className="font-bold text-sm text-slate-900 block dark:text-zinc-200">Taille du texte globale</label>
                    <span className="text-xs text-slate-400 dark:text-zinc-500">Ajuste l'échelle de lecture de l'application.</span>
                  </div>
                  <select
                    id="font-size-select"
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold shadow-sm outline-none focus:ring-2 focus:ring-slate-400 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
                  >
                    <option value="small">Petite (90%)</option>
                    <option value="normal">Standard (100%)</option>
                    <option value="large">Grande (115%)</option>
                  </select>
                </div>
              </div>
            </section>

            {/* BOUTON SAUVEGARDE */}
            <div className="pt-4 border-t border-slate-100 flex justify-end dark:border-zinc-800">
              <button
                type="button"
                onClick={handleSaveConfig}
                style={{ backgroundColor: activeThemeColor }}
                className="inline-flex items-center gap-2 text-white text-xs font-black uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all shadow-md hover:opacity-90 active:scale-[0.98]"
              >
                <FaSave /> Enregistrer les réglages
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}