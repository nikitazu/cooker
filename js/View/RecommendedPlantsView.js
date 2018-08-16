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

import UI from "../UI.js";

const recommendedPlantsContentId = "recommendedPlants";

export default class RecommendedPlantsView {
  constructor(plantListView) {
    this._plantListView = plantListView;
  }

  build(plantList) {
    const header = UI.h2("Recommended plants");
    const section = UI.section("");
    UI.div(header).appendTo(section);
    this._recommendedPlantsContent(plantList).appendTo(section);
    return section;
  }

  update(plantList) {
    const newList = this._recommendedPlantsContent(plantList);
    $(`#${recommendedPlantsContentId}`).replaceWith(newList);
  }

  _recommendedPlantsContent(plantList) {
    const plantListView = this._plantListView.build(plantList);
    return UI.div(plantListView).attr("id", recommendedPlantsContentId);
  }
}
