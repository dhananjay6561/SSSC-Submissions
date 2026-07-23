function FilterButtons({ filter: activeFilter, setFilter }) {
  const filterOptions = ["All", "Active", "Completed"];
  return (
    <div className="filter-buttons">
      {filterOptions.map((f) => (
        <button
          key={f}
          className={activeFilter === f ? "active-filter" : ""}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
export default FilterButtons;