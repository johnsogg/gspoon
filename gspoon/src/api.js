// hard-coded auth string. Unclear how to prevent studious users from 
// accessing this, and since there's not a login procedure, this
//  AFAIK has to be here.
const auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxMDY2OGJkLTlhZmQtNDBhNi1iZTZhLTEzMDFjZjNhNDVmNCIsIm5hbWUiOiJHYWJlIEpvaG5zb24ifQ.0JUi-7llYXbAi0GlAUwSdNW7KrO6FanroGMnkcH6SqY';
const url = 'https://check-api.herokuapp.com';

const makeUrl = (path) => {
    return url + path;
}

// getObject uses our auth key to issue a GET request on the API.  
// It returns a promise of the JSON from the server. 
export function getObject(path) {
    return fetch(makeUrl(path), {
        headers: {
            'Authorization': auth
        },
        method: 'GET'
        }).then(response => response.json());
}

// postData uses our auth key to issue a POST request on the api, 
// and sends the given object as the message body. It returns a
// promise of the JSON from the server.
export function postData(path, msg) {
    return fetch(makeUrl(path), {
        headers: {
            'Authorization': auth,
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(msg),
        }).then(response => response.json());
}

// putData is just like postData except it uses PUT instead.
export function putData(path, msg) {
    return fetch(makeUrl(path), {
        headers: {
            'Authorization': auth,
            'content-type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(msg),
        }).then(response => response.json());
}
