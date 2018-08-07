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

function Controller(logger, store, domain, view) {
  logger.log("Controller.init");
  const doc = $(document);
  let plantList = [];

  function init(plants) {
    plantList = _.values(plants);
    const currentPlantIds = store.loadCurrentPlants() || ["wheat"];
    view.build(
      plantList
    , currentPlantIds
    , domain.findRecommentedPlants(plantList, currentPlantIds)
    , domain.consistencyCheck(plants)
    );
    doc.on("change", "input[type='checkbox']", onPlantCheckboxChange);
  }

  function onPlantCheckboxChange(event) {
    logger.log("Controller.onPlantCheckboxChange");
    const currentPlantIds = doc
      .find("input[type='checkbox']")
      .toArray()
      .filter(cb => $(cb).is(":checked"))
      .map(cb => $(cb).attr("name"));
    logger.log("Controller.onPlantCheckboxChange " + currentPlantIds.join());
    view.updateRecommendedPlants(
      domain.findRecommentedPlants(plantList, currentPlantIds)
    );
    store.saveCurrentPlants(currentPlantIds);
  }

  return init;
}

