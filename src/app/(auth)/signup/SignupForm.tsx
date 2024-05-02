"use client";
import Input from "@/components/inputs/Input";
import styles from "../signin/SiginForm.module.scss";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import localFont from "next/font/local";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const Bodoni = localFont({
  src: "../../../app/assets/fonts/Bodoni-24-Medium.ttf",
});

const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      return toast.error("Passwords must be the same");
    }
    setIsLoading(true);

    try {
      axios.post("/api/users/signup", data).then(() => {
        toast.success("Account created");
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/");
            router.refresh();
            toast.success("Logged In");
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      });
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles["form-section__wrap"]}>
        <div className={styles["header"]}>
          <h2
            className={`${Bodoni.className} ${styles.title} ${styles["font-4xl"]}`}
          >
            Create an Account
          </h2>
          <h3
            className={`${styles["fw-light"]} ${styles.caption} ${styles["font-sm"]}`}
          >
            Your Journey Starts Here – Sign Up for Exclusive Access
          </h3>
        </div>
        <form
          className={`${styles["form"]} ${styles["mt-7"]}`}
          action="/"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="name"
            label="Full Name"
            disabled={isLoading}
            register={register}
            errors={errors}
            placeholder="Enter your full name"
            required
          />
          <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            placeholder="Enter your email"
            type="email"
            required
          />
          <Input
            id="password"
            label="Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            placeholder="Enter your password"
            type="password"
            required
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            disabled={isLoading}
            register={register}
            errors={errors}
            placeholder="Confirm your password"
            type="password"
            required
          />
          <div
            className={`${styles["signup-options"]} ${styles["font-sm"]} ${styles["mt-2"]}`}
          >
            <div className={styles["remember-me"]}>
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me"> Remember me</label>
            </div>
            <a className={styles["hover-underline-animation"]} href="#">
              Forgot Password
            </a>
          </div>
          <div className={`${styles["btn-group"]} ${styles["mt-8"]}`}>
            <button className={styles.btn} type="submit">
              {isLoading ? "Loading..." : "Sign In"}
            </button>
            <button
              className={`${styles["btn-icon"]} ${styles["mt-2"]}`}
              type="button"
              onClick={() => {
                signIn("google", { redirect: true, callbackUrl: "/" });
              }}
            >
              <Image
                src="/img/google.svg"
                alt="google icon"
                width={25}
                height={25}
              />
              Continue with Google
            </button>
          </div>
        </form>
      </div>
      <div>
        <p
          className={`${styles["create-account"]} ${styles["mt-5"]} ${styles["font-sm"]}`}
        >
          Already have an account?{" "}
          <Link className={styles["hover-underline-animation"]} href="/signin">
            Sign Up
          </Link>
        </p>
        <p
          className={`${styles["create-account"]} ${styles["mt-1"]} ${styles["font-sm"]}`}
        >
          Back to home?{" "}
          <Link className={styles["hover-underline-animation"]} href="/">
            Click here
          </Link>
        </p>
      </div>
    </>
  );
};

export default SignupForm;
