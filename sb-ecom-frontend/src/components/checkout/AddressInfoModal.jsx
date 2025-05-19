import { Dialog, DialogPanel } from "@headlessui/react";
import React from "react";
import { FaTimes } from "react-icons/fa";

const AddressInfoModal = ({ open, setOpen, children, onClose }) => {
  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30">
          <DialogPanel className="relative w-full max-w-md mx-auto transform overflow-hidden bg-white rounded-lg shadow-xl transition-all">
            <div className="px-6 py-6">{children}</div>
            <div>
              <button
                onClick={() => setOpen(false)}
                type="button"
                className="flex justify-end gap-4 absolute right-4 top-2"
              >
                <FaTimes className="text-slate-700" size={25} />
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default AddressInfoModal;
