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
import MutationListView from "./View/MutationListView.js";
import PlantView from "./View/PlantView.js";
import PlantListView from "./View/PlantListView.js";
import RecommendedPlantsView from "./View/RecommendedPlantsView.js";
import SeedImageView from "./View/SeedImageView.js";
import SearchView from "./View/SearchView.js";

export default class View {
  constructor(UI, logger, container) {
    logger.log("View.init");
    this._ui = UI;
    this._logger = logger;
    this._container = container;
    const seedImageView = new SeedImageView();
    const plantView = new PlantView(seedImageView);
    const plantListView = new PlantListView(
      plantView
      , new MutationListView()
    );
    this._gardenersCompendiumView = new GardenersCompendiumView(plantListView);
    this._harvestedSeedsView = new HarvestedSeedsView(plantView);
    this._recommendedPlantsView = new RecommendedPlantsView(plantListView);
    this._searchView = new SearchView();

    this.gardenersCompendiumSectionHeaderId = this._gardenersCompendiumView.sectionHeaderId;
  }

  build(
    plantList
    , currentPlantIds
    , recommendedPlants
    , consistencyErrors
  ) {
    this._logger.log("View.build");

    if (consistencyErrors.length > 0) {
      this._add(this._ui.h1("Consistency failure, this is a critical error!"));
      this._add(this._ui.div(this._ui.unorderedListWithItems(consistencyErrors)));
    }

    this._add(this._ui.h1("Happy Cooker"));
    this._add(this._searchView.build());
    this._add(this._ui.div().addClass("nzc-sidebyside"))
      .append(this._gardenersCompendiumView.build(plantList))
      .append(this._harvestedSeedsView.build(currentPlantIds, plantList))
      .append(this._recommendedPlantsView.build(recommendedPlants));

    this._logger.log("View.build done");
  }

  update(recommendedPlants) {
    this._recommendedPlantsView.update(recommendedPlants);
  }

  toggleGardenersCompendium() {
    this._gardenersCompendiumView.toggleSection();
  }

  setDefaultFocus() {
    this._searchView.setDefaultFocus();
  }

  applyFilter(indices) {
    this._harvestedSeedsView.applyFilter(indices);
  }

  resetFilter() {
    this._harvestedSeedsView.resetFilter();
  }

  _add(element) {
    return element.appendTo(this._container);
  }
}
