export const localSet = (key, object) => {
  return localStorage.setItem(key, JSON.stringify(object));
};

export const localGet = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
