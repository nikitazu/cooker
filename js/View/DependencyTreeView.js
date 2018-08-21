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

import _ from "../libad/Underscore.js";
import * as ConstantData from "../ConstantData.js";
import UI from "../UI.js";

const treeContentId = "dependencyTreeContent";

export default class DependencyTreeView {
  constructor(plantView) {
    this._plantView = plantView;
  }

  build(tree, recommendedPlants) {
    const header  = UI.h2("Dependency tree");
    const section = UI.section("");

    UI.div(header).appendTo(section);
    this._buildLevelList(tree, recommendedPlants).appendTo(section);

    return section;
  }

  update(tree, recommendedPlants) {
    const newList = this._buildLevelList(tree, recommendedPlants);
    $(`#${treeContentId}`).replaceWith(newList);
  }

  _buildLevelList(tree, recommendedPlants) {
    const levels = tree.map(_.bind(this._buildLevel, this, recommendedPlants));
    return UI.unorderedListWithItems(levels)
      .addClass("nzc-dependency-tree__level-list")
      .attr("id", treeContentId);
  }

  _buildLevel(recommendedPlants, level) {
    return UI.div()
      .addClass("nzg-harvested-seeds__list nzg-harvested-seeds__list_horizontal")
      .append(UI.unorderedListWithItems(
        _.keys(level).map(_.bind(this._buildItem, this, recommendedPlants, level))
      ));
  }

  _buildItem(recommendedPlants, level, plantId) {
    const status = level[plantId];
    let statusClass;
    switch (status)
    {
    case "a":
      statusClass = "nzg-harvested-seeds__a";
      break;
    case "h":
      statusClass = "nzg-harvested-seeds__h";
      break;
    default:
      statusClass = "";
      break;
    }
    const plant = ConstantData.plantDict[plantId];
    const checkbox = UI.checkbox(plantId, "", status === "h");
    const propability = _.uniq(plant.mutations.map(m => m.propability)).join("/");
    const allMut = this._allMutations(plant);
    const recMut = this._recommendedMutations(recommendedPlants, plant);
    const title = recMut.length > 0
      ? ("Recommended mutations:\n" + recMut)
      : ("All mutations:\n" + allMut);
    const plantView = this._plantView
      .build(plant)
      .addClass(statusClass)
      .append(checkbox);
    return UI.div()
      .addClass("nzc-dependency-tree__plant")
      .attr("title", title)
      .append(UI.div(plantView))
      .append(UI.div(UI.span(propability)));
  }

  _allMutations(plant) {
    return plant
      .mutations
      .map(_.bind(this._mutation, this))
      .join("\n");
  }

  _recommendedMutations(recommendedPlants, plant) {
    return recommendedPlants
      .filter(rp => rp.id === plant.id)
      .map(rp => rp.mutations.map(_.bind(this._mutation, this)).join("\n"))
      .join("\n");
  }

  // TODO: refactor - copy-pasted from MutationListView
  _mutation(m) {
    return m.parents
      .map(_.bind(this._mutationParent, this))
      .join(" + ") + ` = ${m.propability}`;
  }

  _mutationParent(p) {
    const name = p.id === "any" ? "any" : ConstantData.plantDict[p.id].name;
    return p.count === 1 ? name : `${name} * ${p.count}`;
  }
}
