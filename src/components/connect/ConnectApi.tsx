import {
  AppSection,
  AppSectionHeader,
  AppSectionBody,
  AppSectionItem,
  AppSectionSubTitle,
  AppURL,
} from "../ui";

interface ConnectApiProps {
  curlCommand: string;
  apiResponse: string;
}

export function ConnectApi({
  curlCommand,
}: ConnectApiProps) {
  return (
    <AppSection>
      <AppSectionHeader>
        API
      </AppSectionHeader>

      <AppSectionBody>
        <AppSectionItem>
          <AppSectionSubTitle>
            cURL Command
          </AppSectionSubTitle>

          <AppURL
            url={curlCommand}
            onCopy={() => {
              navigator.clipboard.writeText(curlCommand);
            }}
          />
        </AppSectionItem>
      </AppSectionBody>
    </AppSection>
  );
}
