"use client";
import React, { useState } from "react";
import InputAuth from "@/components/InputAuth";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";

export default function Login() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fetchApi = await axios.post("https://mongo-ngaos.vercel.app/login", {
      email,
      password,
    });
    console.log(email);
    console.log(password);
    console.log(fetchApi.data);
    console.log(session);

    signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    }).then((res) => {
      if (res.error) {
        console.log(res.error);
      }
      if (!res.error) {
        if (session?.user?.token) {
          alert("login sukses");
          let token = session.user.token;
          localStorage.setItem("token", token);
          console.log(token);
          // router.push("/");
        } else {
          console.log("Token not found in the session.");
          console.log("Session object:", session);
          console.log("User token:", session?.user?.token);
        }
      }
    });
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-blue-200 p-4 flex flex-col gap-y-4 items-center mt-20 w-1/4 mx-auto"
    >
      <h1>Log in</h1>
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
      <button
        type="submit"
        className="bg-slate-600 px-3 py-2 text-white rounded-md w-full"
      >
        Log in
      </button>
    </form>
  );
}
