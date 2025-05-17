import { Avatar, Backdrop, Link, Menu, MenuItem } from "@mui/material"; // Import named exports
import React from "react";
import { BiUser } from "react-icons/bi";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosExit } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "./store/actions";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = () => {
    dispatch(logoutUser(navigate));
  };

  return (
    <div className="relative z-30">
      <div
        className="sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700"
        onClick={handleClick}
      >
        <Avatar alt="Menu" src="" />
      </div>
      <Menu
        sx={{ width: "400px" }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: 160 },
        }}
      >
        <MenuItem className="flex gap-2" onClick={handleClose}>
          <BiUser className="text-xl" />
          <span className="font-bold text-[16px] mt-1">{user?.username}</span>
        </MenuItem>
        <Link to="/profile/orders">
          <MenuItem className="flex gap-2" onClick={handleClose}>
            <FaShoppingCart className="text-xl" />
            <span className="font-semibold">Order</span>
          </MenuItem>
        </Link>
        <MenuItem className="flex gap-2 items-center" onClick={logoutHandler}>
          <span
            className={`flex items-center gap-2 px-4 py-[6px] bg-gradient-to-r from-purple-600 to-red-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-500 hover:from-purple-500 hover:to-red-400 transition duration-300 ease-in-out transform`}
          >
            <IoIosExit className="text-xl" />
            Logout
          </span>
        </MenuItem>
      </Menu>
      {open && <Backdrop open={open} />}
    </div>
  );
};

export default UserMenu;
