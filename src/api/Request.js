import { objToQuerystring } from '../utils';

class Request {
  constructor(url) {
    this.url = url;
  }

  get(uriParams, option, query) {
    return new Promise((resolve, reject) => {
      const URL = query ? `${this.url}/${uriParams}` : `${this.url}/${uriParams}${objToQuerystring(query)}`;
      fetch(URL, option)
        .then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  post(uriParams, option) {
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/${uriParams}`, {
        method: option.method ? option.method : 'POST',
        headers: option.headers || { 'Content-Type': 'application/json' },
        body: JSON.stringify(option.body)
      }).then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  put(uriParams, body) {
    return this.post(uriParams, body, true, null);
  }

  postFile(uriParams, files) {
    const formData = new FormData();
    for (const file of files) {
      formData.append('img', file);
    }
    return new Promise((resolve, reject) => {
      fetch(`${this.url}/${uriParams}`, {
        method: 'POST',
        body: formData,
      }).then(res => res.json())
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}

export default Request;