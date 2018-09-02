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

const sectionId = "harvestedSeedsSection";

export default class HarvestedSeedsView {
  constructor(plantView) {
    this._plantView = plantView;
  }

  build(currentPlantIds, plantList) {
    const header  = UI.h2("Harvested seeds");
    const section = UI.section("");
    section.addClass("nzg-harvested-seeds__list");
    section.attr("id", sectionId);

    UI.div(header).appendTo(section);

    const middleIndex = plantList.length / 2;
    const leftPlantList = plantList.slice(0, middleIndex);
    const rightPlantList = plantList.slice(middleIndex);
    const listContainer = UI.div().addClass("nzc-harvested-seeds__list-container").appendTo(section);
    this._buildCheckboxList(currentPlantIds, leftPlantList).appendTo(listContainer);
    this._buildCheckboxList(currentPlantIds, rightPlantList).appendTo(listContainer);
    this._appendUncheckButton(section);

    return section;
  }

  applyFilter(indices) {
    const checkboxes = this._findCheckboxes(this._findSection());
    checkboxes.filter((index, element) => {
      const makeVisible = _.contains(indices, index);
      this._closestListItem(element).toggle(makeVisible);
    });
  }

  resetFilter() {
    const checkboxes = this._findCheckboxes(this._findSection());
    checkboxes.filter((_, element) => {
      this._closestListItem(element).show();
    });
  }

  _buildCheckboxList(currentPlantIds, plantList) {
    return UI.unorderedListWithItems(
      plantList.map(p => this._buildCheckbox(currentPlantIds, p))
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
    this._findCheckboxes(section).prop("checked", false);
  }

  _findCheckboxes(section) {
    return section.find("input[type='checkbox']");
  }

  _findSection() {
    return $(`#${sectionId}`);
  }

  _closestListItem(element) {
    return $(element).closest("li");
  }
}
