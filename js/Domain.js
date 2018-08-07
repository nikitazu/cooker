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

function Domain() {
  function consistencyCheck(plantDict) {
    const errors = [];
    _.each(plantDict, (plant, id) => {
      if (plant.id !== id) {
        errors.push(`plant.id !== id (${plant.id} !== ${id})`);
      }
      _.each(plant.mutations, mutation => {
        _.each(mutation.parents, parent => {
          if (parent.id !== "any" && !plantDict.hasOwnProperty(parent.id)) {
            errors.push(`missing parent.id (${parent.id})`);
          }
        });
      });
    });
    return errors;
  }

  function findRecommentedPlants(plants, currentPlantIds) {
    const missingPlants = plantsExceptIds(plants, currentPlantIds);
    return mapFilter(missingPlants, plant => {
      const mutations = plant.mutations.filter(m => isMutationPossible(m, currentPlantIds));
        return mutations.length > 0
        ? { id: plant.id, name: plant.name, mutations: mutations }
        : false;
    });
  }

  function plantsExceptIds(plants, ids) {
    return plants.filter(plant => !isGrownPlant(ids, plant));
  }

  function isGrownPlant(grownIds, plant) {
    return _.contains(grownIds, plant.id);
  }

  function isMutationPossible(mutation, avaliablePlantIds) {
    return mutation.parents.every(p => _.contains(avaliablePlantIds, p.id));
  }

  function mapFilter(list, func) {
    const result = [];
    for (let x of list) {
      const tmp = func(x);
      if (tmp) {
        result.push(tmp);
      }
    }
    return result;
  }

  return {
    consistencyCheck: consistencyCheck
  , findRecommentedPlants: findRecommentedPlants
  };
}
