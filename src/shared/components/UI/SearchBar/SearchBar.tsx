import "./SearchBar.scss";

interface Props {
  placeholder?: string;
}

const SearchBar = ({ placeholder = "Search" }: Props) => {
  return (
    <div className="search-input-box">
      <input
        type="search"
        className="search-input"
        id="search-form"
        placeholder={placeholder}
        onChange={() => {}}
      />
      <img src="src\shared\assets\search.png" className="search-icon" />
    </div>
  );
};

export default SearchBar;
