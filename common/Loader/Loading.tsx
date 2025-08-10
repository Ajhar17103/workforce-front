'use client';

import React from 'react';

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
}

export default function Loadgin({ message = 'Loading...', fullScreen = false }: LoaderProps) {
  return fullScreen ? (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <svg
        aria-hidden="true"
        className="animate-spin"
        style={{ width: 48, height: 48, color: '#0d6efd' }}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.59c0 27.61-22.39 50-50 50s-50-22.39-50-50 22.39-50 50-50 50 22.39 50 50z"
          fill="#e5e7eb"
        />
        <path
          d="M93.967 39.04c2.54 4.35 3.18 9.65 1.66 14.46-1.52 4.8-5.18 8.65-9.91 10.09-4.73 1.44-10.07.69-14.34-2.04a12.57 12.57 0 01-4.36-4.4c-1.6-2.42-2.25-5.33-1.84-8.16.4-2.83 1.92-5.43 4.17-7.06 2.24-1.62 5.18-2.22 8.02-1.68 2.83.54 5.44 2.14 7.06 4.42z"
          fill="#0d6efd"
        />
      </svg>
      <span style={{ marginTop: 16, fontSize: 18, color: '#0d6efd' }}>{message}</span>
    </div>
  ) : (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="d-flex align-items-center gap-2"
    >
      <svg
        aria-hidden="true"
        className="animate-spin"
        style={{ width: 20, height: 20, color: '#0d6efd' }}
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.59c0 27.61-22.39 50-50 50s-50-22.39-50-50 22.39-50 50-50 50 22.39 50 50z"
          fill="#e5e7eb"
        />
        <path
          d="M93.967 39.04c2.54 4.35 3.18 9.65 1.66 14.46-1.52 4.8-5.18 8.65-9.91 10.09-4.73 1.44-10.07.69-14.34-2.04a12.57 12.57 0 01-4.36-4.4c-1.6-2.42-2.25-5.33-1.84-8.16.4-2.83 1.92-5.43 4.17-7.06 2.24-1.62 5.18-2.22 8.02-1.68 2.83.54 5.44 2.14 7.06 4.42z"
          fill="#0d6efd"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}
