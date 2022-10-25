import { Component, ReactNode } from 'react'
import { Link } from 'react-router-dom'


export default class Home extends Component {
  render (): ReactNode {
    return (
      <div>
        <h1>Hello World</h1>
        <Link to="city-list">城市选择页面</Link>
      </div>
    )
  }
}