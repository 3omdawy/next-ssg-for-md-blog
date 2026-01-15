"use client";

import { useEffect } from "react";

/**
 * Global Error Boundary Component
 * Catches runtime errors in the application and displays a fallback UI
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred while complying with
        your request.
      </p>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium"
      >
        Try again
      </button>
    </div>
  );
}
