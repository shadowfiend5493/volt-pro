import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBars, faXmark, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const NAV_LINKS = [
    { label: 'Solutions',  href: '/solutions'  },
    { label: 'Products',   href: '/products'   },
    { label: 'Industries', href: '/industries' },
    { label: 'Resources',  href: '/resources'  },
    { label: 'About',      href: '/about'      },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount] = useState(0);

    return (
        <header className="bg-[rgba(10,15,30,0.85)] border-b border-[rgba(30,45,74,0.4)] backdrop-blur-md sticky top-0 z-100">
            <div className="flex items-center justify-between mx-auto max-w-[1200px] px-6 py-4 relative">

                <a href="/" className="flex items-center gap-2.5 no-underline shrink-0">
                    <FontAwesomeIcon icon={faBolt} className="text-volt-accent text-[26px] drop-shadow-[0_0_6px_#22C55E]" />
                    <span className="text-xl font-bold text-volt-text tracking-wide">VoltPro</span>
                </a>

                <nav className={`${menuOpen ? 'block' : 'hidden'} lg:flex absolute lg:static top-full left-0 w-full lg:w-auto bg-volt-secondary lg:bg-transparent border-t border-b lg:border-0 border-volt-border py-3 lg:py-0 z-99`}>
                    <ul className="list-none m-0 p-0 flex flex-col lg:flex-row lg:gap-2">
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="block px-6 lg:px-3.5 py-3 lg:py-2 text-[15px] font-medium tracking-tight text-volt-muted no-underline transition-colors duration-200 hover:text-volt-accent hover:bg-volt-accent/10 lg:rounded-sm"
                                >
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4 shrink-0">
                    <a
                        href="/login"
                        className="border border-volt-accent text-volt-accent px-[18px] py-[7px] rounded-sm text-[13px] font-semibold tracking-[1.5px] uppercase no-underline transition-all duration-200 hover:bg-volt-accent hover:text-volt-black hover:shadow-[0_0_14px_rgba(34,197,94,0.15)]"
                    >
                        Login
                    </a>

                    <button className="bg-transparent border-0 text-volt-muted cursor-pointer text-xl relative px-1.5 py-1 transition-colors duration-200 hover:text-volt-accent flex items-center" aria-label="Shopping bag">
                        <FontAwesomeIcon icon={faShoppingBag} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-volt-accent text-volt-black rounded-full w-[17px] h-[17px] text-[10px] font-bold flex items-center justify-center leading-none">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button
                        className="flex items-center justify-center bg-transparent border-0 text-volt-text text-xl cursor-pointer p-1 lg:hidden"
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
