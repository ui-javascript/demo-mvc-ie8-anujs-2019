import React from 'react'
import ReactDOM from 'react-dom'
import Quadrille from './Quadrille'
require('./chess.css')

class Chessboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let board = this.props.chessAry.map((el, pos) => {
            return (
                <div className="chess-row">
                    {el.map((item, index) => {
                        return <Quadrille chess={item} onPlayChess={this.props.onPlayChess.bind(this, pos, index)} />
                    })}
                </div>
            )
        })
        return (
            <div style={{float: 'left'}}>
                { board }
            </div>
        )
    }
}

export default Chessboard