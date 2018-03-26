
export default class Token {
  constructor (value, type) {
    this.value = typeof value !== 'undefined' ? value : ''
    this.type = typeof type !== 'undefined' ? type : ''
  }
};
