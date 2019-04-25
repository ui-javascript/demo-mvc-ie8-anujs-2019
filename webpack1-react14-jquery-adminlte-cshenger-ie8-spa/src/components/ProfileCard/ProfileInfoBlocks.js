import React, { Component, PropTypes } from 'react'

class ProfileInfoList extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let descriptionBlocks = this.props.list.map((info, iterator) => {
      return (
        <div className="col-sm-4 border-right" key={iterator}>
          <div className="description-block">
            <h5 className="description-header">{info.stats}</h5>
            <span className="description-text">{info.description}</span>
          </div>
        </div>
      )
    })

    return (
      <div className="row">
        {descriptionBlocks}
      </div>
    )
  }
}

export default ProfileInfoList
