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
import UI from "../UI.js";

const sectionId = "gardenersCompendiumSection";
const expandedHeaderText = "Gardener's Compendium";
const expandedHeaderTooltip = "Click to hide this Gardener's Compendium";
const collapsedHeaderText = "G..";
const collapsedHeaderTooltip = "Click to open Gardener's Compendium";

export default class GardenersCompendiumView {
  constructor(plantListView) {
    this._plantListView = plantListView;
  }

  build(plantList) {
    const header = UI.h2(expandedHeaderText);
    header.attr("title", expandedHeaderTooltip);
    header.addClass("nzc-gardeners-compendium__header");
    const section = UI.section(header);
    section.attr("id", sectionId);
    section.addClass("nzc-gardeners-compendium");
    const list = this._plantListView.build(plantList).appendTo(section);
    list.addClass("nzc-gardeners-compendium__list");
    $(document).on(
      "click"
      , `#${sectionId} > h2`
      , _.bind(this._toggleSection, this, header, list)
    );
    return section;
  }

  _toggleSection(header, list) {
    if (list.is(":visible")) {
      header.text(collapsedHeaderText);
      header.attr("title", collapsedHeaderTooltip);
      list.hide();
    } else {
      header.text(expandedHeaderText);
      header.attr("title", expandedHeaderTooltip);
      list.show();
    }
  }
}
