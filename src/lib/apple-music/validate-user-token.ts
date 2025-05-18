export function validateUserToken(token: string) {
  // check if the token is a valid uuid
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(token)) {
    return false;
  }
  return true;
}
