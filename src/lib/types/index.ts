export enum Size {
  Banner = "banner",
  Square = "square",
}

export enum Color {
  Light = "light",
  Dark = "dark",
}

export enum FileType {
  SVG = "svg",
}

export interface PreviewAreaProps {
  activeSize: Size;
  activeColor: Color;
  activeFileType: FileType;
  setActiveSize: (size: Size) => void;
  setActiveColor: (color: Color) => void;
  setActiveFileType: (type: FileType) => void;
  showForm: boolean;
}

export interface SizeControlProps {
  activeSize: Size;
  onSizeChange: (size: Size) => void;
}

export interface ColorControlProps {
  activeColor: Color;
  onColorChange: (color: Color) => void;
}

export interface FileTypeControlProps {
  activeFileType: FileType;
  onFileTypeChange: (type: FileType) => void;
}

export interface UseConnectReturn {
  activeSize: Size;
  activeColor: Color;
  activeFileType: FileType;
  showForm: boolean;
  inputValue: string;
  isLoading: boolean;
  response: string | null;
  apiEndpoint: string;
  curlCommand: string;
  apiResponse: string;
  copySuccess: boolean;
  setActiveSize: (size: Size) => void;
  setActiveColor: (color: Color) => void;
  setActiveFileType: (type: FileType) => void;
  setInputValue: (value: string) => void;
  handleConnect: (e: React.FormEvent) => Promise<void>;
  handleCopy: () => Promise<void>;
}
