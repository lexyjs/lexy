
const expect = require('chai').expect
const { Token, Node } = require('../lib/lexy')

describe('types', () => {
  it('Token', () => {
    expect(new Token('value', 'type')).to.eql({
      type: 'type',
      value: 'value'
    })
  })
  it('Node', () => {
    expect(new Node('value', 'type')).to.eql({
      type: 'type',
      value: ['value'],
      children: []
    })
  })
})
