export function readBrowserCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((s) => s.trim())
    .find((s) => s.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : "";
}
