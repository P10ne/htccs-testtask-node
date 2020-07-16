module.exports = {
  secret: 'SECRET_KEY',
  tokens: {
    access: {
      expiresIn: 15 * 60 // seconds
    },
    refresh: {
      expiresIn: 30 * 24 * 60 * 60 // seconds
    }
  }
};
