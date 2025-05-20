import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaAddressCard } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Spinners from "../Spinners";
import InputField from "../shared/InputField";
import { addUpdateUserAddress } from "../store/actions";

const AddAddressForm = ({ address, setOpenAddressModal }) => {
  const dispatch = useDispatch();
  const { btnLoader } = useSelector((state) => state.errors);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSaveAddressHandler = async (data) => {
    dispatch(
      addUpdateUserAddress(data, toast, address?.addressId, setOpenAddressModal)
    );
  };

  //For Updating Address
  useEffect(() => {
    if (address?.addressId) {
      setValue("buildingName", address?.buildingName);
      setValue("city", address?.city);
      setValue("state", address?.state);
      setValue("pincode", address?.pincode);
      setValue("street", address?.street);
      setValue("country", address?.country);
    }
  }, [address]);

  return (
    <React.Fragment>
      <div className="">
        <form onSubmit={handleSubmit(onSaveAddressHandler)} className="">
          <div className="flex justify-center mb-4 font-semibold text-2xl text-slate-800 py-2 px-4">
            <FaAddressCard size={35} className="text-slate-800 text-5xl mr-2" />
            {!address?.addressId ? "Add Address" : "Update Address"}
          </div>
          <hr className="mt-2 mb-5 text-black" />
          <div className="flex flex-col gap-3">
            <InputField
              label="Building Name"
              required
              id="buildingName"
              type="text"
              message="*Building Name must be at least 5 characters"
              placeholder="Enter your Building Name"
              register={register}
              errors={errors}
              min={5}
            />

            <InputField
              label="City"
              required
              id="city"
              type="text"
              message="*City name must be at least 5 characters" // Align with backend DTO
              placeholder="Enter your City"
              register={register}
              errors={errors}
              min={5}
            />

            <InputField
              label="State"
              required
              id="state"
              type="text"
              message="*State name must be at least 2 characters"
              placeholder="Enter your State"
              register={register}
              errors={errors}
              min={2}
            />

            <InputField
              label="Pincode"
              required
              id="pincode"
              type="text"
              message="*Pincode must be at least 6 characters" // Align with backend DTO
              placeholder="Enter your Pincode"
              register={register}
              errors={errors}
              min={6}
            />

            <InputField
              label="Street"
              required
              id="street"
              type="text"
              message="*Street name must be at least 5 characters"
              placeholder="Enter your Street"
              register={register}
              errors={errors}
              min={5}
            />

            <InputField
              label="Country"
              required
              id="country"
              type="text"
              message="*Country name must be at least 2 characters"
              placeholder="Enter your Country"
              register={register}
              errors={errors}
              min={2}
            />
          </div>

          <button
            disabled={btnLoader}
            className="text-white bg-blue-500 px-4 py-2 rounded-md mt-4"
            type="submit"
          >
            {btnLoader ? (
              <>
                <Spinners />
                Loading ...
              </>
            ) : (
              <>Save</>
            )}
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AddAddressForm;
