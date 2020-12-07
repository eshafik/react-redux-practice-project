import axios from 'axios';

export default axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        Authorization: 'Client-ID iWZu3o0dNNCPklwhHISndbQJXuPH81ynNgDxAJs6GVE'
    }
})