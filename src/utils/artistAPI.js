export const getArtists = (url = 'http://localhost:3012/api/artists') => {
    const params = {
        method: "GET",
    }
    return fetch(url, params)
        .then((data) => data.json())
};

export const deleteArtist = (id) => {
    const params = {
        method: "DELETE",
    }
    return fetch(`http://localhost:3012/api/artists/${id}`, params)
};

export const addArtist = (artistData) => {
    const params = {
        method: "POST",
        body: artistData,
    }
    return fetch('http://localhost:3012/api/artists', params)
        .then((data) => data.json())
};

export const updateArtist = (id, artistData) => {
    const params = {
        method: "PUT",
        body: artistData,
    }
    return fetch(`http://localhost:3012/api/artists/${id}`, params)
        .then((data) => data.json())
};
