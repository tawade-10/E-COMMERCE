import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUserPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../shared/InputField";
import { registerNewUser } from "../store/actions";

const Register = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    dispatch(registerNewUser(data, toast, reset, navigate, setLoader));
  };

  return (
    <React.Fragment>
      <div className="min-h-[calc(100vh-64px)] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(registerHandler)}
          className="sm:w-[450px] w-[360px] shadow-xl py-8 sm:px-8 px-4 rounded-md"
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <FaUserPlus className="text-slate-800 text-5xl" />
            <h1 className="text-slate-800 text-center font-monserrat lg:text-3xl text-2xl font-bold">
              Register Here
            </h1>
          </div>
          <hr className="mt-2 mb-5 text-black" />
          <div className="flex flex-col gap-3">
            <InputField
              label="UserName"
              required
              id="username"
              type="text"
              message="*Username is required"
              placeholder="Enter your username"
              register={register}
              errors={errors}
            />

            <InputField
              label="Email"
              required
              id="email"
              type="email"
              message="*Email is required"
              placeholder="Enter your Email"
              register={register}
              errors={errors}
            />

            <InputField
              label="Password"
              required
              id="password"
              min={6}
              type="password"
              message="*Password is required"
              placeholder="Enter your password"
              register={register}
              errors={errors}
            />
          </div>

          <button
            disabled={loader}
            className="bg-gradient-to-r from-purple-600 to-red-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-500 hover:from-purple-500 hover:to-red-400 transition duration-300 ease-in-out transform flex gap-2 items-center justify-center font-semibold text-white w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3"
            type="submit"
          >
            {loader ? <>Loading...</> : <>Register</>}
          </button>
          <p className="text-center text-sm text-slate-700 mt-6">
            Already have an account?
            <Link
              className="font-semibold underline hover:text-black"
              to="/login"
            >
              <span className="text-btnColor"> Login</span>
            </Link>
          </p>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Register;
