import axios from 'axios';

export const postLoginAdmin = async (data) => {
    return axios.post(`http://localhost:1337/admin/login`, data);
}

// GET Collection Type
export const getCollectionTypes = async (token) => {
    token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MTM0MDIyLCJleHAiOjE2NDg3MjYwMjJ9.JbSvPdP5D-WNeDIvOX7SYELMdKW-NdrBFYkcROhr0-A'
    const data = await axios.get(`http://localhost:1337/content-manager/content-types`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return data;
}

export const getContents = async (collectionType) => {
    let url = 'http://localhost:1337/api/' + collectionType;
    const data = await axios.get(url);
    return data;
}

export const fetchContents = async (collectionType) => {
    console.log("fetchContents", collectionType)
    // const url = `http://localhost:1337/api/${collectionType}`;
    return await getContents(collectionType);
}