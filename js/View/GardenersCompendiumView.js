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

const expandedHeaderText = "Gardener's Compendium";
const expandedHeaderTooltip = "Click to hide this Gardener's Compendium";
const collapsedHeaderText = "G..";
const collapsedHeaderTooltip = "Click to open Gardener's Compendium";

export default class GardenersCompendiumView {
  constructor(plantListView) {
    this._plantListView = plantListView;
    this.sectionHeaderId = "gardenersCompendiumSection";
  }

  build(plantList) {
    const section = UI.section();
    section.attr("id", this.sectionHeaderId);
    section.addClass("nzc-gardeners-compendium");

    this._header = UI.h2(expandedHeaderText);
    this._header.attr("title", expandedHeaderTooltip);
    this._header.addClass("nzc-gardeners-compendium__header");
    this._header.appendTo(section);

    this._list = this._plantListView.build(plantList);
    this._list.addClass("nzc-gardeners-compendium__list");
    this._list.appendTo(section);

    return section;
  }

  toggleSection() {
    if (this._list.is(":visible")) {
      this._header.text(collapsedHeaderText);
      this._header.attr("title", collapsedHeaderTooltip);
      this._list.hide();
    } else {
      this._header.text(expandedHeaderText);
      this._header.attr("title", expandedHeaderTooltip);
      this._list.show();
    }
  }
}
