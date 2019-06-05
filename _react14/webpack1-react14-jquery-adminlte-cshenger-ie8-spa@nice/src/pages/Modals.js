import React, { Component, PropTypes } from 'react'

import Pages from './Pages'
import ContentHeader from '../components/ContentHeader'
import Breadcrumb from '../components/Breadcrumb'
import Box from '../components/Box'
import Modal, { ModalBody, ModalFooter } from "../components/Modal"
import Callout from '../components/Callout'
import { ButtonToolbar, Button } from 'react-bootstrap'

// 面包屑测试数据
var breads = [
  {
    icon: "fa fa-dashboard",
    url: "#",
    name: "Home",
    active: false
  },
  {
    url: "#",
    name: "Modals",
    active: true
  }
]

class Modals extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showdefault: false,
      showprimary: false,
      showinfo: false,
      showdanger: false,
      showwarning: false,
      showsuccess: false
    }

    this.showDefaultModal = this.showDefaultModal.bind(this)
    this.showPrimaryModal = this.showPrimaryModal.bind(this)
    this.showInfoModal = this.showInfoModal.bind(this)
    this.showDangerModal = this.showDangerModal.bind(this)
    this.showWarningModal = this.showWarningModal.bind(this)
    this.showSuccessModal = this.showSuccessModal.bind(this)

    this.closeDefaultModal = this.closeDefaultModal.bind(this)
    this.closePrimaryModal = this.closePrimaryModal.bind(this)
    this.closeInfoModal = this.closeInfoModal.bind(this)
    this.closeDangerModal = this.closeDangerModal.bind(this)
    this.closeWarningModal = this.closeWarningModal.bind(this)
    this.closeSuccessModal = this.closeSuccessModal.bind(this)
  }

  showDefaultModal () {this.setState({ showdefault: true })}
  showPrimaryModal () {this.setState({ showprimary: true })}
  showInfoModal () {this.setState({ showinfo: true })}
  showDangerModal () {this.setState({ showdanger: true })}
  showWarningModal () {this.setState({ showwarning: true })}
  showSuccessModal () {this.setState({ showsuccess: true })}

  closeDefaultModal () {this.setState({ showdefault: false })}
  closePrimaryModal () {this.setState({ showprimary: false })}
  closeInfoModal () {this.setState({ showinfo: false })}
  closeDangerModal () {this.setState({ showdanger: false })}
  closeWarningModal () {this.setState({ showwarning: false })}
  closeSuccessModal () {this.setState({ showsuccess: false })}

  render () {
    return (
      <div>
        <ContentHeader content="Modals" title="new">
          <Breadcrumb breads={breads} />
        </ContentHeader>
        <section className="content">
          <Callout theme="callout-info" title="Reminder!" content="Instructions for how to use modals are available on the Bootstrap documentation" />
          <div className="row">
            <Box width={12} border={false}>
              <ButtonToolbar>
                <Button onClick={this.showDefaultModal}>Launch Default Modal</Button>
                <Button bsStyle="primary" onClick={this.showPrimaryModal}>Launch Primary Modal</Button>
                <Button bsStyle="info" onClick={this.showInfoModal}>Launch Info Modal</Button>
                <Button bsStyle="danger" onClick={this.showDangerModal}>Launch Danger Modal</Button>
                <Button bsStyle="warning" onClick={this.showWarningModal}>Launch Warning Modal</Button>
                <Button bsStyle="success" onClick={this.showSuccessModal}>Launch Success Modal</Button>
              </ButtonToolbar>
            </Box>
          </div>
        </section>

        <Modal show={this.state.showdefault} title="Modal title" onClose={this.closeDefaultModal}>
          <ModalBody>
            <p>这里是内容</p>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-default pull-left" onClick={this.closeDefaultModal}>Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </ModalFooter>
        </Modal>

        <Modal theme="primary" show={this.state.showprimary} title="Modal title" onClose={this.closePrimaryModal}>
          <ModalBody>
            <p>这里是内容</p>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline pull-left" onClick={this.closePrimaryModal}>Close</button>
            <button type="button" className="btn btn-outline">Save changes</button>
          </ModalFooter>
        </Modal>

        <Modal theme="info" show={this.state.showinfo} title="Modal title" onClose={this.closeInfoModal}>
          <ModalBody>
            <p>这里是内容</p>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline pull-left" onClick={this.closeInfoModal}>Close</button>
            <button type="button" className="btn btn-outline">Save changes</button>
          </ModalFooter>
        </Modal>

        <Modal theme="danger" show={this.state.showdanger} title="Modal title" onClose={this.closeDangerModal}>
          <ModalBody>
            <p>这里是内容</p>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline pull-left" onClick={this.closeDangerModal}>Close</button>
            <button type="button" className="btn btn-outline">Save changes</button>
          </ModalFooter>
        </Modal>

        <Modal theme="warning" show={this.state.showwarning} title="Modal title" onClose={this.closeWarningModal}>
          <ModalBody>
            <p>这里是内容</p>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline pull-left" onClick={this.closeWarningModal}>Close</button>
            <button type="button" className="btn btn-outline">Save changes</button>
          </ModalFooter>
        </Modal>

        <Modal theme="success" show={this.state.showsuccess} title="Modal title" onClose={this.closeSuccessModal}>
          <ModalBody>
            <p>这里是内容</p>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-outline pull-left" onClick={this.closeSuccessModal}>Close</button>
            <button type="button" className="btn btn-outline">Save changes</button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

Modals = Pages(Modals)

export default Modals
