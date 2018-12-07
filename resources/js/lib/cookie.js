// create cookie by json
export function createCookie(name, json) {
  document.cookie = `${name}=${unescape(encodeURIComponent(JSON.stringify(json)))}; path=/;`
}

// get cookie by name
export function getCookie(name) {
  const value = "; " + document.cookie; 
  let parts = value.split("; " + name + "="); 
  if (parts.length === 2) return JSON.parse(parts.pop().split(";").shift());
}