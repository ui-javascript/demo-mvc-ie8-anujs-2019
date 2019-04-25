import React, { Component, PropTypes } from 'react'
import $ from 'jquery'
import './carousel.css'

class Carousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIndex: this.props.activeIndex,      // ol索引值
      carouselDatas: this.props.carouselDatas,  // 数据
      contentIndex: this.props.activeIndex+1    // 实际轮播图片索引值
    }
    this.carouWidth = 0
    this.carouHeight = 0
    this.timer = null
    this.handlePrev = this.handlePrev.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.clearTimer = this.clearTimer.bind(this)
    this.timerPosition = this.timerPosition.bind(this)
  }

  // 数据加载之前在头尾部分各复制一份作为轮播图数据
  componentWillMount () {
    let data = []
    data = data.concat(this.state.carouselDatas[this.state.carouselDatas.length-1], this.state.carouselDatas, this.state.carouselDatas[0] )
    this.setState({carouselDatas: data})
    //console.log(this.state.carouselDatas)
    //console.log(data)
  }

  componentDidMount () {
    this.calluctWidth(this.carousel)
    setTimeout(() => {this.calluctWidth(this.carousel)}, 1000)
    this.props.animated ? this.timerPosition(this.carousel) : ''
    $(window).on('resize', () => {this.calluctWidth(this.carousel)})
    //console.log(this.state.activeIndex)
  }

  // 索引值修改后触发动画到相应的位置
  componentDidUpdate () {
    //console.log('activeIndex: ' + this.state.activeIndex)
    //console.log('contentIndex ' + this.state.contentIndex)
    this.changePosition(($(this.carousel).find('.carousel-inner')), this.state.contentIndex)
  }

  componentWillUnmount () {
    this.clearTimer()
  }

  // 左侧点击修改相关索引值
  handlePrev (event) {
    this.state.activeIndex > 0 ?
      this.setState({ activeIndex: this.state.activeIndex - 1 }) :
      this.setState({ activeIndex: this.props.carouselDatas.length - 1 })
    this.changeCarrou($(event.currentTarget))
  }

  // 右侧点击修改相关索引值
  handleNext (event) {
    this.state.activeIndex < this.props.carouselDatas.length - 1 ?
      this.setState({ activeIndex: this.state.activeIndex + 1 }) :
      this.setState({ activeIndex: 0 })
    this.changeCarrou($(event.currentTarget))
  }

  // ol点击修改索引
  changeIndica (index) {
    //console.log('ol: ' + index)
    this.setState({ activeIndex: index })
    this.setState({ contentIndex: index+1 })
  }

  // 根据点击左侧还是右侧修改轮播图索引
  changeCarrou ($element) {
    if ($element.hasClass('left')) {
      //console.log('left')
      this.state.contentIndex > 0 ?
        this.setState({ contentIndex: this.state.contentIndex - 1 }) :
        this.setState({ contentIndex: this.state.carouselDatas.length - 1 })
    } else if ($element.hasClass('right')) {
      //console.log('right')
      this.state.contentIndex < this.state.carouselDatas.length - 1 ?
        this.setState({ contentIndex: this.state.contentIndex+1 }) :
        this.setState({ contentIndex: 0 })
    }
  }

  // 动画函数
  changePosition ($element, num) {
    if (num == this.state.carouselDatas.length - 1) {
      setTimeout(() => {
        num = 1
        $element.css('left', -(this.carouWidth*num)+'px')
        this.setState({ contentIndex: num })
      }, 300)
    } else if (num == 0) {
      setTimeout(() => {
        num = this.state.carouselDatas.length - 2
        $element.css('left', -(this.carouWidth*num)+'px')
        this.setState({ contentIndex: num })
      }, 300)
    }
    $element.stop().animate({left: -(this.carouWidth*num)+'px'}, 200)
    //console.log('num ' + num)
  }

  // 自动轮播
  timerPosition (element) {
    let $right = $(element).find('.right')
    clearInterval(this.timer)
    if (this.props.animated) {
      this.timer = setInterval(() => {
        this.state.activeIndex < this.props.carouselDatas.length - 1 ?
          this.setState({ activeIndex: this.state.activeIndex + 1 }) :
          this.setState({ activeIndex: 0 })
        this.state.contentIndex < this.state.carouselDatas.length - 1 ?
          this.setState({ contentIndex: this.state.contentIndex+1 }) :
          this.setState({ contentIndex: 0 })
      }, 4000)
    } else {
      return false
    }
  }

  // 取消自动轮播动画
  clearTimer () {
    //console.log('clear timeout')
    clearInterval(this.timer)
  }

  // 初始化页面计算相应的宽高
  calluctWidth (element) {
    this.carouWidth = $(element).width()
    this.carouHeight = $(element).find('img').eq(0).height()
    let $carinner = $(element).find('.carousel-inner')
    let $carinnerItem = $(element).find('.carousel-inner .item')

    $carinner.css('width', this.carouWidth*(this.state.carouselDatas.length)+'px')
    $carinner.css('left', -(this.carouWidth*(this.state.activeIndex+1))+'px')
    $carinnerItem.css('width', this.carouWidth+'px')
    setTimeout(() => {$(element).css('height', this.carouHeight+'px')}, 0)
  }

  render () {
    let self = this
    let carouselDatas = this.state.carouselDatas
    let activeIndex = this.state.activeIndex

    return (
      <div className="carousel" ref={(carousel) => {this.carousel = carousel}} onMouseOver={this.clearTimer} onMouseOut={this.timerPosition}>
        <ol className="carousel-indicators">
          {this.props.carouselDatas.map((menu, index) => {
            return <li key={"ind-"+index} data-slide-to={index} className={activeIndex==index ? "active" : ""} onClick={this.changeIndica.bind(this, index)}></li>
          })}
        </ol>
        <div className="carousel-inner">
          {carouselDatas.map((menu, index) => {
            return (
              <div className={"item" + (activeIndex==index ? " active" : "")}>
                <img src={menu.src} alt={menu.alt} />
                <div className="carousel-caption">{menu.caption}</div>
              </div>
            )
          })}
        </div>
        <a href="javascript:void(0);" className="left carousel-control" onClick={this.handlePrev}><span className="fa fa-angle-left"></span></a>
        <a href="javascript:void(0);" className="right carousel-control" onClick={this.handleNext}><span className="fa fa-angle-right"></span></a>
      </div>
    )
  }
}

Carousel.propTypes = {
  activeIndex: PropTypes.number,
  animated: PropTypes.bool
}

Carousel.defaultProps = {
  activeIndex: 0,
  animated: true
}

export default Carousel
