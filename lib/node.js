
export default class Node {
  constructor(value, type, children = []) {
    this.value = value ? [ value ]: [];
    this.children = children;

    // Prevents creating a "type:undefined" property
    if (type) {
      this.type = type;
    }
  }
};
