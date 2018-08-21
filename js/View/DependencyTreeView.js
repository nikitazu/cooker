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

  build(tree) {
    const header  = UI.h2("Dependency tree");
    const section = UI.section("");

    UI.div(header).appendTo(section);
    this._buildLevelList(tree).appendTo(section);

    return section;
  }

  update(tree) {
    $(`#${treeContentId}`).replaceWith(this._buildLevelList(tree));
  }

  _buildLevelList(tree) {
    const levels = tree.map(_.bind(this._buildLevel, this));
    return UI.unorderedListWithItems(levels)
      .addClass("nzc-dependency-tree__level-list")
      .attr("id", treeContentId);
  }

  _buildLevel(level) {
    return UI.div()
      .addClass("nzg-harvested-seeds__list nzg-harvested-seeds__list_horizontal")
      .append(UI.unorderedListWithItems(
        _.keys(level).map(_.bind(this._buildItem, this, level))
      ));
  }

  _buildItem(level, plantId) {
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
    const checkbox = UI.checkbox(plantId, "", status === "h");
    return this._plantView
      .build(ConstantData.plantDict[plantId])
      .addClass(statusClass)
      .append(checkbox);
  }
}
