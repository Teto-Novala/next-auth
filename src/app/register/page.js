"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://mongo-ngaos.vercel.app/register",
        {
          name,
          email,
          password,
          //   phone,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!res.error) {
        alert("Registration successful!");
        console.log(res.data);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.data.message === "Email already Exist") {
        alert("udah ada");
      }
      if (error.response.data.message === "Email and password is required") {
        alert("harus di isi");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-200 p-4 flex flex-col gap-y-4 items-center mt-20 w-1/4 mx-auto"
    >
      <h1>Register</h1>
      <div>
        <input
          type="text"
          placeholder="your name"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="email"
          placeholder="your email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {/* <div>
        <input
          type="text"
          placeholder="your name"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div> */}
      <button
        type="submit"
        className="bg-slate-600 px-3 py-2 text-white rounded-md w-full"
      >
        Register
      </button>
    </form>
  );
}
