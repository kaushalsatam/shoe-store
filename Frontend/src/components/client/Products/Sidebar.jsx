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

const Sidebar = ({ setSearch }) => {
  const [sort, setSort] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="flex flex-col gap-8 p-4 lg:p-8 bg-white">
      <div>
        <h2 className="text-xl font-bold mb-4">Search</h2>
        <TextField
          id="input-with-icon-textfield"
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
          fullWidth
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Filter</h2>
        <FormControl fullWidth>
          <InputLabel id="sort-by-label">Sort by</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by"
            value={sort}
            label="Sort by"
            onChange={handleChange}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="price ASC">Price: Low to High</MenuItem>
            <MenuItem value="price DESC">Price: High to Low</MenuItem>
            <MenuItem value="name ASC">A to Z</MenuItem>
            <MenuItem value="name DESC">Z to A</MenuItem>
          </Select>
        </FormControl>
      </div>
      <hr />
      <div>
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
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
