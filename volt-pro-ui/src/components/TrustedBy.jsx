const LOGOS = ['Siemens', 'ABB', 'Schneider Electric', 'Eaton', 'GE Vernova'];

const TrustedBy = () => {
    return (
        <div className="trusted-by">
            <div className="page-container">
                <p className="trusted-label">Trusted by Industry Leaders</p>
                <div className="trusted-logos">
                    {LOGOS.map(name => (
                        <span key={name} className="trusted-logo-name">{name}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrustedBy;
