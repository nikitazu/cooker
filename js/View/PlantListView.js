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

import UI from "../UI.js";

export default class PlantListView {
  constructor(plantDict) {
    this._plantDict = plantDict;
  }

  build(plantList) {
    const container = UI.div("");
    for (let plant of plantList) {
      UI.div(plant.name).appendTo(container);
      this._buildMutationList(plant.mutations).appendTo(container);
    }
    return container;
  }

  _buildMutationList(mutationList) {
    return UI.unorderedListWithItems(mutationList.map(m => this._mutation(m)));
  }

  _mutation(m) {
    return m.parents
      .map(p => this._mutationParent(p))
      .join(" + ") + ` = ${m.propability}`;
  }

  _mutationParent(p) {
    const name = p.id === "any" ? "any" : this._plantDict[p.id].name;
    return p.count === 1 ? name : `${name} * ${p.count}`;
  }
}