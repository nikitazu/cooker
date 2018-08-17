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

import * as ConstantData from "./ConstantData.js";

export default class Controller {
  constructor(logger, store, domain, view) {
    logger.log("Controller.init");
    this._logger    = logger;
    this._store     = store;
    this._domain    = domain;
    this._view      = view;
    this._doc       = $(document);
    this._plantList = [];
  }

  init() {
    this._plantList = _.values(ConstantData.plantDict);
    const currentPlantIds = this._store.loadCurrentPlants() || ["wheat"];
    this._view.build(
      this._plantList
      , currentPlantIds
      , this._domain.findRecommentedPlants(this._plantList, currentPlantIds)
      , this._domain.consistencyCheck()
    );
    this._doc.on(
      "change"
      , "input[type='checkbox']"
      , _.bind(this._onPlantCheckboxChange, this)
    );
  }

  _onPlantCheckboxChange() {
    this._logger.log("Controller.onPlantCheckboxChange");
    const currentPlantIds = this._getCurrentPlantIds();
    this._view.update(
      this._domain.findRecommentedPlants(this._plantList, currentPlantIds)
    );
    this._store.saveCurrentPlants(currentPlantIds);
  }

  _getCurrentPlantIds() {
    return this._doc
      .find("input[type='checkbox']")
      .toArray()
      .filter(cb => $(cb).is(":checked"))
      .map(cb => $(cb).attr("name"));
  }
}

