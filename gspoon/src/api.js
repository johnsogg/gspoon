const auth = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImIxMDY2OGJkLTlhZmQtNDBhNi1iZTZhLTEzMDFjZjNhNDVmNCIsIm5hbWUiOiJHYWJlIEpvaG5zb24ifQ.0JUi-7llYXbAi0GlAUwSdNW7KrO6FanroGMnkcH6SqY';
const url = 'https://check-api.herokuapp.com';

const makeUrl = (path) => {
    return url + path;
}

export function getList(path) {
    return fetch(makeUrl(path), {
        headers: {
            'Authorization': auth
        },
        method: 'GET'
        }).then(response => response.json());
}

export function getObject(path) {
    return fetch(makeUrl(path), {
        headers: {
            'Authorization': auth
        },
        method: 'GET'
        }).then(response => response.json());
}

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
