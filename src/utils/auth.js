export function isLoggedIn() {
  const token = localStorage.getItem("token");
  return !!token; // true if token exists, false if not
}
