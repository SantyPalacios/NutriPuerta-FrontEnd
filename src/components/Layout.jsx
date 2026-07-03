import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <header className="bg-surface dark:bg-surface-dim shadow-[0px_4px_20px_rgba(0,0,0,0.04)] w-full top-0 sticky z-50">
        <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim cursor-pointer">
            NutriPuerta
          </div>
          <nav className="hidden md:flex items-center gap-md">
            <Link to="/bmi" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 active:scale-95 transition-transform">
              BMI Calculator
            </Link>
            <Link to="/myths" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 active:scale-95 transition-transform">
              Food Myths
            </Link>
            <Link to="/register" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 active:scale-95 transition-transform">
              Register
            </Link>
            <Link to="/recommendation" className="font-label-md text-label-md text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed-dim transition-colors duration-200 active:scale-95 transition-transform">
              Plan
            </Link>
          </nav>
          <button className="md:hidden text-primary">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>
      
      <Outlet />
      
      <footer className="bg-surface-container dark:bg-surface-container-high w-full py-lg mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop gap-md max-w-[1200px] mx-auto">
          <div className="font-headline-md text-headline-md text-primary opacity-80 hover:opacity-100 transition-opacity text-center md:text-left">
            NutriPuerta
          </div>
          <nav className="flex flex-wrap justify-center gap-md">
            <a href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">
              Privacidad
            </a>
            <a href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">
              Términos
            </a>
            <a href="#" className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors opacity-80 hover:opacity-100">
              Contacto
            </a>
          </nav>
          <div className="font-label-sm text-label-sm text-secondary dark:text-secondary-fixed-dim text-center md:text-right">
            © 2024 NutriPuerta. Nutrición gentil para una vida plena.
          </div>
        </div>
      </footer>
    </>
  );
}
