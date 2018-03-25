
const expect = require('chai').expect
const { Token, scanner } = require('../dist/lexy')

describe('scanner', () => {
  it('supports empty input', () => {
    let scan = scanner({
      vocabulary: [{ type: 'A', pattern: /a/ }]
    })

    expect(scan()).to.eql([])
    expect(scan('')).to.eql([])
  })
  it('supports symbol flattening (flatten)', () => {
    let scan = scanner({
      vocabulary: [{ type: '#!$', pattern: /[#!$]/, flatten: true }]
    })

    expect(scan('$#!')).to.eql([
      new Token('$', '$'),
      new Token('#', '#'),
      new Token('!', '!')
    ])
  })
  it('supports greedy tokens (greedy)', () => {
    let scan = scanner({
      vocabulary: [{ type: 'A', pattern: /a/ }]
    })

    expect(scan('aaa')).to.eql([
      new Token('a', 'A'),
      new Token('a', 'A'),
      new Token('a', 'A')
    ])

    scan = scanner({
      vocabulary: [{ type: 'A', pattern: /a/, greedy: true }]
    })

    expect(scan('aaa')).to.eql([
      new Token('aaa', 'A')
    ])
  })
  it('supports token transforms (transform)', () => {
    let scan = scanner({
      vocabulary: [{ type: 'NUM', pattern: /\d+/, transform: value => parseFloat(value) }]
    })

    expect(scan('123')).to.eql([
      new Token(123.0, 'NUM')
    ])
  })
})
