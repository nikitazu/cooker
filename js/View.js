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
import HarvestedSeedsView from "./View/HarvestedSeedsView.js";
import PlantListView from "./View/PlantListView.js";
import RecommendedPlantsView from "./View/RecommendedPlantsView.js";

export default function View(UI, logger, container) {
  logger.log("View.init");
  let _plantDict;

  let _gardenersCompendiumView;
  let _harvestedSeedsView;
  let _plantListView;
  let _recommendedPlantsView;

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
    _harvestedSeedsView = new HarvestedSeedsView();
    _recommendedPlantsView = new RecommendedPlantsView(_plantListView);

    if (consistencyErrors.length > 0) {
      UI.h1("Consistency failure, this is a critical BUG!").appendTo(container);
      UI.div(UI.unorderedListWithItems(consistencyErrors)).appendTo(container);
    }

    UI.h1("Happy Cooker").appendTo(container);
    const sideBySide = UI.div().addClass("nzc-sidebyside").appendTo(container);

    _gardenersCompendiumView.build(plantList).appendTo(sideBySide);
    _harvestedSeedsView.build(currentPlantIds, plantList).appendTo(sideBySide);
    _recommendedPlantsView.build(recommendedPlants).appendTo(sideBySide);

    logger.log("View.build done");
  }

  return {
    build: build
    , updateRecommendedPlants: x => _recommendedPlantsView.update(x)
  };
}
