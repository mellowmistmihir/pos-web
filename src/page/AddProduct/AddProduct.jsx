import CommonTopNab from "../../shared/CommonTopNav/CommonTopNab";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import useLoader from "../../Shared/Loader/Loader";
import FinalLoader from "../../Shared/Loader/FinalLoader";


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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/vehicle-category/get-categories"
        );
        setVehicleCategory(res.data.categories);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append("image", file);

    try {
      const res = await axios.post(
        "https://api.imgbb.com/1/upload",
        data,
        { params: { key: imageHosKey } }
      );

      setFormData((prev) => ({
        ...prev,
        v_images: res.data.data.url,
      }));

      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/api/vehicles/createVehicle",
        formData
      );

      toast.success(res.data.message);

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
    } catch {
      toast.error("Failed to create vehicle");
    }
  };

  if (loading || !online) return <FinalLoader />;

  // 🔵 LABEL STYLE (light blue like you asked)
  const labelClass =
    "text-lg font-medium text-sky-500 mb-1";

  // 🌈 GRADIENT INPUT BOX STYLE
  const inputBox =
    "w-full px-3 py-2 rounded-xl bg-gradient-to-r from-white/60 to-white/20 " +
    "dark:from-gray-800/60 dark:to-gray-900/60 " +
    "border border-transparent shadow-md backdrop-blur-md " +
    "focus:outline-none focus:ring-2 focus:ring-sky-400 transition";

  return (
    <div className="min-h-screen  ">
      <CommonTopNab />

      <div className="max-w-5xl mx-auto p-6">

        {/* HEADER */}
        <div className="mb-8">
    <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]">
  Add Vehicle
</h1>
          <p className="text-sm opacity-70">Create premium inventory item</p>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

          {/* NAME */}
          <div>
            <label className={labelClass}>Vehicle Name *</label>
            <input
              name="v_name"
              value={formData.v_name}
              onChange={handleChange}
              className={inputBox}
              placeholder="Enter vehicle name"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className={labelClass}>Category *</label>
            <select
              name="v_category"
              value={formData.v_category}
              onChange={handleChange}
              className={inputBox}
              required
            >
              <option value="">Select category</option>
              {vehicleCategory.map((c) => (
                <option key={c._id} value={c.category_name}>
                  {c.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* BRAND */}
          <div>
            <label className={labelClass}>Brand *</label>
            <input name="v_brand" value={formData.v_brand} onChange={handleChange} className={inputBox} />
          </div>

          {/* PRICE */}
          <div>
            <label className={labelClass}>Price *</label>
            <input type="number" name="v_price" value={formData.v_price} onChange={handleChange} className={inputBox} />
          </div>

          {/* COST */}
          <div>
            <label className={labelClass}>Cost *</label>
            <input type="number" name="v_cost" value={formData.v_cost} onChange={handleChange} className={inputBox} />
          </div>

          {/* QUANTITY */}
          <div>
            <label className={labelClass}>Quantity *</label>
            <input type="number" name="v_quantity" value={formData.v_quantity} onChange={handleChange} className={inputBox} />
          </div>

          {/* UNIT */}
          <div>
            <label className={labelClass}>Unit *</label>
            <input name="v_unit" value={formData.v_unit} onChange={handleChange} className={inputBox} />
          </div>

          {/* TAX */}
          <div>
            <label className={labelClass}>Tax *</label>
            <input type="number" name="tax" value={formData.tax} onChange={handleChange} className={inputBox} />
          </div>

          {/* IMAGE */}
          <div>
            <label className={labelClass}>Image *</label>
            <input type="file" onChange={handleFileUpload} className="w-full text-sm" />
          </div>

          {/* DETAILS */}
          <div className="md:col-span-2">
            <label className={labelClass}>Details *</label>
            <textarea
              name="v_details"
              value={formData.v_details}
              onChange={handleChange}
              className={inputBox + " h-28"}
            />
          </div>

          {/* SUBMIT BUTTON FULL WIDTH */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-semibold 
              bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500
              hover:from-indigo-500 hover:to-sky-500
              shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit Vehicle
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddProduct;