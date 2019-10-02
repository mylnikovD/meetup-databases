const envType = process.env.NODE_ENV;
const config = {
  url: ''
};

switch (envType) {
  case 'production':
    config.url = '';
    break;

  default:
    config.url = 'http://localhost:3001';
    break;
}

export default config;
