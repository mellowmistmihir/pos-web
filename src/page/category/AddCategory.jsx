import { useState } from "react";
import CommonTopNab from "../../Shared/CommonTopNav/CommonTopNab";
import toast from "react-hot-toast";

import axios from "axios";
import { FaCaretRight, FaEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import useLoader from "../../Shared/Loader/Loader";
import FinalLoader from "../../Shared/Loader/FinalLoader";
import useGetData from "../../hook/UseGetData";

export default function AddVehicles() {
  const [vehicleName, setVehicleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const { loading2, online } = useLoader();

  const { data: vehiclesData, isLoading: tableLoading, refetch } = useGetData(
    "https://pos-backend-delta.vercel.app/api/vehicles/getVehicles"
  );

  const { data: productsData } = useGetData(
    "https://pos-backend-delta.vercel.app/api/products/getProduct"
  );

  const enrichedVehicles = vehiclesData?.vehicles?.map((vehicle) => {
    const productsInVehicle = productsData?.products?.filter(
      (product) => product.p_vehicle === vehicle.vehicle_name
    );

    const brandsInVehicle = [
      ...new Set(productsInVehicle?.map((product) => product.p_brand)),
    ];

    return {
      ...vehicle,
      productCount: productsInVehicle?.length || 0,
      brandCount: brandsInVehicle?.length || 0,
    };
  });

  // Add Vehicle
  const handleAddVehicle = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://pos-backend-delta.vercel.app/api/vehicles/create-vehicle",
        {
          vehicle_name: vehicleName,
        }
      );

      if (response.status === 201) {
        toast.success("Vehicle added successfully!");
        setVehicleName("");
        refetch();
      } else {
        toast.error("Failed to add vehicle.");
      }
    } catch {
      toast.error("Vehicle already exists!");
    } finally {
      setLoading(false);
    }
  };

  // Get Single Vehicle
  const handleEditVehicle = async (id) => {
    try {
      const response = await axios.get(
        `https://pos-backend-delta.vercel.app/api/vehicles/single/${id}`
      );

      if (response.status === 200) {
        setEditingVehicle(response.data);
        setVehicleName(response.data.vehicle_name);

        document.getElementById("my_modal_2").showModal();
      } else {
        toast.error("Failed to fetch vehicle.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching vehicle.");
    }
  };

  // Update Vehicle
  const handleUpdateVehicle = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      const response = await axios.put(
        `https://pos-backend-delta.vercel.app/api/vehicles/update/${editingVehicle._id}`,
        {
          vehicle_name: vehicleName,
        }
      );

      if (response.status === 200) {
        toast.success("Vehicle updated successfully!");

        setEditingVehicle(null);

        refetch();

        document.getElementById("my_modal_2").close();
      } else {
        toast.error("Failed to update vehicle.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating vehicle.");
    } finally {
      setEditLoading(false);
    }
  };

  // Delete Vehicle
  const handleDeleteVehicle = async (id) => {
    if (window.confirm("Are you sure you want to delete this vehicle?")) {
      try {
        const response = await axios.delete(
          `https://pos-backend-delta.vercel.app/api/vehicles/delete/${id}`
        );

        if (response.status === 200) {
          toast.success("Vehicle deleted successfully!");
          refetch();
        } else {
          toast.error("Failed to delete vehicle.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error deleting vehicle.");
      }
    }
  };

  if (tableLoading) {
    return <FinalLoader />;
  }

  if (loading2 || !online) {
    return <FinalLoader />;
  }

  return (
    <div>
      <CommonTopNab />

      <div className="p-5">
        <div className="w-full border border-blue-500 rounded-2xl p-5">
          <h2 className="text-2xl font-bold mb-5">Add Vehicle</h2>

          <form
            onSubmit={handleAddVehicle}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col">
              <label htmlFor="vehicle_name" className="font-medium mb-2">
                Vehicle Name:
              </label>

              <input
                id="vehicle_name"
                type="text"
                value={vehicleName}
                onChange={(e) => setVehicleName(e.target.value)}
                placeholder="Enter vehicle name"
                className="input border border-gray-300 p-2 rounded-md w-full"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-400 transition"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Vehicle"}
            </button>
          </form>
        </div>
      </div>

      <div className="p-5">
        <div className="w-full min-h-screen border border-blue-500 rounded-2xl p-5">
          <h2 className="text-2xl font-bold mb-5">
            Vehicle Table
          </h2>

          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="border border-gray-300 px-4 py-2">
                  Vehicle Name
                </th>

                <th className="border border-gray-300 px-4 py-2">
                  Products Count
                </th>

                <th className="border border-gray-300 px-4 py-2">
                  Brands Count
                </th>

                <th className="border border-gray-300 px-4 py-2">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {enrichedVehicles?.map((vehicle) => (
                <tr key={vehicle._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {vehicle.vehicle_name}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {vehicle.productCount}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {vehicle.brandCount}
                  </td>

                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="dropdown dropdown-left flex justify-center">
                      <div>
                        <button className="btn m-1 text-blue-500">
                          Action
                        </button>
                      </div>

                      <ul
                        tabIndex={0}
                        className="dropdown-content items-center border border-blue-500 menu bg-white rounded-md z-[1] w-52 shadow"
                      >
                        <FaCaretRight className="absolute text-3xl ml-[218px] text-blue-600" />

                        <li
                          className="w-full border-b text-blue-500"
                          onClick={() =>
                            handleEditVehicle(vehicle._id)
                          }
                        >
                          <a>
                            <FaEdit className="text-2xl" />
                            Edit
                          </a>
                        </li>

                        <li
                          className="w-full border-b text-red-500"
                          onClick={() =>
                            handleDeleteVehicle(vehicle._id)
                          }
                        >
                          <a>
                            <AiTwotoneDelete className="text-2xl" />
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box bg-white">
            <form onSubmit={handleUpdateVehicle}>
              <div className="flex flex-col">
                <label className="text-sm">
                  Edit Vehicle
                </label>

                <input
                  name="vehicleName"
                  value={vehicleName}
                  onChange={(e) => setVehicleName(e.target.value)}
                  required
                  className="border h-10 w-[220px] border-blue-100 pl-3 rounded-lg outline-none"
                />
              </div>

              <button
                type="submit"
                className="border px-2 py-2 mt-2 rounded-lg mb-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                disabled={editLoading}
              >
                {editLoading ? "Updating..." : "Update Vehicle"}
              </button>
            </form>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}