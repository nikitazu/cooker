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

function View(UI, logger, container) {
  logger.log("View.init");
  const recommendedPlantsContentId = "recommentedPlants";

  function build(plants, currentPlantIds, recommentedPlants) {
    logger.log("View.build");

    UI.h1("Happy Cooker").appendTo(container);
    const sideBySide = UI.div().addClass("nzc-sidebyside").appendTo(container);

    const left = UI.section(UI.h2("All mutations")).appendTo(sideBySide);
    plantList(plants).appendTo(left);

    const middle = UI.section("").appendTo(sideBySide);
    UI.div(UI.h2("Avaliable plants")).appendTo(middle);
    UI.unorderedListWithItems(
      plants
        .map(p => UI.checkbox(p.id, p.name, _.contains(currentPlantIds, p.id)))
    ).appendTo(middle);
    
    const right = UI.section("").appendTo(sideBySide);
    UI.div(UI.h2("Recommended plants")).appendTo(right);
    recommentedPlantsContent(recommentedPlants).appendTo(right);

    logger.log("View.build done");
  }

  function updateRecommendedPlants(plants) {
    $(`#${recommendedPlantsContentId}`).replaceWith(recommentedPlantsContent(plants));
  }

  function recommentedPlantsContent(plants) {
    return UI.div(plantList(plants)).attr("id", recommendedPlantsContentId);
  }

  function plantList(plants) {
    const container = UI.div("");
    for (let plant of plants) {
      UI.div(plantTitle(plant)).appendTo(container);
      buildMutationList(plant.mutations).appendTo(container);
    }
    return container;
  }

  function plantTitle(plant) {
    return `${plant.name} (${plant.id})`;
  }

  function buildMutationList(mutations) {
    return UI.unorderedListWithItems(mutations.map(mutation));
  }

  function mutation(m) {
    return m.parents.map(mutationParent).join(" + ") + ` = ${m.propability}`;
  }

  function mutationParent(p) {
    return p.count === 1 ? p.id : `${p.id} * ${p.count}`;
  }
  
  return {
    build: build
  , updateRecommendedPlants: updateRecommendedPlants
  };
}

