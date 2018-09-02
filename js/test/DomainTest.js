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
import * as ConstantData from "../ConstantData.js";
import Domain from "../Domain.js";

m.describe("Domain", () => {
  const domain = new Domain();
  m.describe("#consistencyCheck()", () => {
    m.it("should pass", () => {
      assert.equal(
        JSON.stringify(domain.consistencyCheck())
        , JSON.stringify([])
      );
    });
  });

  m.describe("#findRecommentedPlants(currentPlantIds)", () => {
    m.it("should find plants and filter mutations", () => {
      const corn = ConstantData.plantDict["corn"];
      const berry = ConstantData.plantDict["berry"];
      const expectedCorn = {
        id: corn.id
        , name: corn.name
        , mutations: [
          corn.mutations[0]
        ]
      };
      const expectedBerry = {
        id: berry.id
        , name: berry.name
        , mutations: [
          berry.mutations[0]
        ]
      };
      const result = domain.findRecommentedPlants(["wheat"]);
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([expectedCorn, expectedBerry])
      );
    });
  });

  m.describe("#fuzzyFind(list, criteria)", () => {
    m.it("should find item by equality criteria", () => {
      const list = ["Baker's Wheat", "Bakeberry", "Golden Clover"];
      const result = domain.fuzzyFind(list, "Bakeberry");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([1])
      );
    });

    m.it("should find item by equality (case insensitive)", () => {
      const list = ["Baker's Wheat", "Bakeberry", "Golden Clover"];
      const result = domain.fuzzyFind(list, "bakeberry");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([1])
      );
    });

    m.it("should find item by containability", () => {
      const list = ["Baker's Wheat", "Bakeberry", "Golden Clover"];
      const result = domain.fuzzyFind(list, "Whe");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by containability (case insensitive)", () => {
      const list = ["Baker's Wheat", "Bakeberry", "Golden Clover"];
      const result = domain.fuzzyFind(list, "whe");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by stripped equality", () => {
      const list = ["Baker's Wheat", "Bakeberry", "Golden Clover"];
      const result = domain.fuzzyFind(list, "BakersWheat");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by stripped equality (case insensitive)", () => {
      const list = ["Baker's Wheat", "Bakeberry", "Golden Clover"];
      const result = domain.fuzzyFind(list, "bakerswheat");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by stripped containability", () => {
      const list = ["Baker's Wheat", "Bakeberry", "Golden Clover"];
      const result = domain.fuzzyFind(list, "BakersW");
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });

    m.it("should find item by stripped containability (case insensitive)", () => {
      const list = ["Baker's Wheat", "Bakeberry", "Golden Clover"];
      const result = domain.fuzzyFind(list, "bakersw");
      // TODO decide if "Bakersw" or "bakersW" should match
      assert.equal(
        JSON.stringify(result)
        , JSON.stringify([0])
      );
    });
  });
});
