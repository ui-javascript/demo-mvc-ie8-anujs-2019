import React, { Component, PropTypes } from 'react'
import $ from 'jquery'

class ModalHeader extends Component {
  constructor (props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose () {
    this.props.onClose()
  }

  render () {
    return (
      <div className="modal-header">
        <button type="button" className="close" onClick={this.handleClose}><span aria-hidden="true">×</span></button>
        <h4 className="modal-title">{this.props.title}</h4>
      </div>
    )
  }
}

class ModalBody extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="modal-body">
        {this.props.children}
      </div>
    )
  }
}

class ModalFooter extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="modal-footer">
        {this.props.children}
      </div>
    )
  }
}

class Modal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      show: this.props.show
    }
    this.handleClose = this.handleClose.bind(this)
  }

  componentDidMount () {
    if (this.state.show) {
      this.modal.style.display = "block"
      this.modal.className += " in"
    } else {
      this.modal.style.display = "none"
      this.modal.className = this.modal.className.replace(/ in/g, "")
    }
    $(document).on('keydown', (e) => {
      if (e.keyCode == 27) this.setState({ show: false })
    })
  }

  componentWillUnmount () {
    $(document).off('keydown')
    this.setState({ show: false })
  }

  componentWillReceiveProps (nextProps) {
    nextProps.show ? this.setState({ show: true }) : this.setState({ show: false })
  }

  componentDidUpdate () {
    if (this.state.show) {
      this.modal.style.display = "block"
      setTimeout(() => {
        this.modal.className += " in"
      }, 17)
    } else {
      this.modal.className = this.modal.className.replace(/ in/g, '')
      setTimeout(() => {
        this.modal.style.display = "none"
      }, 200)
    }
  }

  handleClose (e) {
    this.props.onClose(e)
  }

  render () {
    let self = this

    return (
      <div ref={(modal) => this.modal = modal}
        className={"modal fade modal-"+this.props.theme}
        onClick={this.handleClose}>
        <div className={"modal-dialog"+(this.props.size ? " modal-"+this.props.size : "")}>
          <div className="modal-content" onClick={(e) => {e.stopPropagation()}}>
            <ModalHeader title={this.props.title} onClose={this.handleClose} />
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
}

Modal.defaultProps = {
  theme: "default"
}

export default Modal
export { ModalBody, ModalFooter }
