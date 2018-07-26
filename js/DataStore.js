class DataStore {
  constructor(storage, log) {
    this._log = log;
    this._storage = storage;
    this._log.log("DataStore.init");
    if (this._storage) {
      this._log.log("DataStore.init LocalStorage support detected");
    } else {
      this._log.log("DataStore.init LocalStorage support missing");
    }
  }

  loadCurrentPlants() {
    return this._getItem("currentPlantIds");
  }

  saveCurrentPlants(plantIds) {
    this._setItem("currentPlantIds", plantIds);
  }

  _getItem(key) {
    this._log.log(`DataStore.getItem ${key}`);
    if (this._storage) {
      return this._deserialize(this._storage.getItem(key));
    } else {
      return undefined;
    }
  }

  _setItem(key, value) {
    const data = this._serialize(value);
    this._log.log(`DataStore.setItem ${key}=${data}`);
    if (this._storage) {
      this._storage.setItem(key, data);
    }
  }

  _serialize(data) {
    return JSON.stringify({ data: data });
  }

  _deserialize(json) {
    return json && JSON.parse(json).data || undefined;
  }
}

