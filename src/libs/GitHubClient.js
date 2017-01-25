/**
 * GitHubClient
 *
 * Dependencies: node-fetch https://github.com/bitinn/node-fetch
 *
 */

class HttpException extends Error {
  constructor({message, status, statusText, url}) {
    super(message);
    this.status = status;
    this.statusText = statusText;
    this.url = url;
  }
}

class GitHubClient {
  constructor({baseUri, token, ContentType = "application/json"}, ...features) {
    this.baseUri = baseUri;
    this.credentials = token !== null && token.length > 0 ? "token" + ' ' + token : null;
    this.headers = {
      "Content-Type": ContentType,
      "Accept": "application/vnd.github.v3.full+json",
      "Authorization": this.credentials
    };
    return Object.assign(this, ...features);
  }

  callGitHubAPI({method, path, data}) {
    let _response = {};
    return fetch(this.baseUri + path, {
      method: method,
      headers: this.headers,
      body: data!==null ? JSON.stringify(data) : null
    })
    .then(response => {
      console.log(response);
      _response = response;
      // if response is ok transform response.text to json object
      // else throw error
      if (response.ok) {
        if (response.status == 204) {
          return response.ok;
        }
        return response.json();
      } else {
        throw new HttpException({
          message: `HttpException[${method}]`,
          status:response.status,
          statusText:response.statusText,
          url: response.url
        });
      }
    })
    .then(jsonData => {
      _response.data = jsonData;
      return _response;
    })

  }

  getData({path}) {
    return this.callGitHubAPI({method:'GET', path, data:null});
  }

  deleteData({path}) {
    return this.callGitHubAPI({method:'DELETE', path, data:null});
  }

  postData({path, data}) {
    return this.callGitHubAPI({method:'POST', path, data});
  }

  putData({path, data}) {
    return this.callGitHubAPI({method:'PUT', path, data});
  }
}

export default GitHubClient;
