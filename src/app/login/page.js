"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
import axios from "axios";
import Image from "next/image";
import loginImage from "../img/Login Art.png";
import loginImageLg from "../img/Login-Art-Lg.png";
import Link from "next/link";

export default function Login() {
  const errorEmail = useRef(null);
  const [validEmail, setValidEmail] = useState(false);
  const errorPassword = useRef(null);
  const [validPass, setValidPass] = useState(false);
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fetchApi = await axios.post(
        "https://mongo-ngaos.vercel.app/login",
        {
          email,
          password,
        }
      );

      signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      }).then((res) => {
        if (!res.error) {
          alert("sukses login");
          router.push("/about");
        }
      });
    } catch (error) {
      if (error.response.status === 404) {
        alert("email tidak ada");
      }
      if (error.response.status === 401) {
        alert("password salah");
      }
    }

    if(errorEmail.current.value === null | errorEmail.current.value === ""){
      setValidEmail(true);
    }
    if(errorPassword.current.value === null | errorPassword.current.value === ""){
      setValidPass(true)
    }
  };

  return (
    <div className="pt-10 px-6 xl:w-[80%] xl:mx-auto xl:flex xl:flex-row-reverse xl:items-center xl:justify-around xl:p-0 xl:h-screen">
      <div className="w-full h-[200px] xl:h-full xl:w-[50%] xl:py-3 overflow-hidden rounded-md">
        <Image
          src={loginImageLg}
          alt="login image"
          width={1000}
          height={1000}
          quality={100}
        />
      </div>
      <div className="mt-3 xl:w-[40%] xl:h-auto xl:flex xl:flex-col xl:justify-between xl:items-center xl:gap-y-32">
        <main className="flex flex-col items-center gap-y-7 xl:justify-self-center">
          <div>
            <div>
              <h1 className="font-bold text-2xl text-primary-text">
                Welcome Back 👋
              </h1>
              <p className="text-secondary-text">
                Today is a new day. It's your day. You shape it. Sign in to
                start managing your projects.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-y-4 w-full"
            >
              <div className="flex flex-col gap-y-1">
                <label htmlFor="email" className="text-primary-text">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Example@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  ref={errorEmail}
                  className="border border-slate-600 p-2 rounded-lg"
                />
                {validEmail && errorEmail.current.value === null | errorEmail.current.value === "" ? <p>please fill this</p>: null}
              </div>
              <div className="flex flex-col gap-y-1">
                <label htmlFor="password" className="text-primary-text">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  minLength={8}
                  onChange={(e) => setPassword(e.target.value)}
                  ref={errorPassword}
                  className="border border-slate-600 p-2 rounded-lg"
                />
                {validPass && errorPassword.current.value === null | errorPassword.current.value === "" ? <p>Harap di isi</p>: null}
                {validPass && errorPassword.current.value != 0 && errorPassword.current.value.length < 8 ? <p>at least 8 character</p>:null}
              </div>
              <Link href={"/"} className="text-link self-end">
                Forgot Password
              </Link>
              <button
                type="submit"
                className="bg-[#162D3A] px-3 py-2 rounded-md w-full text-white"
              >
                Log in
              </button>
              {/* <button
          type="button"
          onClick={() => signOut()}
          className="bg-slate-600 px-3 py-2 text-white rounded-md w-full"
        >
          Log out
        </button>
        <button
          type="button"
          onClick={() => signIn("google")}
          className="bg-slate-600 px-3 py-2 text-white rounded-md w-full"
        >
          Login with Google
        </button>
        <button
          type="button"
          onClick={() => signIn("github")}
          className="bg-slate-600 px-3 py-2 text-white rounded-md w-full"
        >
          Login with Github
        </button> */}
            </form>
            <div className="pt-2 flex justify-center items-center gap-x-2">
              <p className="text-secondary-text">Don't you have ann account?</p>
              <Link href={"/register"} className="text-link">
                Sign Up
              </Link>
            </div>
          </div>
        </main>
        <footer className="flex justify-center p-8 mt-2 text-sm text-[#959CB6] xl:p-0 xl:mt-0">
          <p>© 2023 ALL RIGHTS RESERVED</p>
        </footer>
      </div>
    </div>
  );
}
