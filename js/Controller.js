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

import _ from "./libad/Underscore.js";
import * as ConstantData from "./ConstantData.js";

export default class Controller {
  constructor(logger, store, domain, view) {
    logger.log("Controller.init");
    this._logger    = logger;
    this._store     = store;
    this._domain    = domain;
    this._view      = view;
    this._doc       = $(document);
  }

  init() {
    const currentPlantIds = this._plantIdsOrDefault(this._store.loadCurrentPlants());
    const recommendedPlants = this._domain.findRecommentedPlants(currentPlantIds);
    this._view.build(
      _.values(ConstantData.plantDict)
      , currentPlantIds
      , recommendedPlants
      , this._domain.consistencyCheck()
    );
    if (!this._store.loadGardenersCompendiumSectionVisibility()) {
      this._view.toggleGardenersCompendium();
    }
    this._doc.on(
      "change"
      , "input[type='checkbox']"
      , _.bind(this._onPlantCheckboxChange, this)
    );
    this._doc.on(
      "click"
      , `#${this._view.gardenersCompendiumSectionHeaderId} >h2`
      , _.bind(this._onGardenersCompendiumSectionHeaderClick, this)
    );
  }

  _onPlantCheckboxChange() {
    this._logger.log("Controller.onPlantCheckboxChange");
    const currentPlantIds = this._plantIdsOrDefault(this._getCurrentPlantIds());
    const recommendedPlants = this._domain.findRecommentedPlants(currentPlantIds);
    this._view.update(
      recommendedPlants
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

  _plantIdsOrDefault(ids) {
    return ids && ids.length > 0 ? ids : ["wheat"];
  }

  _onGardenersCompendiumSectionHeaderClick() {
    this._logger.log("Controller.onGardenersCompendiumSectionHeaderClick");
    this._view.toggleGardenersCompendium();
    this._store.saveGardenersCompendiumSectionVisibility(
      !this._store.loadGardenersCompendiumSectionVisibility()
    );
  }
}
