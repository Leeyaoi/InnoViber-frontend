import SearchIcon from "@mui/icons-material/Search";
import ShortChatType from "../../types/ShortChatType";
import "./SearchBar.scss";
import { InputBase } from "@mui/material";

interface Props {
  placeholder?: string;
  list: ShortChatType[];
  SetSearchResults: (value: ShortChatType[]) => void;
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
          id="InputBar"
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
