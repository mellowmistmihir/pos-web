import CommonTopNab from "../../shared/CommonTopNav/CommonTopNab";
import { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import useLoader from "../../Shared/Loader/Loader";
import FinalLoader from "../../shared/Loader/FinalLoader";

const AddProduct = () => {
  const { loading, online } = useLoader();

  const [formData, setFormData] = useState({
    v_name: "",
    v_category: "",
    v_brand: "",
    v_price: "",
    v_cost: "",
    v_quantity: "",
    v_unit: "piece",
    tax: "",
    v_images: "",
    v_details: "",
  });

  const [vehicleCategory, setVehicleCategory] = useState([]);

  const imageHosKey = "29473dd4ab78ebc95009722bc0558d38";

  // Get Vehicle Categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://pos-backend-delta.vercel.app/api/vehicle-category/get-categories"
        );

        console.log(response.data);

        setVehicleCategory(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);
  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Upload Image
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    const imageData = new FormData();

    imageData.append("image", file);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        imageData,
        {
          params: {
            key: imageHosKey,
          },
        }
      );

      setFormData((prevData) => ({
        ...prevData,
        v_images: response.data.data.url,
      }));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);

      toast.error("Failed to upload image.");
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://pos-backend-delta.vercel.app/api/vehicles/createVehicle",
        formData
      );

      toast.success(response.data.message);

      setFormData({
        v_name: "",
        v_category: "",
        v_brand: "",
        v_price: "",
        v_cost: "",
        v_quantity: "",
        v_unit: "piece",
        tax: "",
        v_images: "",
        v_details: "",
      });
    } catch (error) {
      console.error("Error creating vehicle:", error);

      toast.error("Failed to create vehicle.");
    }
  };

  if (loading || !online) {
    return <FinalLoader />;
  }

  return (
    <div>
      <div>
        <CommonTopNab />
      </div>

      <div className="p-5">
        <div className="w-full min-h-screen border rounded-2xl">
          <div className="h-16 border-b flex items-center pl-5 text-2xl">
            <p>Add Vehicles</p>
          </div>

          <div className="p-3">
            <small className="italic">
              The field labels marked with * are required input fields.
            </small>

            <form onSubmit={handleSubmit}>
              <div className="flex gap-5 h-full flex-wrap items-center">
                {/* Vehicle Name */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Vehicle Name <span className="text-red-600">*</span>
                    </span>
                  </label>

                  <input
                    required
                    type="text"
                    placeholder="Vehicle Name"
                    name="v_name"
                    value={formData.v_name}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>

                {/* Vehicle Category */}
                <div className="flex flex-col">
                  <span className="label-text mb-2 mt-2">
                    Vehicle Category
                    <span className="text-red-600">*</span>
                  </span>

                  <select
                    required
                    name="v_category"
                    value={formData.v_category}
                    onChange={handleChange}
                    className="select w-[320px] input border-[#00000026] border"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>

                    {vehicleCategory?.map((item) => (
                      <option
                        key={item._id}
                        value={item.category_name}
                      >
                        {item.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Brand */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Brand <span className="text-red-600">*</span>
                    </span>
                  </label>

                  <input
                    required
                    type="text"
                    placeholder="Brand"
                    name="v_brand"
                    value={formData.v_brand}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Vehicle Price
                      <span className="text-red-600">*</span>
                    </span>
                  </label>

                  <input
                    required
                    type="number"
                    placeholder="Vehicle Price"
                    name="v_price"
                    value={formData.v_price}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>

                {/* Cost */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Vehicle Cost
                      <span className="text-red-600">*</span>
                    </span>
                  </label>

                  <input
                    required
                    type="number"
                    placeholder="Vehicle Cost"
                    name="v_cost"
                    value={formData.v_cost}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Vehicle Quantity
                      <span className="text-red-600">*</span>
                    </span>
                  </label>

                  <input
                    required
                    type="number"
                    placeholder="Vehicle Quantity"
                    name="v_quantity"
                    value={formData.v_quantity}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Vehicle Unit
                      <span className="text-red-600">*</span>
                    </span>
                  </label>

                  <input
                    required
                    type="text"
                    placeholder="Vehicle Unit"
                    name="v_unit"
                    value={formData.v_unit}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>

                {/* Tax */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Vehicle Tax
                    </span>
                  </label>

                  <input
                    type="number"
                    placeholder="Vehicle Tax"
                    name="tax"
                    value={formData.tax}
                    onChange={handleChange}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>

                {/* Image */}
                <div>
                  <label className="label">
                    <span className="label-text">
                      Vehicle Image
                      <span className="text-red-600">*</span>
                    </span>
                  </label>

                  <input
                    required
                    type="file"
                    onChange={handleFileUpload}
                    className="w-[320px] input border-[#00000026] border"
                  />
                </div>

                {/* Details */}
                <div className="w-full h-20">
                  <label className="label">
                    <span className="label-text">
                      Details
                      <span className="text-red-600">*</span>
                    </span>
                  </label>

                  <textarea
                    required
                    placeholder="Vehicle Details"
                    name="v_details"
                    value={formData.v_details}
                    onChange={handleChange}
                    className="w-[97%] h-full input border-[#00000026] border"
                  />
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  className="btn bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;