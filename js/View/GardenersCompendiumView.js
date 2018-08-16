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

export default class GardenersCompendiumView {
  constructor(plantListView) {
    this._plantListView = plantListView;
  }

  build(plantList) {
    const header  = UI.h2("Gardener's Compendium");
    const section = UI.section(header);
    this._plantListView.build(plantList).appendTo(section);
    return section;
  }
}
