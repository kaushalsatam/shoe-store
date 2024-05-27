import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { baseURL } from "../../../utils/baseURL";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const [id, setId] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const addProduct = async (data) => {
    try {
      const result = await axios.post(`${baseURL}/addProduct`, data);
      setId(result.data.id);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const uploadImages = async (data) => {
    const formData = new FormData();
    formData.append("productId", id);
    formData.append("main", data.main[0]);
    formData.append("left_view", data.left_view[0]);
    formData.append("right_view", data.right_view[0]);
    formData.append("top_view", data.top_view[0]);
    formData.append("bottom_view", data.bottom_view[0]);

    try {
      await axios.post(`${baseURL}/uploadImages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Images uploaded successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error("Error uploading images:", error);
    }
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {!id ? (
        <form
          method="post"
          onSubmit={handleSubmit(addProduct)}
          className="bg-white p-8 rounded shadow-md w-full max-w-lg m-8"
        >
          <div className="form-field-container flex flex-col gap-6">
            <h1 className="font-bold text-2xl text-center mb-4">Add Product</h1>

            <TextField
              id="name"
              label="Name"
              variant="outlined"
              fullWidth
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name ? errors.name.message : ""}
            />

            <FormControl fullWidth error={!!errors.brand}>
              <InputLabel id="brand-select-label">Brand</InputLabel>
              <Controller
                name="brand"
                control={control}
                defaultValue=""
                rules={{ required: "Brand is required" }}
                render={({ field }) => (
                  <Select
                    labelId="brand-select-label"
                    id="brand-select"
                    label="Brand"
                    {...field}
                  >
                    <MenuItem value="Nike">Nike</MenuItem>
                    <MenuItem value="Adidas">Adidas</MenuItem>
                    <MenuItem value="Puma">Puma</MenuItem>
                  </Select>
                )}
              />
              {errors.brand && (
                <FormHelperText>{errors.brand.message}</FormHelperText>
              )}
            </FormControl>

            <TextField
              id="description"
              label="Description"
              variant="outlined"
              fullWidth
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description ? errors.description.message : ""}
            />

            <TextField
              id="original_price"
              label="Original Price"
              variant="outlined"
              type="number"
              fullWidth
              {...register("original_price", {
                required: "Original Price is required",
              })}
              error={!!errors.original_price}
              helperText={
                errors.original_price ? errors.original_price.message : ""
              }
            />

            <TextField
              id="current_price"
              label="Current Price"
              variant="outlined"
              type="number"
              fullWidth
              {...register("current_price", {
                required: "Current Price is required",
              })}
              error={!!errors.current_price}
              helperText={
                errors.current_price ? errors.current_price.message : ""
              }
            />

            <FormControl fullWidth error={!!errors.category}>
              <InputLabel id="category-select-label">Category</InputLabel>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    label="Category"
                    {...field}
                  >
                    <MenuItem value="Running">Running</MenuItem>
                    <MenuItem value="Sneaker">Sneaker</MenuItem>
                    <MenuItem value="Formal">Formal</MenuItem>
                  </Select>
                )}
              />
              {errors.category && (
                <FormHelperText>{errors.category.message}</FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel id="gender-select-label">Gender</InputLabel>
              <Controller
                name="gender"
                control={control}
                defaultValue=""
                rules={{ required: "Gender is required" }}
                render={({ field }) => (
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    label="Gender"
                    {...field}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Kids">Kids</MenuItem>
                    <MenuItem value="Unisex">Unisex</MenuItem>
                  </Select>
                )}
              />
              {errors.gender && (
                <FormHelperText>{errors.gender.message}</FormHelperText>
              )}
            </FormControl>

            <TextField
              id="stock_quantity"
              label="Stock Quantity"
              variant="outlined"
              type="number"
              fullWidth
              {...register("stock_quantity", {
                required: "Stock Quantity is required",
              })}
              error={!!errors.stock_quantity}
              helperText={
                errors.stock_quantity ? errors.stock_quantity.message : ""
              }
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Next
            </Button>
          </div>
        </form>
      ) : (
        <form
          method="post"
          onSubmit={handleSubmit(uploadImages)}
          className="bg-white p-8 rounded shadow-md w-full max-w-lg m-8"
        >
          <div className="form-field-container flex flex-col gap-6">
            <h1 className="font-bold text-2xl text-center mb-4">
              Upload Images
            </h1>

            <label htmlFor="main">Main Image: </label>
            <input
              id="main"
              type="file"
              label="Main"
              {...register("main", { required: "Main image is required" })}
            />
            {errors.main && (
              <FormHelperText error>{errors.main.message}</FormHelperText>
            )}

            <label htmlFor="left">Left Image: </label>
            <input
              id="left"
              type="file"
              {...register("left_view", {
                required: "Left view image is required",
              })}
            />
            {errors.left_view && (
              <FormHelperText error>{errors.left_view.message}</FormHelperText>
            )}

            <label htmlFor="right">Right Image: </label>
            <input
              id="right"
              type="file"
              {...register("right_view", {
                required: "Right view image is required",
              })}
            />
            {errors.right_view && (
              <FormHelperText error>{errors.right_view.message}</FormHelperText>
            )}

            <label htmlFor="top">Top Image: </label>
            <input
              id="top"
              type="file"
              {...register("top_view", {
                required: "Top view image is required",
              })}
            />
            {errors.top_view && (
              <FormHelperText error>{errors.top_view.message}</FormHelperText>
            )}

            <label htmlFor="bottom">Bottom Image</label>
            <input
              id="bottom"
              type="file"
              {...register("bottom_view", {
                required: "Bottom view image is required",
              })}
            />
            {errors.bottom_view && (
              <FormHelperText error>
                {errors.bottom_view.message}
              </FormHelperText>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className="mt-4"
            >
              Upload
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddProduct;
