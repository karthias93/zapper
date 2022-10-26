/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'storage.googleapis.com', 'web.zapper.fi', 'static.debank.com'],
  },
  env: {
    MONGODB_URI:
    "mongodb+srv://karthick:Potent%40123@cluster0.ustkdni.mongodb.net/?retryWrites=true&w=majority",
    //"mongodb://localhost:27017/?readPreference=primary&directConnection=true&ssl=false",
    DB_NAME: "zapper",
    apiUrl:
        process.env.NODE_ENV !== "production"
            ? "http://localhost:3000" // development api
            : "https://portfolio.potent.finance", // production api
    mailPassword: "jhvtxmiqrltufxtj",
    mailUsername: "unibond12@gmail.com",
    imgUrlEndpoint: "https://ik.imagekit.io/uihusbecs1/",
    zapperApi: "https://web.zapper.fi/v2"
  },
}

module.exports = nextConfig
