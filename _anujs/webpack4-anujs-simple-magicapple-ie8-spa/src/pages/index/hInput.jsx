import  React  from 'react';
// import  ReactDOM  from 'react-dom';


export default class HInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.defaultValue || ''
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        console.log('onChange',e.target.value);
        this.setState({
            value: e.target.value
        });

        this.props.onChange && this.props.onChange(e);
    }

    render() {
        return (
            <div class="h-input-wrapper">
                <input value={this.state.value} onChange={this.onChange} class="h-input" />
                <p>{this.state.value}</p>
            </div>
        );
    }
}

