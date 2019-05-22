import Registry from "Base/Registry";

/**
 * Memory Storage for store temporary session data
 *
 */
class MemoryStorage extends Registry {
  clear() {
    this.data = {};
  }
}

export default new MemoryStorage();
