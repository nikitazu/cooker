export default class FuzzySearch {
  constructor(list) {
    this._list = list;

    const loIndex = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
      loIndex[i] = list[i].toLowerCase();
    }
    this._loIndex = loIndex;

    const re = new RegExp("[^A-Za-z]+", "g");
    const strippedIndex = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
      strippedIndex[i] = list[i].replace(re, "");
    }
    this._strippedIndex = strippedIndex;

    const loStrippedIndex = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
      loStrippedIndex[i] = strippedIndex[i].toLowerCase();
    }
    this._loStrippedIndex = loStrippedIndex;
  }

  findIndices(criteria) {
    const list = this._list;
    const indices = [];

    for (let i = 0; i < list.length; i++) {
      if (list[i].indexOf(criteria) != -1
          || this._loIndex[i].indexOf(criteria) != -1)
      {
        indices.push(i);
      }
      else
      {
        if (this._strippedIndex[i].indexOf(criteria) != -1
            || this._loStrippedIndex[i].indexOf(criteria) != -1)
        {
          indices.push(i);
        }
      }
    }

    return indices;
  }
}
