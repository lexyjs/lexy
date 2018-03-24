
export default class Node {
  constructor(value, type, children = []) {

    // Prevents creating a "type:undefined" property
    if (type) {
      this.type = type;
    }

    this.value = value ? [ value ]: [];
    this.children = children;
  }
};
