const prod = {
    url: {
        API_URL: "https://giddy-visor-pig.cyclic.app/",
        API_URL_USERS: "https://giddy-visor-pig.cyclic.app/",
    },
}
const dev = {
    url: {
        API_URL: "http://localhost:4000/",
    },
}
export const config = process.env.NODE_ENV === "development" ? dev : prod
