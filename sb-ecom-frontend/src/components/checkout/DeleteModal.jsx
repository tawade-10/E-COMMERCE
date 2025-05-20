import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

const DeleteModal = ({ open, setOpen, title, onDeleteHandler, loader }) => {
  return (
    <React.Fragment>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel
            transition
            className="relative w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
              <button
                disabled={loader}
                onClick={() => setOpen(false)}
                type="button"
                className="flex justify-end gap-4 absolute right-4 top-2"
              >
                <span className="sr-only">Close</span>
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <FaExclamationTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold font-metropolis leading-6 text-gray-900"
                >
                  {title}
                </DialogTitle>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 font-metropolis">
                    Are you sure you want to delete? This action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                disabled={loader}
                type="button"
                onClick={onDeleteHandler}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                {loader ? "Loading..." : "Delete"}
              </button>
              <button
                disabled={loader}
                type="button"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteModal;
