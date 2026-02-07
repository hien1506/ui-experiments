"use client";

import { Component, ReactNode, useState, useCallback } from "react";

// Error Boundary
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ShowcaseErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  reset = () => {
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-4 text-center">
            <div className="rounded-full bg-red-900/30 p-3">
              <svg
                className="h-6 w-6 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <p className="text-sm text-neutral-400">Component error</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                this.reset();
              }}
              className="rounded-lg bg-neutral-800 px-3 py-1.5 text-xs font-medium  text-neutral-300 transition-colors hover:bg-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              aria-label="Retry loading component"
            >
              Retry
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

// Wrapper Props
interface ShowcaseWrapperProps {
  children: ReactNode;
  showResetButton?: boolean;
  onReset?: () => void;
}

export function ShowcaseWrapper({
  children,
  showResetButton = false,
  onReset,
}: ShowcaseWrapperProps) {
  const [resetKey, setResetKey] = useState(0);

  const handleReset = useCallback(() => {
    setResetKey((k) => k + 1);
    onReset?.();
  }, [onReset]);

  return (
    <div className="relative h-full w-full">
      <ShowcaseErrorBoundary key={resetKey} onReset={handleReset}>
        {children}
      </ShowcaseErrorBoundary>

      {showResetButton && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
          }}
          className="absolute right-3 top-3 rounded-lg bg-neutral-800/80 p-2 text-neutral-400 backdrop-blur-sm transition-colors hover:bg-neutral-700/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
          aria-label="Reset component"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
