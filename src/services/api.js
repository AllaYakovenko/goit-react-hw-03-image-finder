import axios from "axios";

const imagesAPI = axios.create({
    baseURL: 'https://pixabay.com/api',
});

const API_KEY = '31760233-da36889e6feb9e4679dfb5488';

export const fetchImages = async (searchQuery, searchPage = 1) => {
    const response = await imagesAPI.get('/?image_type=photo&orientation=horizontal', {
        params: {
            q: searchQuery,
            page: searchPage,
            key: API_KEY,
            per_page: 12,
        },
    });

    return response.data.hits;
};

const api = {
    fetchImages,
}

export default api;

