import axios from 'axios';

const Api = {
    url: 'http://localhost:4000',
    getAllPosts: () => {
        return axios.get(`${Api.url}/posts`);
    },
    getPost: (id) => {
        return axios.get(`${Api.url}/posts/${id}`);
    },
    createPost: (body) => {
        let newBody = body;
        newBody.tags = (body.tags && body.tags.length) ? body.tags.split(',') : [];
        newBody.downvoteCount = parseInt(body.downvoteCount) || 0;
        newBody.upvoteCount = parseInt(body.upvoteCount) || 0;
        return axios.post(`${Api.url}/posts`, newBody);
    },
    updatePost: (id, body) => {
        let newBody = body;
        delete newBody['_id'];
        delete newBody['dateCreated'];
        newBody.tags = (body.tags && body.tags.length) ? body.tags.split(',') : [];
        newBody.downvoteCount = parseInt(body.downvoteCount) || 0;
        newBody.upvoteCount = parseInt(body.upvoteCount) || 0;
        return axios.put(`${Api.url}/posts/${id}`, newBody);
    },
    deletePost: (id) => {
        return axios.delete(`${Api.url}/posts/${id}`);
    },
};
  
export default Api;