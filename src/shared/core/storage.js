const storage = {
  state: null,

  init() {
    if (localStorage.blare)
      this.state = JSON.parse(localStorage.blare);
    else
      this.state = {};
  },

  save() {
    localStorage.blare = JSON.stringify(this.state);
  },

  get(key) {
    return this.state[key];
  },

  set(key, value) {
    this.state[key] = value;
    this.save();
  }
};

export default storage;
