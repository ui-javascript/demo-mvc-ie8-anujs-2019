import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ClosePng from 'static/imgs/close.png';
import Tabs, { TabPane } from 'rc-tabs';
import TabContent from 'rc-tabs/lib/TabContent';
import ScrollableInkTabBar from 'rc-tabs/lib/ScrollableInkTabBar';
import 'rc-tabs/assets/index.css';
import { tabChange, activeKeyChange } from '../ducks';

const initTabs = [
  {
    name: '首页',
    code: 'index',
    content: <div />,
  },
];

class Center extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    activeKey: PropTypes.string,
    onTabChange: PropTypes.func.isRequired,
    onActiveKeyChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    tabs: [],
    activeKey: '',
  };

  componentDidMount = () => {
    const { onTabChange, onActiveKeyChange } = this.props;
    onTabChange(initTabs);
    onActiveKeyChange('index');
  };

  onChange = activeKey => {
    const { onActiveKeyChange } = this.props;
    onActiveKeyChange(activeKey);
  };

  remove = code => {
    const { tabs, activeKey, onTabChange, onActiveKeyChange } = this.props;

    let foundIndex = 0;
    const after = tabs.filter((t, i) => {
      if (t.code !== code) {
        return true;
      }
      foundIndex = i;
      return false;
    });
    let aKey = activeKey;
    if (aKey === code) {
      if (foundIndex) {
        foundIndex -= 1;
      }
      aKey = after[foundIndex].code;
    }
    onTabChange(after);
    onActiveKeyChange(activeKey);
  };

  render() {
    const { activeKey, tabs } = this.props;
    return (
      <div>
        <Tabs
          renderTabBar={() => <ScrollableInkTabBar />}
          renderTabContent={() => <TabContent animated={false} />}
          activeKey={activeKey}
          onChange={this.onChange}
        >
          {tabs.map(tab => (
            <TabPane
              tab={
                <span>
                  {tab.name}
                  {tab.name !== '首页' && (
                    <button
                      type="button"
                      className="close_tab"
                      onClick={() => {
                        this.remove(tab.code);
                      }}
                    >
                      <img src={ClosePng} alt="" />
                    </button>
                  )}
                </span>
              }
              key={tab.code}
            >
              <div>{tab.content}</div>
            </TabPane>
          ))}
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tabs: state.desktop.tabs,
  activeKey: state.desktop.activeKey,
});

const mapDispatchToProps = {
  onTabChange: tabChange,
  onActiveKeyChange: activeKeyChange,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Center);
