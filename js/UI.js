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
