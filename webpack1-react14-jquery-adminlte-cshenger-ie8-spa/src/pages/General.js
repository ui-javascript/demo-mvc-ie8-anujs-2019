import React, { Component, PropTypes } from 'react'
import { NavDropdown, MenuItem } from 'react-bootstrap'

import Pages from './Pages'
import ContentHeader from '../components/ContentHeader'
import Breadcrumb from '../components/Breadcrumb'
import Box from '../components/Box'
import AlertInfo from '../components/AlertInfo'
import Callout from '../components/Callout'
import CustomTabs, { CustomTabsTab, CustomTabsMuted, CustomTabsHeader } from '../components/CustomTabs'
import Accordion, { AccordionPanel } from '../components/Accordion'
import Carousel from '../components/Carousel'
import Progressbar from '../components/Progressbar'

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
    name: "General UI",
    active: true
  }
]

// Carousel 测试数据
var carouselDatas = [
  {
    src: 'http://placehold.it/900x500/39CCCC/ffffff&text=I+Love+Bootstrap',
    alt: 'First Slide',
    caption: 'First Slide'
  },
  {
    src: 'http://placehold.it/900x500/3c8dbc/ffffff&text=I+Love+Bootstrap',
    alt: 'Second Slide',
    caption: 'Second Slide'
  },
  {
    src: 'http://placehold.it/900x500/f39c12/ffffff&text=I+Love+Bootstrap',
    alt: 'Third Slide',
    caption: 'Third Slide'
  },
]

class General extends Component {
  render () {
    return (
      <div>
        <ContentHeader content="General UI" title="Preview of UI elements">
          <Breadcrumb breads={breads} />
        </ContentHeader>
        <section className="content">
          {/*Alerts and Callouts*/}
          <h2 className="page-header">Alerts and Callouts</h2>
          <div className="row">
            <Box width = {6} border = {false} title="Alerts" headerIcon="fa-warning" boxTools={['collapse']}>
              <AlertInfo theme="alert-danger" icon="fa-ban" title="Alert!" content="Danger alert preview. This alert is dismissable. A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart." />
              <AlertInfo theme="alert-info" icon="fa-info" title="Alert!" content="Info alert preview. This alert is dismissable." />
              <AlertInfo theme="alert-warning" icon="fa-warning" title="Alert!" content="Warning alert preview. This alert is dismissable." />
              <AlertInfo theme="alert-success" icon="fa-check" title="Alert!" content="Success alert preview. This alert is dismissable." />
            </Box>

            <Box width = {6} border = {false} title="Alerts" headerIcon="fa-bullhorn" boxTools={['collapse']}>
              <Callout theme="callout-danger" title="I am a danger callout!" content="There is a problem that we need to fix. A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart." />
              <Callout theme="callout-info" title="I am an info callout!" content="Follow the steps to continue to payment." />
              <Callout theme="callout-warning" title="I am a warning callout!" content="This is a yellow callout." />
              <Callout theme="callout-success" title="I am a success callout!" content="This is a green callout." />
            </Box>
          </div>

          {/*AdminLTE Custom Tabs*/}
          <h2 className="page-header">AdminLTE Custom Tabs</h2>
          <div className="row">
            <section className="col-md-6">
              <CustomTabs
                activeIndex = {1}
                muted = {<CustomTabsMuted />}
                dropdown = {
                  <NavDropdown eventKey="3" title="Dropdown">
                    <MenuItem eventKey="3.1">Action</MenuItem>
                    <MenuItem eventKey="3.2">Another action</MenuItem>
                    <MenuItem eventKey="3.3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="3.4">Separated link</MenuItem>
                  </NavDropdown>
                }
              >
                <CustomTabsTab title="Tab 1" >
                  <b>How to use:</b>
                  <p>Exactly like the original bootstrap tabs except you should use
                    the custom wrapper <code>.nav-tabs-custom</code> to achieve this style.</p>
                  <p>A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my whole heart.
                  I am alone, and feel the charm of existence in this spot,
                  which was created for the bliss of souls like mine. I am so happy,
                  my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
                  that I neglect my talents. I should be incapable of drawing a single stroke
                  at the present moment; and yet I feel that I never was a greater artist than now.</p>
                </CustomTabsTab>
                <CustomTabsTab title="Tab 2" >
                  <p>The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages.</p>
                </CustomTabsTab>
                <CustomTabsTab title="Tab 3" >
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </CustomTabsTab>
              </CustomTabs>
            </section>

            <section className="col-md-6">
              <CustomTabs
                pullRight = {true}
                dropdown = {
                  <NavDropdown eventKey="3" title="Dropdown">
                    <MenuItem eventKey="3.1">Action</MenuItem>
                    <MenuItem eventKey="3.2">Another action</MenuItem>
                    <MenuItem eventKey="3.3">Something else here</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="3.4">Separated link</MenuItem>
                  </NavDropdown>
                }
                header = { <CustomTabsHeader title="Custom Tabs" /> }
              >
                <CustomTabsTab title="Tab 1" >
                  <b>How to use:</b>
                  <p>Exactly like the original bootstrap tabs except you should use
                    the custom wrapper <code>.nav-tabs-custom</code> to achieve this style.</p>
                  <p>A wonderful serenity has taken possession of my entire soul,
                  like these sweet mornings of spring which I enjoy with my whole heart.
                  I am alone, and feel the charm of existence in this spot,
                  which was created for the bliss of souls like mine. I am so happy,
                  my dear friend, so absorbed in the exquisite sense of mere tranquil existence,
                  that I neglect my talents. I should be incapable of drawing a single stroke
                  at the present moment; and yet I feel that I never was a greater artist than now.</p>
                </CustomTabsTab>
                <CustomTabsTab title="Tab 2" >
                  <p>The European languages are members of the same family. Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages.</p>
                </CustomTabsTab>
                <CustomTabsTab title="Tab 3" >
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    It has survived not only five centuries, but also the leap into electronic typesetting,
                    remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
                    sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.</p>
                </CustomTabsTab>
              </CustomTabs>
            </section>
          </div>

          {/*Progress Bars*/}
          <h2 className="page-header">Progress Bars</h2>
          <div className="row">
            <Box width={6} border={false} title="Progress bars">
              <Progressbar value={50} />
              <Progressbar theme="green" value={40} />
              <Progressbar theme="aqua" value={20} />
              <Progressbar theme="yellow" value={60} />
              <Progressbar theme="red" value={80} />
            </Box>

            <Box width={6} border={false} title="Progress Bars Different Sizes">
              <p><code>.progress</code></p>
              <Progressbar striped={true} value={40} />
              <p>Class:<code>.sm</code></p>
              <Progressbar theme="success" active={true} sm={true} striped={true} value={20} />
              <p>Class:<code>.xs</code></p>
              <Progressbar theme="warning" xs={true} striped={true} value={60} />
              <p>Class:<code>.xxs</code></p>
              <Progressbar theme="danger" xxs={true} striped={true} value={60} />
            </Box>

            <Box width={6} border={false} title="Vertical Progress bars">
              <div className="text-center">
                <p>By adding the class <code>.vertical</code> we achieve:6</p>
                <Progressbar vertical={true} theme="primary" value={50} />
                <Progressbar vertical={true} theme="green" value={40} />
                <Progressbar vertical={true} theme="aqua" value={20} />
                <Progressbar vertical={true} theme="yellow" value={60} />
                <Progressbar vertical={true} theme="red" value={80} />
              </div>
            </Box>

            <Box width={6} border={false} title="Vertical Progress Bars Different Sizes">
              <div className="text-center">
                <p>By adding the class <code>.vertical</code> and <code>.progress-sm</code>, <code>.progress-xs</code> or <code>.progress-xxs</code> we achieve:</p>
                <Progressbar vertical={true} striped={true} value={40} />
                <Progressbar vertical={true} theme="success" active={true} sm={true} striped={true} value={20} />
                <Progressbar vertical={true} theme="warning" xs={true} striped={true} value={60} />
                <Progressbar vertical={true} theme="danger" xxs={true} striped={true} value={60} />
              </div>
            </Box>
          </div>

          {/*Bootstrap Accordion & Carousel*/}
          <h2 className="page-header">Bootstrap Accordion & Carousel</h2>
          <div className="row">
            <Box width={6} border={false} title="Collapsible Accordion">
              <Accordion>
                <AccordionPanel title="Collapsible Group Item #1">
                  <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven&#39;t heard of them accusamus labore sustainable VHS.</p>
                </AccordionPanel>
                <AccordionPanel title="Collapsible Group Success" theme="box-success">
                  <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven&#39;t heard of them accusamus labore sustainable VHS.</p>
                </AccordionPanel>
                <AccordionPanel title="Collapsible Group Danger" theme="box-danger">
                  <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven&#39;t heard of them accusamus labore sustainable VHS.</p>
                </AccordionPanel>
              </Accordion>
            </Box>

            <Box width={6} border={false} title="Carousel">
              <Carousel carouselDatas={carouselDatas} />
            </Box>
          </div>

        </section>
      </div>
    )
  }
}

General = Pages(General)

export default General
