class Registry {
  constructor() {
    this.data = {};
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
  }

  detete(key) {
    delete this.data[key];
  }
}

export default Registry;
