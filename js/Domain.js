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

import _ from "./libad/Underscore.js";
import * as ConstantData from "./ConstantData.js";
import * as Func from "./Func.js";

export default class Domain {
  consistencyCheck() {
    const errors = [];
    _.each(ConstantData.plantDict, (plant, id) => {
      if (plant.id !== id) {
        errors.push(`plant.id !== id (${plant.id} !== ${id})`);
      }
      for (let mutation of plant.mutations) {
        for (let parent of mutation.parents) {
          if (parent.id !== "any" && !ConstantData.plantDict.hasOwnProperty(parent.id)) {
            errors.push(`missing parent.id (${parent.id})`);
          }
        }
      }
    });
    return errors;
  }

  findRecommentedPlants(currentPlantIds) {
    const missingPlants = this._plantsExceptIds(currentPlantIds);
    return Func.mapFilter(missingPlants, plant => {
      const mutations = this._getPossibleMutations(currentPlantIds, plant);
      return mutations.length > 0
        ? { id: plant.id, name: plant.name, mutations: mutations }
        : false;
    });
  }

  _plantsExceptIds(ids) {
    const plants = _.values(ConstantData.plantDict);
    return _.reject(plants, _.bind(this._isGrownPlant, this, ids));
  }

  _isGrownPlant(grownIds, plant) {
    return _.contains(grownIds, plant.id);
  }

  _getPossibleMutations(currentPlantIds, plant) {
    return plant
      .mutations
      .filter(_.bind(this._isMutationPossible, this, currentPlantIds));
  }

  _isMutationPossible(currentPlantIds, mutation) {
    return mutation.parents.every(p => _.contains(currentPlantIds, p.id));
  }
}
