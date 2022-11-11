import Select from "react-select"

// selectorStyles object
const customStyles = {
  option: (styles, state) => ({
    ...styles,
    cursor: "pointer",
  }),
  control: (styles) => ({
    ...styles,
    cursor: "pointer",
  }),
}

export default function SortAndFilterPanel({
  sortOption,
  setSortOption,
  filterOption,
  setFilterOption,
  sortOptions,
  filterOptions,
}) {
  return (
    <div className="sorting">
      <span className="sorting-option sort-button" title="Sort Notes">
        <span className="material-symbols-outlined">Sort</span>
        <Select
          defaultValue={sortOption}
          onChange={setSortOption}
          options={sortOptions}
          styles={customStyles}
        />
      </span>
      <span className="sorting-option sort-button" title="Filter Notes">
        <span className="material-symbols-outlined">filter_alt</span>
        <Select
          isMulti={true}
          defaultValue={filterOption}
          onChange={setFilterOption}
          options={filterOptions}
          styles={customStyles}
        />
      </span>
    </div>
  )
}
