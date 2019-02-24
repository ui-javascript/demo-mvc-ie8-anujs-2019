import React, { Component } from 'react'

import { Button, Icon } from 'antd'
import './index.less'

const ButtonGroup = Button.Group

class ButtonView extends Component {
    constructor(props) {
        super(props)

        this.state= {
            loading: false,
            iconLoading: false,
        }

        this.enterLoading = this.enterLoading.bind(this)
        this.enterIconLoading = this.enterIconLoading.bind(this)
    }

    enterLoading() {
        this.setState({ loading: true });
    }

    enterIconLoading() {
        this.setState({ iconLoading: true });
    }

    render() {
        return (
            <div class="button-wrap">
                <div class="button-interval">
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="ghost">Ghost</Button>
                    <Button type="dashed">Dashed</Button>
                </div>
                <div class="button-interval">
                    <Button type="primary" shape="circle" icon="search" />
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="ghost" shape="circle-outline" icon="search" />
                    <Button type="ghost" icon="search">Search</Button>
                </div>
                <div class="button-interval">
                    <Button type="primary" size="large">Large</Button>
                    <Button type="primary">Default</Button>
                    <Button type="primary" size="small">Small</Button>
                </div>
                <div class="button-interval">
                    <Button type="primary">Primary</Button>
                    <Button type="primary" disabled>Primary(disabled)</Button>
                    <br />
                    <Button>Default</Button>
                    <Button disabled>Default(disabled)</Button>
                    <br />
                    <Button type="ghost">Ghost</Button>
                    <Button type="ghost" disabled>Ghost(disabled)</Button>
                    <br />
                    <Button type="dashed">Dashed</Button>
                    <Button type="dashed" disabled>Dashed(disabled)</Button>
                </div>
                <div>
                    <h4>Basic</h4>
                    <ButtonGroup>
                        <Button>Cancel</Button>
                        <Button type="primary">OK</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button disabled>L</Button>
                        <Button disabled>M</Button>
                        <Button disabled>R</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button type="primary">L</Button>
                        <Button>M</Button>
                        <Button type="ghost">M</Button>
                        <Button type="dashed">R</Button>
                    </ButtonGroup>

                    <h4>With Icon</h4>
                    <ButtonGroup>
                        <Button type="primary">
                            <Icon type="left" />Go back
                        </Button>
                        <Button type="primary">
                            Go forward<Icon type="right" />
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button type="primary" icon="cloud" />
                        <Button type="primary" icon="cloud-download" />
                    </ButtonGroup>

                    <h4>Size</h4>
                    <ButtonGroup size="large">
                        <Button type="ghost">Large</Button>
                        <Button type="ghost">Large</Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <Button type="ghost">Default</Button>
                        <Button type="ghost">Default</Button>
                    </ButtonGroup>
                    <ButtonGroup size="small">
                        <Button type="ghost">Small</Button>
                        <Button type="ghost">Small</Button>
                    </ButtonGroup>
                </div>

                <div>
                    <Button type="primary" loading>
                        Loading
                    </Button>
                    <Button type="primary" size="small" loading>
                        Loading
                    </Button>
                    <br />
                    <Button type="primary" loading={this.state.loading} onClick={this.enterLoading}>
                        Click me!
                    </Button>
                    <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading}>
                        Click me!
                    </Button>
                </div>
            </div>
        )
    }
} 

export default ButtonView