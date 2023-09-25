/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/',
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "false"},
                    { key: "Access-Control-Allow-Origin", value: "*"},
                    { key: "Access-Control-Allow-Methods", value: "GET, DELETE, PATCH, POST, PUT"},
                    { key: "Access-Control-Allow-Headers", value: "Accept, Accept-Version, Content-Type"},
                ]
            }
        ]
    }
}

module.exports = nextConfig;
