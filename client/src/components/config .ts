const env = 'development';

const config = {
    development: {
        api: 'http://localhost:3000',
        admin: { email: 'ayala42185@gmail.com'}
    },
    staging: {
        api: 'http://staging',
    },
    production: {
        api: 'http://production',
    },

    
};

export default config[env];