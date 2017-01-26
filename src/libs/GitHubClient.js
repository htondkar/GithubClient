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

// basic = new Buffer(this.auth.username + ":" + this.auth.password, "ascii").toString("base64");
                    // headers["Authorization"] = "Basic " + basic;
class GitHubClient {
  constructor({baseUri, token, ContentType = "application/json", username, password}, ...features) {
    this.baseUri = baseUri;
    if ((username && password) && username.length !== 0 && password.length !== 0) {
      const basic = new Buffer(username + ":" + password, "ascii").toString("base64")
      this.credentials = `basic ${basic}`;
    } else {
      this.credentials = token !== null && token.length > 0 ? "token" + ' ' + token : null;
    }
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


// Set an authentication method to have access to protected resources.
//      *
//      *  ##### Example
//      *
//      *      // basic
//      *      github.authenticate({
//      *          type: "basic",
//      *          username: "mikedeboertest",
//      *          password: "test1324"
//      *      });
//      *
//      *      // oauth
//      *      github.authenticate({
//      *          type: "oauth",
//      *          token: "e5a4a27487c26e571892846366de023349321a73"
//      *      });
//      *
//      *      // oauth key/secret
//      *      github.authenticate({
//      *          type: "oauth",
//      *          key: "clientID",
//      *          secret: "clientSecret"
//      *      });
//      *
//      *      // user token
//      *      github.authenticate({
//      *          type: "token",
//      *          token: "userToken",
//      *      });
//      *
//      *      // integration (jwt)
//      *      github.authenticate({
//      *          type: "integration",
//      *          token: "jwt",
//      *      });
//      **/
