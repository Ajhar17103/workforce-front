'use client';

import { Toast } from '@/common/messages/toast';
import { getAuthApiUrl } from '@/utils/api';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type SignInFormData = {
  email: string;
  password: string;
};

type SignInProps = {
  onLogin?: () => void;
};

export default function SignIn({ onLogin }: SignInProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: 'test@gmail.com',
      password: 'inc@rrEc1',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const authUrl = getAuthApiUrl('/login');

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    axios
      .post(authUrl, data)
      .then((response) => {
        console.log(response);
        reset();
        localStorage.setItem('access_token', response.data.accessToken);
        localStorage.setItem('refresh_token', response.data.refreshToken);
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('status', 'ISIN');
        window.location.reload();
      })
      .catch((error) => {
        Toast({
          message: 'Something went wrong!',
          type: 'error',
          autoClose: 1500,
          theme: 'colored',
        });
        console.error(error);
      });
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column">
      <div className="row flex-grow-1">
        {/* Left Side Image - moves below form on small screens */}
        <div className="col-12 col-lg-7 d-none d-lg-block order-2 order-lg-1 p-0">
          <div
            className="w-100 h-100 position-relative"
            style={{ minHeight: '250px' }}
          >
            <Image
              src="/images/auth-1.jpg"
              alt="Login illustration"
              fill
              className="object-fit-cover"
              priority
            />
          </div>
        </div>

        {/* Right Side Form */}
        <div className="col-12 col-lg-5 d-flex align-items-center justify-content-center order-1 order-lg-2 p-4">
          <div className="w-100" style={{ maxWidth: '400px' }}>
            <div className="mb-4 text-center">
              <h3 className="fw-semibold">Sign In</h3>
              <p className="text-muted mb-0">
                Enter your email and password to sign in!
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-medium">
                  Email <span className="text-danger">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="info@gmail.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-medium">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                    className={`form-control ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-white border-start-0"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <i className="bi bi-eye" />
                    ) : (
                      <i className="bi bi-eye-slash" />
                    )}
                  </button>
                  {errors.password && (
                    <div className="invalid-feedback d-block">
                      {errors.password.message}
                    </div>
                  )}
                </div>
              </div>

              {/* Forgot Password */}
              <div className="d-flex justify-content-end mb-3">
                <Link href="#" className="small text-decoration-none">
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
