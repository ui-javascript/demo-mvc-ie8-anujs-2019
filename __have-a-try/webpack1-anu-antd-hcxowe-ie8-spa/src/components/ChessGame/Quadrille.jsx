import React from 'react'
import ReactDOM from 'react-dom'
require('./chess.css')

class Quadrille extends React.Component {
    constructor(props) {
        super(props)
        this.handleChess = this.handleChess.bind(this)
    }

    handleChess() {
        if (this.props.chess) {
            return
        }

        this.props.onPlayChess()
    }

    render() {
        return (
            <span className="chess" onClick={this.handleChess}>{this.props.chess}</span>
        )
    }
}

export default Quadrille