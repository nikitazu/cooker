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

import GardenersCompendiumView from "./View/GardenersCompendiumView.js";
import PlantListView from "./View/PlantListView.js";

export default function View(UI, logger, container) {
  logger.log("View.init");
  const recommendedPlantsContentId = "recommendedPlants";
  let _plantDict;
  let _plantListView;
  let _gardenersCompendiumView;

  function build(
    plantDict
    , plantList
    , currentPlantIds
    , recommendedPlants
    , consistencyErrors
  ) {
    logger.log("View.build");
    _plantDict = plantDict;
    _plantListView = new PlantListView(plantDict);
    _gardenersCompendiumView = new GardenersCompendiumView(_plantListView);

    if (consistencyErrors.length > 0) {
      UI.h1("Consistency failure, this is a critical BUG!").appendTo(container);
      UI.div(UI.unorderedListWithItems(consistencyErrors)).appendTo(container);
    }

    UI.h1("Happy Cooker").appendTo(container);
    const sideBySide = UI.div().addClass("nzc-sidebyside").appendTo(container);

    _gardenersCompendiumView.build(plantList).appendTo(sideBySide);

    const middle = UI.section("").appendTo(sideBySide);
    UI.div(UI.h2("Harvested seeds")).appendTo(middle);
    UI.unorderedListWithItems(
      plantList
        .map(p => UI.checkbox(p.id, p.name, _.contains(currentPlantIds, p.id)))
    ).appendTo(middle);
    UI.button("Uncheck harvested seeds")
      .appendTo(middle)
      .click(() =>
        middle
          .find("input[type='checkbox']")
          .prop("checked", false));

    const right = UI.section("").appendTo(sideBySide);
    UI.div(UI.h2("Recommended plants")).appendTo(right);
    recommendedPlantsContent(recommendedPlants).appendTo(right);

    logger.log("View.build done");
  }

  function updateRecommendedPlants(plants) {
    $(`#${recommendedPlantsContentId}`).replaceWith(recommendedPlantsContent(plants));
  }

  function recommendedPlantsContent(plantList) {
    return UI.div(_plantListView.build(plantList))
      .attr("id", recommendedPlantsContentId);
  }

  return {
    build: build
  , updateRecommendedPlants: updateRecommendedPlants
  };
}
