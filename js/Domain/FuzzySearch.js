export default class FuzzySearch {
  constructor(list) {
    this._list = list;
    this._lettersRe = new RegExp("[^A-Za-z]+", "g");
  }

  findIndices(criteria) {
    const list = this._list;
    const indices = [];

    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      const itemLower = item.toLowerCase();
      if (item.indexOf(criteria) != -1
          || itemLower.indexOf(criteria) != -1)
      {
        indices.push(i);
      }
      else
      {
        const itemStripped = item.replace(this._lettersRe, "");
        const itemStrippedLower = itemStripped.toLowerCase();
        if (itemStripped.indexOf(criteria) != -1
            || itemStrippedLower.indexOf(criteria) != -1)
        {
          indices.push(i);
        }
      }
    }

    return indices;
  }
}
