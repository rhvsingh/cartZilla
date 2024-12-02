const prod = {
    url: {
        API_URL: "https://cartzilla-backend-0xc4.onrender.com/",
        API_URL_USERS: "https://cartzilla-backend-0xc4.onrender.com/",
    },
}
const dev = {
    url: {
        API_URL: "http://localhost:4000/",
    },
}
export const config = process.env.NODE_ENV === "development" ? dev : prod
