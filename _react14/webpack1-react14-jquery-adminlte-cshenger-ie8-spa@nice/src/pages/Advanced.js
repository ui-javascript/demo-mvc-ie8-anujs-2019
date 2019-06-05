import React, { Component, PropTypes } from 'react'
require('../../public/plugins/daterangepicker/daterangepicker.css');

import Pages from './Pages'
import ContentHeader from '../components/ContentHeader'
import Breadcrumb from '../components/Breadcrumb'
import Box from '../components/Box'
import SelectTwo from '../components/SelectTwo'
import InputMask from '../components/InputMask'
import DatePicker from '../components/DatePicker'
import DateRangepicker from '../components/DateRangepicker'
import DateRangebtn from '../components/DateRangepicker/DateRangebtn'

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
    name: "Advanced Elements",
    active: true
  }
]

class Advanced extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.addScript('../../public/plugins/daterangepicker/moment.js', 'moment');
    this.addScript('../../public/plugins/daterangepicker/daterangepicker.js', 'daterangepicker');
  }

  componentWillUnmount () {
    this.removeScript('moment')
    this.removeScript('daterangepicker')
  }

  addScript (url, id) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.id = id;
    document.body.appendChild(script);
  }

  removeScript (id) {
    var dom = document.getElementById(id);
    dom.parentNode.removeChild(dom);
  }

  render () {
    return (
      <div>
        <ContentHeader content="Advanced Elements" title="new">
          <Breadcrumb breads={breads} />
        </ContentHeader>
        <section className="content">
          <div className="row">
            <Box width={12} border={false} title="Select2" boxTools={["collapse"]}
              footer={<span>Visit <a href="https://select2.github.io/">Select2 documentation</a> for more examples and information about the plugin.</span>}>
              <div className="row">

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Minimal</label>
                    <SelectTwo>
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option>California</option>
                      <option>Delaware</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Washington</option>
                    </SelectTwo>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Multiple</label>
                    <SelectTwo multiple={true} placeholder="Select a State">
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option>California</option>
                      <option>Delaware</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Washington</option>
                    </SelectTwo>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Disabled</label>
                    <SelectTwo disabled={true}>
                      <option>Alabama</option>
                      <option>Alaska</option>
                      <option>California</option>
                      <option>Delaware</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Washington</option>
                    </SelectTwo>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-group">
                    <label>Disabled Result</label>
                    <SelectTwo multiple={true}>
                      <option selected="selected">Alabama</option>
                      <option>Alaska</option>
                      <option disabled="disabled">California (disabled)</option>
                      <option>Delaware</option>
                      <option>Tennessee</option>
                      <option>Texas</option>
                      <option>Washington</option>
                    </SelectTwo>
                  </div>
                </div>

              </div>
            </Box>

            <Box width={6} border={false} theme="box-danger" title="Input masks" boxTools={["collapse"]}
              footer={<span>具体插件可查看<a href="https://github.com/RobinHerbots/Inputmask">Inputmask</a></span>}>
              <div className="form-group">
                <label>Date masks:</label>
                <InputMask icon="fa-calendar" mask="calendar-dd" />
              </div>
              <div className="form-group">
                <InputMask icon="fa-calendar" mask="calendar-mm" />
              </div>
              <div className="form-group">
                <label>US phone mask:</label>
                <InputMask icon="fa-phone" mask="phone-us" />
              </div>
              <div className="form-group">
                <label>Intl US phone mask:</label>
                <InputMask icon="fa-phone" mask="phone-usin" />
              </div>
              <div className="form-group">
                <label>IP mask:</label>
                <InputMask icon="fa-laptop" mask="ip" />
              </div>
            </Box>

            <Box width={6} border={false} theme="box-primary" title="Date picker" boxTools={["collapse"]}
              footer={<span>参考：<a href="https://bootstrap-datepicker.readthedocs.io/en/latest/index.html">bootstrap-datepicker</a>和<a href="https://www.facilities.umd.edu/Style%20Library/FM%20Publishing/JQuery/daterangepicker/website/index.html">daterangepicker</a></span>}>
              <div className="form-group">
                <label>Date:</label>
                <DatePicker />
              </div>
              <div className="form-group">
                <label>Date range:</label>
                <DateRangepicker icon="fa-calendar" />
              </div>
              <div className="form-group">
                <label>Date and time range:</label>
                <DateRangepicker icon="fa-clock-o" time={true} />
              </div>
              <div className="form-group">
                <label>Date range button:</label>
                <DateRangebtn />
              </div>
            </Box>
          </div>
        </section>
      </div>
    )
  }
}

Advanced = Pages(Advanced)

export default Advanced
