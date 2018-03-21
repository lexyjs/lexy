
export default class Node {
  constructor(value, type, children = []) {
    this.value = value ? [ value ]: [];
    this.type = type;
    this.children = children;
  }
};
