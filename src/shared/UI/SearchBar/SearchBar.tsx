import SearchIcon from "@mui/icons-material/Search";
import ChatType from "../../types/ChatType";
import "./SearchBar.scss";
import { InputBase } from "@mui/material";

interface Props {
  placeholder?: string;
  list: ChatType[];
  SetSearchResults: (value: ChatType[]) => void;
}

const SearchBar = ({
  placeholder = "Search",
  list,
  SetSearchResults,
}: Props) => {
  const HandleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value) {
      return SetSearchResults(list);
    }

    const results = list.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    return SetSearchResults(results);
  };

  return (
    <div>
      <div className="SearchBar">
        <InputBase
          className="InputBar"
          type="text"
          placeholder={placeholder}
          onChange={HandleSearchChange}
        />
        <SearchIcon className="SearchIco" />
      </div>
    </div>
  );
};

export default SearchBar;
