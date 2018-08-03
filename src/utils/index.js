export const objToQuerystring = obj => {
  let queryString = '?';
  for (const key in obj) {
    queryString += `${key}=${obj[key]}&`;
  }
  queryString = queryString.substr(0, queryString.length - 1);
  return queryString;
};