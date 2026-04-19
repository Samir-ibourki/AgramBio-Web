import api from "./axios";

export const getAllCategories = ()=>api.get('/categories').then((res)=>res.data)
export const getCategory = (slug) => api.get(`/categories/${slug}`).then((res) => res.data)