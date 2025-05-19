export const getSiteKey = (
  isAlwaysPass: boolean = true,
  isVisible: boolean = true
): string => {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string;
  }

  if (isAlwaysPass && isVisible) {
    return "1x00000000000000000000AA";
  }

  if (isAlwaysPass && !isVisible) {
    return "1x00000000000000000000BB";
  }

  if (!isAlwaysPass && isVisible) {
    return "2x00000000000000000000AB";
  }

  if (!isAlwaysPass && !isVisible) {
    return "2x00000000000000000000BB";
  }

  return "";
};

export const getSecretKey = (
  isAlwaysPass: boolean = true
): string => {
  if (process.env.NODE_ENV === "production") {
    return process.env.TURNSTILE_SECRET_KEY as string;
  }

  if (isAlwaysPass) {
    return "1x0000000000000000000000000000000AA";
  }
  
  if (!isAlwaysPass) {
    return "2x0000000000000000000000000000000AA";
  }

  return "";
};
