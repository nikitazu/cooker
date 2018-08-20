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

import assert from "assert";
import m from "mocha";
import DependencyTree from "../DependencyTree.js";

m.describe("DependencyTree", () => {
  const dtree = new DependencyTree();

  m.describe("#build()", () => {
    m.it("should build tree", () => {
      const result = [
        ["wheat", "weed"]
        , ["corn", "berry", "mold", "spore"]
        , ["rice", "choco", "mildew", "room", "glove", "wrink"]
        , ["millet", "elder", "wchoco", "lich", "qb", "bulb"]
        , ["clover", "gclover", "jqb", "duke", "grass", "puff"]
        , ["lily", "daisy", "rot"]
        , ["whisker", "moss", "cap", "fool"]
        , ["rose", "tulip", "drow"]
      ];
      assert.equal(
        JSON.stringify(dtree.build())
        , JSON.stringify(result)
      );
    });
  });
});
