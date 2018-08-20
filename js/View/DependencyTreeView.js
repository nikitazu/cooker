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

  _buildLevelList(tree) {
    return UI.unorderedListWithItems(
      tree.map(_.bind(this._buildLevel, this))
    );
  }

  _buildLevel(plantIds) {
    return UI.div()
      .addClass("nzg-harvested-seeds__list nzg-harvested-seeds__list_horizontal")
      .append(UI.unorderedListWithItems(
        plantIds.map(_.bind(this._buildItem, this))
      ));
  }

  _buildItem(plantId) {
    return this._plantView.build(ConstantData.plantDict[plantId]);
  }
}
