/* export const BASE_URL = 'http://localhost:3000'; */
export const BASE_URL = 'https://api.mesto.igor-palych.nomoredomains.rocks';

export const configApi = {
  url: BASE_URL,
  headers: {
    'Content-type': 'application/json',
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
}
