import React, {Component} from 'react';

import LayoutLR from '../../common-views/LayoutLR'
import LeftMenu from '../../common-views/LeftMenu'
import MainFrame from '../../common-views/MainFrame'
import {doc_routes} from '../../../views/routes'

const DocPage = LayoutLR(LeftMenu,MainFrame)(doc_routes)();

export default DocPage;