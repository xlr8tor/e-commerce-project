"use client";
import Input from "@/components/inputs/Input";
import styles from "./SiginForm.module.scss";
import Image from "next/image";
import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import localFont from "next/font/local";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { SafeUser } from "@/types/types";

const Bodoni = localFont({
  src: "../../../app/assets/fonts/Bodoni-24-Medium.ttf",
});

interface SigninFormProps {
  currentUser: SafeUser | null;
}

const SigninForm: React.FC<SigninFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/signin",
    }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        router.push("/");
        router.refresh();
        toast.success("Logged In");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  return (
    <>
      <div className={styles["form-section__wrap"]}>
        <div className={styles["header"]}>
          <h2
            className={`${Bodoni.className} ${styles.title} ${styles["font-4xl"]}`}
          >
            Welcome Back
          </h2>
          <h3
            className={`${styles["fw-light"]} ${styles.caption} ${styles["font-sm"]}`}
          >
            Enter your email and password to access your account
          </h3>
        </div>
        <form
          className={`${styles["form"]} ${styles["mt-7"]}`}
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            id="email"
            label="Email"
            disabled={isLoading}
            register={register}
            errors={errors}
            placeholder="Enter your email"
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
              Sign In with Google
            </button>
          </div>
        </form>
      </div>
      <div>
        <p
          className={`${styles["create-account"]} ${styles["mt-5"]} ${styles["font-sm"]}`}
        >
          Don&rsquo;t have an account?{" "}
          <Link className={styles["hover-underline-animation"]} href="/signup">
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

export default SigninForm;
