"use client";

import { useActionState, useEffect } from "react";
import { uploadAndEmbedFile } from "@/app/lib/actions/embedding";
import { useState } from "react";

export default function FormUploadFile({
  setShowModal,
}: {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // Init
  const initialState: any = {
    message: "",
    error: "",
    success: false,
  };

  // Action
  const [state, handleSubmit, isPending] = useActionState(
    uploadAndEmbedFile,
    initialState
  );

  // States
  const [clientError, setClientError] = useState<string | null>(null);

  // Effect dependency state
  useEffect(() => {
    if (state?.success) {
      setShowModal(false);
      // toast removed
    }
  }, [state]);

  //
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setClientError(null); // Reset errors

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB Limit
        setClientError("File is too large. Max size is 5MB.");
        e.target.value = ""; // Clear the input
      }
    }
  };

  return (
    <form
      data-loading={isPending}
      action={handleSubmit}
      className="flex flex-col gap-6 rounded-xl bg-black border border-white/30 p-6 shadow-sm"
      noValidate
    >
      {/* File Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Upload File</label>

        <div className="relative w-full">
          <input
            type="file"
            name="file"
            accept=".pdf,.txt,.md"
            required
            onChange={handleFileChange}
            className="
          block w-full cursor-pointer rounded-lg border bg-white/80
          px-4 py-3 text-sm text-gray-700
          file:border-0 file:bg-black file:text-white file:px-4 file:py-2
          file:rounded-md file:font-medium file:cursor-pointer
          hover:file:bg-gray-800
        "
          />
        </div>

        <p className="text-xs text-gray-500">
          Max 5MB · This will be added to your AI knowledge base.
        </p>
      </div>

      {/* Errors / Success */}
      {clientError && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-200">
          {clientError}
        </p>
      )}

      {state?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-200">
          Error: {state.error}
        </p>
      )}

      {state?.success && (
        <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700 border border-green-200">
          {state.message}
        </p>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isPending}
          className={`cursor-pointer w-full rounded-lg bg-emerald-700 px-6 py-3 text-white text-sm font-semibold hover:bg-emerald-600 transition 
        ${isPending ? "opacity-60 cursor-wait" : ""}
      `}
        >
          {isPending ? "Uploading & Embedding..." : "Upload Knowledge"}
        </button>
      </div>
    </form>
  );
}
