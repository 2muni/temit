// create cookie by json
export function createCookie(name, json) {
  document.cookie = `${name}=${btoa(JSON.stringify(json))}; path=/;`
}

// get cookie by name
export function getCookie(name) {
  const value = "; " + document.cookie; 
  let parts = value.split("; " + name + "="); 
  if (parts.length === 2) return JSON.parse(atob(parts.pop().split(";").shift()));
}