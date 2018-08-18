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

import _ from "../libad/Underscore.js";
import UI from "../UI.js";

export default class HarvestedSeedsView {
  constructor(plantView) {
    this._plantView = plantView;
  }

  build(currentPlantIds, plantList) {
    const header  = UI.h2("Harvested seeds");
    const section = UI.section("").addClass("nzg-harvested-seeds__list");

    UI.div(header).appendTo(section);
    this._buildCheckboxList(currentPlantIds, plantList).appendTo(section);
    this._appendUncheckButton(section);

    return section;
  }

  _buildCheckboxList(currentPlantIds, plantList) {
    const sortedPlantList = _.sortBy(plantList, p => p.name);
    return UI.unorderedListWithItems(
      sortedPlantList.map(p => this._buildCheckbox(currentPlantIds, p))
    );
  }

  _buildCheckbox(currentPlantIds, plant) {
    return UI.checkbox(
      plant.id
      , this._plantView.build(plant)
      , _.contains(currentPlantIds, plant.id)
    ).addClass("nzg-harvested-seeds__item");
  }

  _appendUncheckButton(section) {
    UI.button("Uncheck harvested seeds")
      .appendTo(section)
      .click(() => this._uncheckHarvestedSeeds(section));
  }

  _uncheckHarvestedSeeds(section) {
    section.find("input[type='checkbox']").prop("checked", false);
  }
}
