import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import { useState } from "react";

const Sidebar = () => {
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="fixed top-0 h-full w-64 px-5 py-10 mt-24 sm:px-0 sm:w-44 space-x-2 sm:space-x-0 text-center flex flex-col gap-8 bg-white">
      <div>
        <h2 className="text-xl font-bold mb-4">Search</h2>
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Filter</h2>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            label="Sort by"
            onChange={handleChange}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="AscendingPrice">Price: Low to High</MenuItem>
            <MenuItem value="DescendingPrice">Price: High to Low</MenuItem>
            <MenuItem value="AscendingName">A to Z</MenuItem>
            <MenuItem value="DescendingName">Z to A</MenuItem>
          </Select>
        </FormControl>
      </div>
      <hr />
      <div>
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Running"
              control={<Radio />}
              label="Running"
            />
            <FormControlLabel
              value="Sneaker"
              control={<Radio />}
              label="Sneaker"
            />
            <FormControlLabel
              value="Casual"
              control={<Radio />}
              label="Casual"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <hr />
    </div>
  );
};

export default Sidebar;
