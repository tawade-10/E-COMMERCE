import React from "react";

const Spinners = () => {
  return (
    <React.Fragment>
      <div>
        <button
          type="button"
          className="flex flex-cols-4 justify-center"
          disabled
        >
          <svg
            className="mr-3 size-5 animate-spin" // Apply the 'animate-spin' class here
            viewBox="0 0 24 24"
            style={{
              animation: "spin 1s linear infinite", // Inline style for the animation
            }}
          >
            {/* You'll need to add a path or other SVG content to make the spinner visible */}
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Processing…
        </button>
      </div>
    </React.Fragment>
  );
};

export default Spinners;
