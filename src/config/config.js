module.exports = {
  secret: 'SECRET_KEY',
  tokens: {
    access: {
      expiresIn: 180 // seconds
    },
    refresh: {
      expiresIn: 300 // seconds
    }
  }
};
