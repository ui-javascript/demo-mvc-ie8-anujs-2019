import React, {Component} from 'react';

import './LayoutLR.css'

const MainLayoutFrame = (props) => {
    return (
        <div className='main-wrapper'>
            <div className="left-menu">
                <props.menu {...props} defaultSelect={props.defaultSelect}/>
            </div>
            <div className="main-contain">
                <props.main {...props} routes={props.routes}/>
            </div>
        </div>
    )
};

const LayoutLR = (menu, main) => (routes) => (defaultSelect) => {
    /*const Body = (props) =>
        <MainLayoutFrame
            {...props}
            menu={menu}
            main={main}
            routes={routes}
            defaultSelect={defaultSelect}
        />;*/
    class Body extends Component{
        constructor(props){
            super(props);
            console.log('layout init');
        }
        render(){
            return (
                <MainLayoutFrame
                    {...this.props}
                    menu={menu}
                    main={main}
                    routes={routes}
                    defaultSelect={defaultSelect}
                />
            )
        }
    };
    return Body;
};

export default LayoutLR;