import React, { useEffect, useState } from "react";

import { useLoginMutation } from "../../redux/api/userSlice";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler= async (e)=>{
    e.preventDefault()

    try{
     const res = await login({email,password}).unwrap()
     console.log(res)
     dispatch(setCredientials({...res}))
    }
    catch(error)
    {
        toast.error(error?.data?.message || error.message)
    }
  }
  return (
    <div>
      <section className="pl-[10rem] flex flex-wrap text-black">
        <div className="mr-[4rem mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4 ">Sign In</h1>

          <form className="container w-[40rem"
           onSubmit={submitHandler}>
            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium  ">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 border rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-[2rem]">
              <label htmlFor="email" className="block text-sm font-medium ">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 border rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
            >
               {isLoading ? "Signing In..." :"Sign IN"} 
            </button>
            {isLoading && <Loader/>}
          </form>
          <div className="mt-4 ">
            <p className="">
             New Customer ?{""}
             <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} 
             className="text-pink-500 hover:underline">
             Register
             </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
