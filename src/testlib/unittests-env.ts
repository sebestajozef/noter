import {shallow} from 'enzyme'
import chai, {expect} from 'chai'
import chaiCheerio from 'chai-cheerio'
import chaiEnzyme from 'chai-enzyme'
import React from 'react'
import sinon from 'sinon'

chai.use(require('chai-as-promised'))
chai.use(require('sinon-chai'))
chai.use(chaiEnzyme())
chai.use(chaiCheerio)
exports.React = React
exports.shallow = shallow
exports.expect = expect
exports.chai = chai
exports.sinon = sinon

exports.children = element => element.shallow().children()
