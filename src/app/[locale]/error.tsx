"use client";

import { useEffect } from "react";

import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations("errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#fef7ed", // orange-50 equivalent
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "48px 32px",
          textAlign: "center",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          border: "1px solid #fed7aa", // orange-200 equivalent
        }}
      >
        {/* Error Icon */}
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#ffedd5", // orange-100 equivalent
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px auto",
            border: "2px solid #fed7aa", // orange-200 equivalent
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ea580c" // orange-600 equivalent
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        {/* Error Title */}
        <h1
          style={{
            fontSize: "28px",
            fontWeight: "700",
            color: "#1f2937", // gray-800 equivalent
            marginBottom: "16px",
            lineHeight: "1.2",
          }}
        >
          {t("globalTitle")}
        </h1>

        {/* Error Description */}
        <p
          style={{
            fontSize: "16px",
            color: "#6b7280", // gray-500 equivalent
            marginBottom: "32px",
            lineHeight: "1.6",
            maxWidth: "400px",
            margin: "0 auto 32px auto",
          }}
        >
          {t("globalDescription")}
        </p>

        {/* Error Details (if in development) */}
        {process.env.NODE_ENV === "development" && (
          <div
            style={{
              backgroundColor: "#fef7ed", // orange-50 equivalent
              border: "1px solid #fed7aa", // orange-200 equivalent
              borderRadius: "8px",
              padding: "16px",
              marginBottom: "32px",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#ea580c", // orange-600 equivalent
                marginBottom: "8px",
              }}
            >
              Error Details (Development Only):
            </p>
            <code
              style={{
                fontSize: "12px",
                color: "#7c2d12", // orange-800 equivalent
                fontFamily: "Monaco, Consolas, monospace",
                wordBreak: "break-word",
              }}
            >
              {error.message}
            </code>
          </div>
        )}

        {/* Shadcn-style Button */}
        <button
          onClick={() => reset()}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "500",
            height: "40px",
            paddingLeft: "16px",
            paddingRight: "16px",
            backgroundColor: "#ea580c", // orange-600 equivalent
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s ease-in-out",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            outline: "none",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#dc2626"; // orange-700 equivalent
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#ea580c";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
          }}
          onFocus={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 2px #fed7aa"; // orange-200 equivalent
          }}
          onBlur={(e) => {
            e.currentTarget.style.boxShadow = "0 1px 2px 0 rgba(0, 0, 0, 0.05)";
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "8px", marginLeft: "8px" }}
          >
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
            <path d="M3 21v-5h5" />
          </svg>{" "}
          {t("retryButton")}{" "}
        </button>
      </div>
    </div>
  );
}
