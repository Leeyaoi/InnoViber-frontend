import SearchIcon from "@mui/icons-material/Search";
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
      <SearchIcon
        sx={{
          color: "primary.dark",
          my: "auto",
        }}
      />
    </div>
  );
};

export default SearchBar;
