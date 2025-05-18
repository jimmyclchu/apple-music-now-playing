"use client";

import React from "react";
import { ConnectForm } from "./ConnectForm";
import { useConnect } from "@/lib/hooks/useConnect";
import { ConnectWidget } from "./ConnectWidget";
import { ConnectApi } from "./ConnectApi";
import { ConnectLayout } from "./ConnectLayout";

export function Connect() {
  const {
    activeSize,
    activeColor,
    activeFileType,
    showForm,
    inputValue,
    isLoading,
    response,
    apiEndpoint,
    curlCommand,
    apiResponse,
    setActiveSize,
    setActiveColor,
    setActiveFileType,
    setInputValue,
    handleConnect,
  } = useConnect();

  return (
    <ConnectLayout showForm={showForm}>
      <ConnectWidget
        activeSize={activeSize}
        activeColor={activeColor}
        activeFileType={activeFileType}
        onSizeChange={setActiveSize}
        onColorChange={setActiveColor}
        onFileTypeChange={setActiveFileType}
        apiEndpoint={apiEndpoint}
      />

      <ConnectApi
        curlCommand={curlCommand}
        apiResponse={apiResponse}
      />

      {showForm && (
        <ConnectForm
          isLoading={isLoading}
          inputValue={inputValue}
          response={response}
          setInputValue={setInputValue}
          handleConnect={handleConnect}
        />
      )}
    </ConnectLayout>
  );
}