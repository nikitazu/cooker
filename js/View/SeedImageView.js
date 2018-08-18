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

export default class SeedImageView {
  build(plant) {
    const url = this._getSeedUrl(plant);
    return UI.img()
      .attr("src", encodeURI(url))
      .addClass("nzg-plant__image");
  }

  _getSeedUrl(plant) {
    const name = plant.name.replace(" ", "_");
    return `img/seed/${name}.m.png`;
  }
}
