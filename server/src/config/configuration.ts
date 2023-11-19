export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongo_uri: process.env.MONGO_URI,
  password: {
    salt: Number(process.env.PASSWORD_SALT || 10),
  },
  jwt: {
    secrete: process.env.JWT_SECRET,
  },
});
