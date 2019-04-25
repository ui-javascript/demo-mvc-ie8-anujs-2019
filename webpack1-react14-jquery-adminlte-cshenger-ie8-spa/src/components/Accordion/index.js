import React, { Component, PropTypes, Children } from 'react'
import $ from 'jquery'

class AccordionPanel extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div>{this.props.children}</div>
    )
  }
}

AccordionPanel.propTypes = {
  expanded: PropTypes.bool
}
AccordionPanel.defaultProps = {
  expanded: false,
  theme: "box-primary"
}

class Accordion extends Component {
  constructor (props) {
    super(props)
    this.state = { currentIndex: this.props.activeIndex }
    this.getTitleActie = this.getTitleActie.bind(this)
    this.getContentActive = this.getContentActive.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  getTitleActie (index) {
    return index == this.state.currentIndex ? "" : "collapsed"
  }

  getContentActive (index) {
    return index == this.state.currentIndex ? "panel-collapse collapse in" : "panel-collapse collapse"
  }

  // 我以为动画效果是由样式名+css3控制的，谁知道也是jquery
  handleToggle (e) {
    let $a = $(e.currentTarget)
    let $panel = $a.parents('.panel')

    $panel.siblings('.panel').find('.panel-collapse').removeClass('in').css('display', 'none')
    $panel.siblings('.panel').find('.box-title a').addClass('collapsed')

    if (!$a.hasClass("collapsed")) {
      $a.addClass("collapsed")
      $panel.find('.panel-collapse').slideUp(200).removeClass('in')
    } else {
      $a.removeClass("collapsed")
      $panel.find('.panel-collapse').slideDown(200).addClass('in')
    }
  }

  render () {
    return (
      <div className="box-group">
        {Children.map(this.props.children, (element, index) => {
          return (
            <div className={"panel box "+element.props.theme}>
              <div className="box-header with-border">
                <h4 className="box-title">
                  <a href="javascript:void(0);"
                    className={this.getTitleActie(index)}
                    onClick={this.handleToggle}>
                    {element.props.title}
                  </a>
                </h4>
              </div>
              <div className={this.getContentActive(index)}>
                <div className="box-body">
                  {element.props.children}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

Accordion.propTypes = {
  activeIndex: PropTypes.number
}
Accordion.defaultProps = {
  activeIndex: 0
}

export default Accordion
export { AccordionPanel }
