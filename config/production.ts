export default {
    port: 3000,
    baseUrl: "localhost",
    db: {
        name: "restful-api-v2",
        port: 27017,
        url: "mongodb://localhost:27017",
    },
    ttl: {
        accessToken: "15m",
        refreshToken: "10d",
    },
    keys: {
        saltWorkFactor: 10,
        publicKey: ``,
        privateKey: ``,
    },
};
