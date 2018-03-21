
export default class Node {
  constuctor(value, type) {
    this.value = value ? [ value ]: [];
    this.type = type;
    this.children = [];
  }
};
