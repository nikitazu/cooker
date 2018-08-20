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
   *   [ [wheat, weed] // L0 - plants available at the start of the game
   *   , [corn, rice]  // L1 - plants available through mutation of L0 plants
   *   , et cetera
   *   ]
   */
  build() {
    const result = [];
    const rootPlantIds = this._getRoot();
    result.push(rootPlantIds);
    let rootChildren = this._getChildren(result, rootPlantIds);
    result.push(rootChildren);
    while (rootChildren.length > 0) {
      rootChildren = this._getChildren(result, rootChildren);
      if (rootChildren.length > 0) {
        result.push(rootChildren);
      }
    }
    return result;
  }

  _getRoot() {
    return ["wheat", "weed"];
  }

  _getChildren(collectedTree, plantIds) {
    const collectedIds = _.flatten(collectedTree);
    return _.values(ConstantData.plantDict)
      .filter(plant =>
        !_.contains(plantIds, plant.id)
        && !_.contains(collectedIds, plant.id)
        && plant.mutations
          .some(m => m.parents.every(p => p.id === "any" || p.id === plant.id && p.countIf === "<=" || _.contains(collectedIds, p.id))))
      .map(plant => plant.id);
  }
}
