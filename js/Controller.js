function Controller(logger, store, domain, view) {
  logger.log("Controller.init");
  const doc = $(document);
  let plantList = [];

  function init(plants) {
    plantList = _.values(plants);
    const currentPlantIds = store.loadCurrentPlants() || ["wheat"];
    view.build(
      plantList
    , currentPlantIds
    , domain.findRecommentedPlants(plantList, currentPlantIds)
    );
    doc.on("change", "input[type='checkbox']", onPlantCheckboxChange);
  }

  function onPlantCheckboxChange(event) {
    logger.log("Controller.onPlantCheckboxChange");
    const currentPlantIds = doc
      .find("input[type='checkbox']")
      .toArray()
      .filter(cb => $(cb).is(":checked"))
      .map(cb => $(cb).attr("name"));
    logger.log("Controller.onPlantCheckboxChange " + currentPlantIds.join());
    view.updateRecommendedPlants(
      domain.findRecommentedPlants(plantList, currentPlantIds)
    );
    store.saveCurrentPlants(currentPlantIds);
  }

  return init;
}
