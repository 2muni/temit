// create cookie by json
export function createCookie(name, json) {
  document.cookie = `${name}=` + btoa(JSON.stringify(json))
}

// get cookie by name
export function getCookie(name) {
  const value = "; " + document.cookie; 
  let parts = value.split("; " + name + "="); 
  if (parts.length === 2) return parts.pop().split(";").shift();
}

export function getToken() {
  let token = document.head.querySelector('meta[name="csrf-token"]');

  if (token) {
    return token.content;
  } else {
    console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
  }
}