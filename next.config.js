/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/pokemons',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
