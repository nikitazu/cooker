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

    const fuzzyIndex = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
      const x = list[i].split(" ").map(a => a[0]).join("");
      fuzzyIndex[i] = x;
    }
    this._fuzzyIndex = fuzzyIndex;

    const loFuzzyIndex = new Array(list.length);
    for (let i = 0; i < list.length; i++) {
      loFuzzyIndex[i] = fuzzyIndex[i].toLowerCase();
    }
    this._loFuzzyIndex = loFuzzyIndex;
  }

  findIndices(criteria) {
    const list = this._list;
    const indices = [];

    for (let i = 0; i < list.length; i++)
    {
      if (list[i].indexOf(criteria) != -1
          || this._loIndex[i].indexOf(criteria) != -1)
      {
        indices.push(i);
        continue;
      }

      if (this._strippedIndex[i].indexOf(criteria) != -1
          || this._loStrippedIndex[i].indexOf(criteria) != -1)
      {
        indices.push(i);
        continue;
      }

      if (this._fuzzyIndex[i].indexOf(criteria) != -1
          || this._loFuzzyIndex[i].indexOf(criteria) != -1)
      {
        indices.push(i);
        continue;
      }
    }

    return indices;
  }
}
