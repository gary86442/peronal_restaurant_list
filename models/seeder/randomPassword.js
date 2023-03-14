module.exports = {
  randomPassword() {
    Math.random().toString(36).slice(-8);
  },
};
