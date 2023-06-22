export const configApi = {
  /* url: 'https://mesto.nomoreparties.co/v1/cohort-58', */
  url: 'http://localhost:3001',
  headers: {
    'Content-type': 'application/json',
    /* authorization: 'bed2d048-004a-4293-8e7d-f5ce02aae8c0' */
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
}
