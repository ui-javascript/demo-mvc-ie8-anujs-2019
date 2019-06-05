import React, { Component, PropTypes } from 'react'

class Contacts extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="direct-chat-contacts">
        <ul className="contacts-list">
          {this.props.contacts.map((contactDetails, iteator) => {
            return (
              <li key={"contact"+iteator}>
                <a href={contactDetails.link}>
                  <img className="contacts-list-img" src={contactDetails.displayPicture} />
                  <div className="contacts-list-info">
                    <span className="contacts-list-name">
                      {contactDetails.displayName}
                      <small className="contacts-list-date pull-right">
                        {contactDetails.date}
                      </small>
                    </span>
                    <span className="contacts-list-msg">
                      {contactDetails.message}
                    </span>
                  </div>
                  {/* /.contacts-list-info */}
                </a>
              </li>
            )
          })}
          {/* End Contact Item */}
        </ul>
        {/* /.contatcts-list */}
      </div>
    )
  }
}

export default Contacts
