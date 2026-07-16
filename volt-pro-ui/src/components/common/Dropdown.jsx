const Dropdown = ({ label, options, selectedValue, handleSort }) => {
    return (
        <div className="flex flex-col gap-2 font-sans sm:flex-row sm:items-center sm:justify-end">
            <label className="text-sm font-semibold uppercase tracking-[1.5px] text-volt-muted">
                {label}
            </label>
            <select
                className="rounded-md border border-volt-border bg-volt-black px-3 py-2 text-base text-volt-text transition focus:border-volt-accent focus:outline-none focus:ring focus:ring-volt-accent/20"
                value={selectedValue}
                // Parent receives the selected option value and decides how to apply it.
                onChange={(event) => handleSort(event.target.value)}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
