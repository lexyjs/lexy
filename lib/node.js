
export default class Node {
  constructor(value, type) {
    this.value = value ? [ value ]: [];
    this.type = type;
    this.children = [];
  }
};
