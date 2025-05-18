import { Color, FileType, Size } from "@/lib/types";
import {
  AppSection,
  AppSectionHeader,
  AppSectionBody,
  AppSectionItem,
  AppSectionSubTitle,
  AppURL,
  AppControlList,
  AppControlItem,
  AppPreviewWidget
} from "../ui";

interface ConnectWidgetProps {
  activeSize: Size;
  activeColor: Color;
  activeFileType: FileType;
  onSizeChange: (size: Size) => void;
  onColorChange: (color: Color) => void;
  onFileTypeChange: (fileType: FileType) => void;
  apiEndpoint: string;
}

export function ConnectWidget({
  activeSize,
  activeColor,
  activeFileType,
  onSizeChange,
  onColorChange,
  onFileTypeChange,
  apiEndpoint,
}: ConnectWidgetProps) {
  return (
    <AppSection>
      <AppSectionHeader>
        Widget
      </AppSectionHeader>

      <AppSectionBody>
        <AppControlList>
          <AppControlItem
            header="Size"
            enum={Size}
            selectedValue={activeSize}
            onSelect={(value) => onSizeChange(value as Size)}
          />

          <AppControlItem
            header="Color"
            enum={Color}
            selectedValue={activeColor}
            onSelect={(value) => onColorChange(value as Color)}
          />

          <AppControlItem
            header="File Type"
            enum={FileType}
            selectedValue={activeFileType}
            onSelect={(value) => onFileTypeChange(value as FileType)}
          />
        </AppControlList>

        <AppSectionItem>
          <AppSectionSubTitle>
            Image URL
          </AppSectionSubTitle>
          <AppURL
            url={apiEndpoint}
            onCopy={() => {
              navigator.clipboard.writeText(apiEndpoint);
            }}
          />
        </AppSectionItem>

        <AppSectionItem>
          <AppPreviewWidget 
            size={activeSize}
            color={activeColor}
            fileType={activeFileType}
          />
        </AppSectionItem>
      </AppSectionBody>
    </AppSection>
  );
}
