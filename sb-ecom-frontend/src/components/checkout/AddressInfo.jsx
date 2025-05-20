import { Skeleton } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaAddressBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import AddAddressForm from "./AddAddressForm";
import AddressInfoModal from "./AddressInfoModal";
import AddressList from "./AddressList";
import DeleteModal from "./DeleteModal";
import { deleteUserAddress } from "../store/actions";

const AddressInfo = ({ address }) => {
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const addNewAddressHandler = () => {
    setSelectedAddress("");
    setOpenAddressModal(true);
  };

  const dispatch = useDispatch();

  const deleteAddressHandler = () => {
    dispatch(
      deleteUserAddress(toast, selectedAddress?.addressId, setOpenDeleteModal)
    );
  };
  const noAddressExist = !address || address.length === 0;
  const { isLoading, btnLoader } = useSelector((state) => state.errors);
  return (
    <React.Fragment>
      <div className="pt-4">
        {noAddressExist ? (
          <div className="p-6 rounded-lg max-w-md mx-auto flex flex-col items-center justify-center">
            <FaAddressBook size={50} className="text-gray-600 mb-4" />
            <h1 className="mb-2 text-slate-900 text-center font-semibold text-2xl">
              No Address yet!
            </h1>
            <p className="mb-2 text-slate-900 text-center font-semibold text-2xl">
              Please Add an Address to proceed further
            </p>
            <button
              onClick={addNewAddressHandler}
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-all"
            >
              Add Address
            </button>
          </div>
        ) : (
          <div className="relative p-6 rounded-lg max-w-md mx-auto">
            <h1 className="text-slate-800 text-center font-bold text-2xl">
              Select Address
            </h1>
            {isLoading ? (
              <div className="py-4 px-8">
                <Skeleton />
              </div>
            ) : (
              <>
                <div className="space-y-4 pt-6">
                  <AddressList
                    addresses={address}
                    setSelectedAddress={setSelectedAddress}
                    setOpenAddressModal={setOpenAddressModal}
                    setOpenDeleteModal={setOpenDeleteModal}
                  />
                </div>
                {address.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={addNewAddressHandler}
                      className="text-white bg-blue-500 px-4 py-2 rounded-md"
                    >
                      Add More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        <AddressInfoModal open={openAddressModal} setOpen={setOpenAddressModal}>
          <AddAddressForm
            address={selectedAddress}
            setOpenAddressModal={setOpenAddressModal}
          />
        </AddressInfoModal>

        <DeleteModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          loader={btnLoader}
          title="Delete Address"
          onDeleteHandler={deleteAddressHandler}
        ></DeleteModal>
      </div>
    </React.Fragment>
  );
};

export default AddressInfo;
