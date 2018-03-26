
const expect = require('chai').expect
const { parser } = require('../dist/lexy')

describe('parser', () => {
  it('supports non-recursive productions', () => {
    let parse = parser({
      grammar: [{ type: 'exp', pattern: 'WORD' }]
    })

    let tree = parse([{ type: 'WORD', value: 'hello' }])

    expect(tree).to.eql({
      type: 'exp',
      value: [{ type: 'WORD', value: 'hello' }],
      children: []
    })
  })
})
