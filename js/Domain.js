function Domain() {
  function findRecommentedPlants(plants, currentPlantIds) {
    const missingPlants = plantsExceptIds(plants, currentPlantIds);
    return mapFilter(missingPlants, plant => {
      const mutations = plant.mutations.filter(m => isMutationPossible(m, currentPlantIds));
        return mutations.length > 0
        ? { id: plant.id, name: plant.name, mutations: mutations }
        : false;
    });
  }

  function plantsExceptIds(plants, ids) {
    return plants.filter(plant => !isGrownPlant(ids, plant));
  }

  function isGrownPlant(grownIds, plant) {
    return _.contains(grownIds, plant.id);
  }

  function isMutationPossible(mutation, avaliablePlantIds) {
    return mutation.parents.every(p => _.contains(avaliablePlantIds, p.id));
  }

  function mapFilter(list, func) {
    const result = [];
    for (let x of list) {
      const tmp = func(x);
      if (tmp) {
        result.push(tmp);
      }
    }
    return result;
  }

  return {
    findRecommentedPlants: findRecommentedPlants
  };
}
