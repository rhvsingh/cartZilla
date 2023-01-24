const prod = {
  url: {
    API_URL: "https://CartZillaBackend.rhvsingh.repl.co/",
    API_URL_USERS: "https://CartZillaBackend.rhvsingh.repl.co/",
  },
}
const dev = {
  url: {
    API_URL: "http://localhost:4000/",
  },
}
export const config = process.env.NODE_ENV === "development" ? dev : prod
