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

var UI = UI || {};

UI.tag = name => "<" + name + ">";

UI.elementMaker = name => content => $(UI.tag(name)).append(content);

UI.div = UI.elementMaker("div");

UI.span = UI.elementMaker("span");

UI.section = UI.elementMaker("section");

UI.h1 = UI.elementMaker("h1");

UI.h2 = UI.elementMaker("h2");

UI.h3 = UI.elementMaker("h3");

UI.unorderedList = UI.elementMaker("ul");

UI.listItem = UI.elementMaker("li");

UI.unorderedListWithItems = content => UI.unorderedList(content.map(UI.listItem));

UI.label = UI.elementMaker("label");

UI.input = UI.elementMaker("input");

UI.checkbox = (name, content, isChecked) =>
  UI.label(
    UI.input()
      .attr("type", "checkbox")
      .attr("name", name)
      .prop("checked", isChecked)
  ).append(content);

UI.button = UI.elementMaker("button");
