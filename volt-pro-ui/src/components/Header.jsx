import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faBars, faXmark, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

const NAV_LINKS = [
    { label: 'Solutions', href: '/solutions' },
    { label: 'Products', href: '/products' },
    { label: 'Industries', href: '/industries' },
    { label: 'Resources', href: '/resources' },
    { label: 'About', href: '/about' },
];

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [cartCount] = useState(0);

    return (
        <header className="header">
            <div className="container">

                <a href="/" className="brand-link">
                    <FontAwesomeIcon icon={faBolt} className="brand-icon" />
                    <span className="brand-title">VoltPro</span>
                </a>

                <nav className={`nav ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        {NAV_LINKS.map(({ label, href }) => (
                            <li key={label}>
                                <a href={href} className="nav-link">{label}</a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="header-actions">
                    <a href="/login" className="btn-login">Login</a>

                    <button className="cart-btn" aria-label="Shopping bag">
                        <FontAwesomeIcon icon={faShoppingBag} />
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
                    </button>

                    <button
                        className="menu-toggle"
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
