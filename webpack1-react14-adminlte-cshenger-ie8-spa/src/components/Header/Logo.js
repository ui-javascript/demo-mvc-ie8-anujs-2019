import React, { Component, PropTypes } from 'react'

class Logo extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <a href={this.props.href} className="logo">
                {/*-- mini logo for sidebar mini 50x50 pixels --*/}
                <span className="logo-mini" 
                    dangerouslySetInnerHTML={{__html: this.props.logoMini}}  />
                {/*-- logo for regular state and mobile devices --*/}
                <span className="logo-lg" 
                    dangerouslySetInnerHTML={{__html: this.props.logoLg}}  />
            </a>
        )
    }
}

export default Logo