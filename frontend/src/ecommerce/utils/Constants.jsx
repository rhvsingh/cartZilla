const prod = {
    url: {
        API_URL: "https://kind-red-moth-fez.cyclic.app/",
        API_URL_USERS: "https://kind-red-moth-fez.cyclic.app/",
    },
}
const dev = {
    url: {
        API_URL: "http://localhost:4000/",
    },
}
export const config = process.env.NODE_ENV === "development" ? dev : prod
