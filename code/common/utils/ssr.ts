export const addBaseUrl = (path = '', isServer = false) => {
  return isServer ? `http://localhost:3000${path}` : `http://localhost:3000${path}`;
};
