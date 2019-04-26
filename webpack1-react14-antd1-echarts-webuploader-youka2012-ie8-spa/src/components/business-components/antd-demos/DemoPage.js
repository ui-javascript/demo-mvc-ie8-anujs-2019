import React, {Component} from 'react';

import LayoutLR from '../../common-views/LayoutLR'
import LeftMenu from '../../common-views/LeftMenu'
import MainFrame from '../../common-views/MainFrame'
import {antd_demo_routes} from '../../../views/routes'

const DemoPage = LayoutLR(LeftMenu,MainFrame)(antd_demo_routes)();

export default DemoPage;