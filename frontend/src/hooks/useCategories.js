import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCategories,getCategory } from "../api/categoryAPi";

export const useAllCategories =  () => {
    return useQuery({
        queryKey:["categories"],
        queryFn:getAllCategories
    })
}

export const useCategory = (slug) => {
    return useQuery({
        
        queryKey: ["category", slug], 
        queryFn: () => getCategory(slug),
        enabled: !!slug 
    })
}