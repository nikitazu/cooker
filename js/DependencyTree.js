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

export default class DependencyTree {
  /**
   * Build a list of list of plant ids.
   *   Each position in the result list is a level of hierarchy.
   *   Each position in the sub-list is a plant id achievable at that level.
   * For example:
   *   [ [ { "wheat", "h" }, { "weed", "a" } ] // L0 - plants available at the start of the game
   *   , [ { "corn",  "a" }, { "rice", ""  } ] // L1 - plants available through mutation of L0 plants
   *   , et cetera
   *   ]
   * Where key is id of a plant
   *   and value is plant status
   *     "a" - available
   *     "h" - harvested
   *     ""  - not available
   */
  build(currentPlantIds, recommendedPlantIds) {
    const result = [];
    const rootPlantIds = this._getRoot();
    result.push(rootPlantIds);
    let rootChildren = this._getChildren(result, rootPlantIds);
    result.push(rootChildren);
    while (_.keys(rootChildren).length > 0) {
      rootChildren = this._getChildren(result, _.keys(rootChildren));
      if (_.keys(rootChildren).length > 0) {
        result.push(rootChildren);
      }
    }
    for (let level of result) {
      for (let id of _.keys(level)) {
        if (_.contains(currentPlantIds, id)) {
          level[id] = "h";
        } else if (_.contains(recommendedPlantIds, id)) {
          level[id] = "a";
        }
      }
    }
    return result;
  }

  _getRoot() {
    return { "wheat": "h", "weed": "a" };
  }

  _getChildren(collectedTree, plantIds) {
    const collectedIds = _.flatten(collectedTree.map(level => _.keys(level)));
    return _.values(ConstantData.plantDict)
      .filter(plant =>
        !_.contains(plantIds, plant.id)
        && !_.contains(collectedIds, plant.id)
        && plant.mutations
          .some(m => m.parents.every(p => p.id === "any" || p.id === plant.id && p.countIf === "<=" || _.contains(collectedIds, p.id))))
      .map(plant => plant.id)
      .reduce((result, id) => {
        const obj = {};
        obj[id] = "";
        return _.extend(result, obj);
      }, {});
  }
}
