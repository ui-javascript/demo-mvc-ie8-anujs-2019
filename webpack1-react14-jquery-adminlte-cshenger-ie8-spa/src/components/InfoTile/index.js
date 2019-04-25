import React, { Component, PropTypes } from 'react'

class InfoTile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      infoTheme: ""
    }
  }

  componentDidMount () {
    this.props.children ? this.setState({ infoTheme: this.props.theme }) : this.setState({ infoTheme: "" })
  }

  render () {
    return (
      <div className = {"col-md-"+this.props.width+" col-sm-6 col-xs-12"}>
        <div className={"info-box " + this.state.infoTheme}>
          <span className={"info-box-icon " + this.props.theme}>
            <i className={"fa "+this.props.icon}></i>
          </span>

          <div className="info-box-content">
            <span className="info-box-text">{this.props.subject}</span>
            <span className="info-box-number">{this.props.stats}</span>
            {this.props.children}
          </div>

          {this.props.content}
        </div>
      </div>
    )
  }
}

InfoTile.defaultProps = {
  content: '',
  width: 3,
  icon: 'fa-star-o',
  stats: '0',
  subject: 'Default Subject',
  theme: 'bg-aqua'
}

export default InfoTile
