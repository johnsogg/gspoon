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