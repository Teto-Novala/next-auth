"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export default function page() {
  const session = useSession({});
  let token = session?.data?.user?.token;
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://mongo-ngaos.vercel.app/whoami", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.data;
      console.log(data);
    };
    fetchData();
  }, []);
  return <div>About</div>;
}
