const SearchBox = ({ label, placeholder, value, handleSearch }) => {
    return (
        <div className="flex flex-col gap-2 font-sans sm:flex-row sm:items-center">
            <label className="text-sm font-semibold uppercase tracking-[1.5px] text-volt-muted">
                {label}
            </label>
            <input
                type="text"
                className="w-full rounded-md border border-volt-border bg-volt-black px-4 py-2 text-base text-volt-text transition placeholder:text-volt-muted/70 focus:border-volt-accent focus:outline-none focus:ring focus:ring-volt-accent/20 sm:min-w-[280px]"
                placeholder={placeholder}
                value={value}
                // Controlled input: parent owns the value and receives every change.
                onChange={(event) => handleSearch(event.target.value)}
            />
        </div>
    );
};

export default SearchBox;
