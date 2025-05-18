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
  apiResponse,
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

        <AppSectionItem>
          <AppSectionSubTitle>
            API Response
          </AppSectionSubTitle>
          <pre className="whitespace-pre-wrap break-words">
            {apiResponse}
          </pre>
        </AppSectionItem>
      </AppSectionBody>
    </AppSection>
  );
}
