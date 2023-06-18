export const BASE_URL = 'https://auth.nomoreparties.co';

function makeRequest(url, method, body, token) {
  const options = {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  }

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (token) {
    options.headers.authorization = `Bearer ${token}`;
  }

  return fetch(`${BASE_URL}${url}`, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`Ошибка. Код ошибки: ${response.status}`);
    })
}


export const register = (email, password) => {
  return makeRequest(
    "/signup",
    "POST",
    { email, password },
    null
  );
}

export const authorize = (email, password) => {
  return makeRequest(
    "/signin",
    "POST",
    { email, password },
    null
  );
}

export const getUserData = (token) => {
  return makeRequest(
    "/users/me",
    "GET",
    null,
    token
  );
}