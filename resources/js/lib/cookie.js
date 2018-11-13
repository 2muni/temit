// create cookie by json
export function createCookie(name, json) {
  document.cookie = `${name}=${btoa(unescape(encodeURIComponent(JSON.stringify(json))))}; path=/;`
}

// get cookie by name
function getCookieData(name) {
  const value = "; " + document.cookie; 
  let parts = value.split("; " + name + "="); 
  if (parts.length === 2) return JSON.parse(atob(parts.pop().split(";").shift()));
}

export function getCookie(name) {
  const cookie = getCookieData(name);
  if(typeof cookie === "undefined") return;
  else return cookie
}