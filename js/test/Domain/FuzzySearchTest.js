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
import FuzzySearch from "../../Domain/FuzzySearch.js";

m.describe("FuzzySearch", () => {
  const search = new FuzzySearch(
    ["Baker's Wheat", "Bakeberry", "Golden Clover"]
  );

  m.describe("#findIndices(list, criteria)", () => {
    m.it("should find item by equality criteria", () => {
      const result = search.findIndices("Bakeberry");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([1])
      );
    });

    m.it("should find item by equality (case insensitive)", () => {
      const result = search.findIndices("bakeberry");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([1])
      );
    });

    m.it("should find item by containability", () => {
      const result = search.findIndices("Whe");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by containability (case insensitive)", () => {
      const result = search.findIndices("whe");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by stripped equality", () => {
      const result = search.findIndices("BakersWheat");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by stripped equality (case insensitive)", () => {
      const result = search.findIndices("bakerswheat");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by stripped containability", () => {
      const result = search.findIndices("BakersW");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by stripped containability (case insensitive)", () => {
      const result = search.findIndices("bakersw");
      // TODO decide if "Bakersw" or "bakersW" should match
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });
  });
});
