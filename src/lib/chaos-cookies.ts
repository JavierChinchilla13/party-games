/**
 * Helpers para manejar la cookie del Modo Caos.
 * Usamos cookies para que persista entre recargas y sea accesible en el servidor.
 */

const CHAOS_COOKIE_NAME = "oni-games-chaos-mode";

export function setChaosCookie(enabled: boolean) {
  if (typeof document === "undefined") return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 año
  
  document.cookie = `${CHAOS_COOKIE_NAME}=${enabled};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
}

export function getChaosCookie(): boolean {
  if (typeof document === "undefined") return false;
  
  const name = CHAOS_COOKIE_NAME + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length) === "true";
    }
  }
  return false;
}
