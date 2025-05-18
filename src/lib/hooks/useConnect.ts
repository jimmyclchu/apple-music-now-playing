import { useState, useEffect } from "react";
import { UseConnectReturn, Size, Color, FileType } from "../types";

export function useConnect(): UseConnectReturn {
  const [activeSize, setActiveSize] = useState<Size>(Size.Banner);
  const [activeColor, setActiveColor] = useState<Color>(Color.Light);
  const [activeFileType, setActiveFileType] = useState<FileType>(FileType.SVG);
  const [showForm, setShowForm] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const baseURL = "https://now-playing.jimmyclchu.com"
  const apiEndpoint = `${baseURL}/w/sdfj53evJ_m6`;
  const curlCommand = `curl \"${baseURL}/api/connection/sdfj53evJ_m6/recent-played"\
  `;
  const apiResponse = `{
  "success": true,
  "error-codes": [],
  "challenge_ts": "2022-10-06T00:07:23.274Z",
  "hostname": "example.com",
  "hostname": "example.com",
  "hostname": "example.com",
  "hostname": "example.com",
  "hostname": "example.com",
  "hostname": "example.com"
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(curlCommand);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResponse("Connected!");
      setIsLoading(false);
      setShowForm(false);
    }, 0);
  };

  // Load saved preferences on mount
  useEffect(() => {
    const savedSize = sessionStorage.getItem('activeSize');
    const savedColor = sessionStorage.getItem('activeColor');
    const savedFileType = sessionStorage.getItem('activeFileType');

    if (savedSize) setActiveSize(savedSize as Size);
    if (savedColor) setActiveColor(savedColor as Color);
    if (savedFileType) setActiveFileType(savedFileType as FileType);
  }, []);

  // Save preferences when they change
  useEffect(() => {
    sessionStorage.setItem('activeSize', activeSize);
  }, [activeSize]);

  useEffect(() => {
    sessionStorage.setItem('activeColor', activeColor);
  }, [activeColor]);

  useEffect(() => {
    sessionStorage.setItem('activeFileType', activeFileType);
  }, [activeFileType]);

  return {
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
    copySuccess,
    setActiveSize,
    setActiveColor,
    setActiveFileType,
    setInputValue,
    handleConnect,
    handleCopy,
  };
}
