import React, {Component} from 'react'
import {Menu, Card, Table} from 'antd'
import EkIcon from '@/components/EkIcon'
import './index.scss'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 1,
      user: {
        name: ''
      }
    }

    this.bind('handleClick')
    this.bind('asyncData')
  }


  bind(fn) {
    this[fn] = this[fn].bind(this)
  }

  handleClick() {

  }

  asyncData() {
    this.setState({
      user: {name: '用户A'}
    })
  }

  componentDidMount() {
    this.asyncData()
  }

  render() {
    return (
      <section class="home view overhidden">

        <main class="home-main view-main">
          {this.props.children}
        </main>

      </section>
    )
  }
}

export default Home
