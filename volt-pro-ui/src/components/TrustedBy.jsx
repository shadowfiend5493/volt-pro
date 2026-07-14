// Logo names are data for now; later these can become image URLs or partner objects.
const LOGOS = ['Siemens', 'ABB', 'Schneider Electric', 'Eaton', 'GE Vernova'];

const TrustedBy = () => (
    <div className="bg-volt-secondary py-10">
        <div className="max-w-[1200px] mx-auto px-6">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-volt-muted text-center mb-6 mt-0">
                Trusted by Industry Leaders
            </p>
            <div className="flex items-center justify-center flex-wrap gap-x-14 gap-y-4">
                {/* Each company name becomes one visual logo-style label. */}
                {LOGOS.map(name => (
                    <span
                        key={name}
                        className="text-[15px] font-bold tracking-widest uppercase text-volt-muted opacity-60 cursor-default transition-all duration-200 hover:opacity-100 hover:text-volt-text"
                    >
                        {name}
                    </span>
                ))}
            </div>
        </div>
    </div>
);

export default TrustedBy;
