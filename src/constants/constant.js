//export const BASE_URL="http://localhost:3000/api/v1";
export const BASE_URL="http://3.110.147.54/api/v1";
//export const BASE_URL="/api/v1";
export const headers = (token) => ({
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
});

export const categories=["Wedding", "Reception", "Engagement", "Sangeet"];