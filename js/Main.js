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

import Controller from "./Controller.js";
import DataStore from "./DataStore.js";
import Domain from "./Domain.js";
import Logger from "./Logger.js";
import View from "./View.js";
import UI from "./UI.js";

function main() {
  const app = $("#app");
  const windowMinWidth = 886;
  if (window.innerWidth < windowMinWidth) {
    const windowMinWidthError = `Your screen is too tight (${window.innerWidth} px), make it at least ${windowMinWidth} px in width, and refresh the page.`;
    app.append(windowMinWidthError);
    throw Error(windowMinWidthError);
  }

  const logger     = new Logger($("#log"));
  const controller = new Controller(
    logger
    , new DataStore(localStorage, logger)
    , new Domain()
    , new View(UI, logger, app)
  );
  controller.init();
}

$(() => main());
