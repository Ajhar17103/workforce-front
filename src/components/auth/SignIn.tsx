"use client";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SignInFormData = {
  email: string;
  password: string;
};

export default function SignIn() {

  const {register,handleSubmit,formState: { errors },} = useForm <SignInFormData>(
   { defaultValues:{
      email:'info@gmail.com',
      password:'abc12345678'
    }
  }
  );
  const [showPassword, setShowPassword] = useState(false);

 const onSubmit = (data: SignInFormData) => {
    console.log(data)
    window.location.reload()
    localStorage.setItem('isLogin', 'true')
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-2/3 h-full relative">
        <Image
          src="/images/auth-1.jpg"
          alt="Login illustration"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/3 items-center justify-center">
        
     <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <div className="mb-5 sm:mb-8">
        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
          Sign In
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Enter your email and password to sign in!
        </p>
      </div>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-white">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          placeholder="info@gmail.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email address",
            },
          })}
          className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-white">
          Password <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 dark:text-gray-300"
          >
            {showPassword ? <EyeIcon /> : <EyeCloseIcon />}
          </span>
        </div>
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-end">
        <Link
          href="#"
          className="text-sm text-brand-500 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Submit */}
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-semibold text-white bg-brand-500 rounded-md hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-400 dark:bg-brand-600 dark:hover:bg-brand-500"
        >
          Sign In
        </button>
      </div>
    </form>
    </div>

      </div>
    </div>
  );
}
