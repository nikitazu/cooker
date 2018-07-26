/*
 * Copyright (C) 2018 Nikita B. Zuev
 *
 * This file is part of Cooker.
 *
 * Cooker is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Cooker is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Cooker.  If not, see <https://www.gnu.org/licenses/>.
 */

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

