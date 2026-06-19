import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faShield, faGlobe } from '@fortawesome/free-solid-svg-icons';

const STATS = [
    { icon: faShield, title: 'Enterprise Grade', desc: 'Built to meet the highest global standards' },
    { icon: faBolt,   title: 'Mission Critical', desc: 'Engineered for uptime you can depend on' },
    { icon: faGlobe,  title: 'Global Scale',     desc: 'Delivering solutions worldwide' },
];

const StatsBar = () => (
    <div className="hero-stats-bar">
        <div className="hero-wrapper" style={{ paddingTop: 0, paddingBottom: 0 }}>
            <div className="hero-stats-grid">
                {STATS.map(({ icon, title, desc }) => (
                    <div key={title} className="hero-stat-item">
                        <FontAwesomeIcon icon={icon} className="hero-stat-icon" />
                        <div>
                            <p className="hero-stat-title">{title}</p>
                            <p className="hero-stat-desc">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default StatsBar;
