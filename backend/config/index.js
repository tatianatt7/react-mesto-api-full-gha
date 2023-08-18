require('dotenv').config();

const origin = [
  'https://front.mesto.nomoreparties.co',
];

if (process.env.NODE_ENV !== 'production') {
  origin.push('http://localhost:3001');
}

const {
  PORT = 3000,
  JWT_TOKEN_KEY = 'jwt-secret-key',
  MONGODB = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

module.exports = {
  origin,
  PORT,
  JWT_TOKEN_KEY,
  MONGODB,
};
