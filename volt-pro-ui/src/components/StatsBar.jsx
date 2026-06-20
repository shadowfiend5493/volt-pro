import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faShield, faGlobe } from '@fortawesome/free-solid-svg-icons';

const STATS = [
    { icon: faShield, title: 'Enterprise Grade', desc: 'Built to meet the highest global standards' },
    { icon: faBolt,   title: 'Mission Critical', desc: 'Engineered for uptime you can depend on'  },
    { icon: faGlobe,  title: 'Global Scale',     desc: 'Delivering solutions worldwide'            },
];

const StatsBar = () => (
    <div className="bg-volt-secondary">
        <div className="px-[clamp(1.5rem,5vw,7rem)]">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
                {STATS.map(({ icon, title, desc }) => (
                    <div key={title} className="flex items-start gap-3.5">
                        <FontAwesomeIcon
                            icon={icon}
                            className="text-volt-accent text-xl mt-0.5 shrink-0 drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]"
                        />
                        <div>
                            <p className="text-[14px] font-bold tracking-wide text-volt-text uppercase m-0 mb-1">{title}</p>
                            <p className="text-[13px] text-volt-muted leading-relaxed m-0">{desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export default StatsBar;
