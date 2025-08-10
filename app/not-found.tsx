// app/not-found.tsx
import Link from 'next/link';
// import ClientActions from './not-found.client';

export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center bg-light">
      <div className="text-center p-4" style={{ maxWidth: 900 }}>
        <h1 className="display-6 mb-3">404 — Page not found</h1>
        <p className="lead text-muted mb-4">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="d-flex gap-2 justify-content-center">
          <Link href="/" className="btn btn-primary">
            Go to Home
          </Link>
          {/* client-only back button */}
          {/* <ClientActions /> */}
        </div>

        <div className="mt-5 text-muted small">
          If you think this is an error, contact your administrator.
        </div>
      </div>
    </div>
  );
}
