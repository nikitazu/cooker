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

import * as ConstantData from "./ConstantData.js";

export default class Domain {
  consistencyCheck() {
    const errors = [];
    _.each(ConstantData.plantDict, (plant, id) => {
      if (plant.id !== id) {
        errors.push(`plant.id !== id (${plant.id} !== ${id})`);
      }
      _.each(plant.mutations, mutation => {
        _.each(mutation.parents, parent => {
          if (parent.id !== "any" && !ConstantData.plantDict.hasOwnProperty(parent.id)) {
            errors.push(`missing parent.id (${parent.id})`);
          }
        });
      });
    });
    return errors;
  }

  findRecommentedPlants(plants, currentPlantIds) {
    const missingPlants = this._plantsExceptIds(plants, currentPlantIds);
    return this._mapFilter(missingPlants, plant => {
      const mutations = plant.mutations.filter(m => this._isMutationPossible(m, currentPlantIds));
      return mutations.length > 0
        ? { id: plant.id, name: plant.name, mutations: mutations }
        : false;
    });
  }

  _plantsExceptIds(plants, ids) {
    return plants.filter(plant => !this._isGrownPlant(ids, plant));
  }

  _isGrownPlant(grownIds, plant) {
    return _.contains(grownIds, plant.id);
  }

  _isMutationPossible(mutation, avaliablePlantIds) {
    return mutation.parents.every(p => _.contains(avaliablePlantIds, p.id));
  }

  _mapFilter(list, func) {
    const result = [];
    for (let x of list) {
      const tmp = func(x);
      if (tmp) {
        result.push(tmp);
      }
    }
    return result;
  }
}
