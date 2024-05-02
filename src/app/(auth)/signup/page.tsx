"use client";

import localFont from "next/font/local";
import toast from "react-hot-toast";
import styles from "./page.module.scss";
import Image from "next/image";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import FormWrap from "@/components/form/FormWrap";
import SignupForm from "./SignupForm";

const SignUpPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const router = useRouter();

  const onSignUp = async () => {
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/signin");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    // <div>
    //   <label htmlFor="username">Username: </label>
    //   <input
    //     type="text"
    //     id="username"
    //     value={user.username}
    //     onChange={(e) => {
    //       setUser({ ...user, username: e.target.value });
    //     }}
    //     placeholder="username"
    //   />
    //   <label htmlFor="email">Email: </label>
    //   <input
    //     type="email"
    //     id="email"
    //     value={user.email}
    //     onChange={(e) => {
    //       setUser({ ...user, email: e.target.value });
    //     }}
    //     placeholder="email"
    //   />
    //   <label htmlFor="password">Password: </label>
    //   <input
    //     type="password"
    //     id="password"
    //     value={user.password}
    //     onChange={(e) => {
    //       setUser({ ...user, password: e.target.value });
    //     }}
    //     placeholder="password"
    //   />
    //   <button onClick={onSignUp}>Sign Up</button>
    // </div>
    <FormWrap>
      <SignupForm />
    </FormWrap>
  );
};

export default SignUpPage;
