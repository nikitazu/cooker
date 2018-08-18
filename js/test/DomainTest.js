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
});
