import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBars, faXmark, faShoppingBag, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

// Navigation is data-driven so adding/removing menu items only changes this array.
const NAV_LINKS = [
    { label: 'Solutions',  href: '/solutions'  },
    { label: 'Products',   href: '/products'   },
    { label: 'Industries', href: '/industries' },
    { label: 'Resources',  href: '/resources'  },
    { label: 'About',      href: '/about'      },
];

const Header = () => {
    // menuOpen controls the mobile navigation drawer.
    const [menuOpen, setMenuOpen] = useState(false);
    // cartCount is ready for future cart state; it only renders a badge when greater than zero.
    const [cartCount] = useState(0);
    // theme starts from the user's saved choice; light is the default for new visitors.
    const [theme, setTheme] = useState(() => (
        localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    ));

    useEffect(() => {
        // The root .dark class lets all Tailwind color tokens switch together.
        document.documentElement.classList.toggle('dark', theme === 'dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleThemeToggle = () => {
        // Functional update keeps the toggle reliable even if React batches state changes.
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <header className="bg-volt-secondary/85 border-b border-volt-border/40 backdrop-blur-md sticky top-0 z-100">
            <div className="flex items-center justify-between mx-auto max-w-[1200px] px-6 py-4 relative">

                <Link to="/" className="flex items-center gap-2.5 no-underline shrink-0">
                    <FontAwesomeIcon icon={faBolt} className="text-volt-accent text-[26px] drop-shadow-[0_0_6px_#22C55E]" />
                    <span className="text-xl font-bold text-volt-text tracking-wide">VoltPro</span>
                </Link>

                {/* Desktop nav is always visible on large screens; mobile nav follows menuOpen. */}
                <nav className={`${menuOpen ? 'block' : 'hidden'} lg:flex absolute lg:static top-full left-0 w-full lg:w-auto bg-volt-secondary lg:bg-transparent border-t border-b lg:border-0 border-volt-border py-3 lg:py-0 z-99`}>
                    <ul className="list-none m-0 p-0 flex flex-col lg:flex-row lg:gap-2">
                        {/* Map converts each nav item object into a router Link. */}
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={label}>
                                <Link
                                    to={href}
                                    className="block px-6 lg:px-3.5 py-3 lg:py-2 text-[15px] font-medium tracking-tight text-volt-muted no-underline transition-colors duration-200 hover:text-volt-accent hover:bg-volt-accent/10 lg:rounded-sm"
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4 shrink-0">
                    <Link
                        to="/login"
                        className="border border-volt-accent text-volt-accent px-[18px] py-[7px] rounded-sm text-[13px] font-semibold tracking-[1.5px] uppercase no-underline transition-all duration-200 hover:bg-volt-accent hover:text-volt-black hover:shadow-[0_0_14px_rgba(34,197,94,0.15)]"
                    >
                        Login
                    </Link>

                    <button className="bg-transparent border-0 text-volt-muted cursor-pointer text-xl relative px-1.5 py-1 transition-colors duration-200 hover:text-volt-accent flex items-center" aria-label="Shopping bag">
                        <FontAwesomeIcon icon={faShoppingBag} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-volt-accent text-volt-black rounded-full w-[17px] h-[17px] text-[10px] font-bold flex items-center justify-center leading-none">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        className="flex items-center justify-center rounded-full border border-volt-border bg-volt-black px-2.5 py-2 text-volt-muted transition-colors duration-200 hover:border-volt-accent hover:text-volt-accent"
                        onClick={handleThemeToggle}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {/* Icon changes make the current theme control easy to understand visually. */}
                        <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
                    </button>

                    <button
                        className="flex items-center justify-center bg-transparent border-0 text-volt-text text-xl cursor-pointer p-1 lg:hidden"
                        // Functional state update uses the latest value when toggling.
                        onClick={() => setMenuOpen(prev => !prev)}
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                    >
                        <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Header;
