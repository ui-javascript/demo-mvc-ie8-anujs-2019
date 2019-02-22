import React from 'react'
import ReactDOM from 'react-dom'
import Chessboard from './Chessboard'
//import _ from 'lodash'

class ChessGame extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            win: '',
            nextChess: 'X',
            chessAry: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            stepAry: []
        }

        this.onPlayChess = this.onPlayChess.bind(this)
        this.checkWin = this.checkWin.bind(this)
        this.reStart = this.reStart.bind(this)
    }

    onPlayChess(pos, index) {
        if (this.state.win) {
            return
        }

        this.setState((preState) => {
            preState.chessAry[pos][index] = preState.nextChess
            
            let tempAry = preState.chessAry.toString().split(',')
            let tem2Ary = []

            tem2Ary.push(tempAry.slice(0, 3))
            tem2Ary.push(tempAry.slice(3, 6))
            tem2Ary.push(tempAry.slice(6))

            preState.stepAry.push(tem2Ary)

            return {
                chessAry: preState.chessAry,
                nextChess: preState.nextChess == 'X' ? 'O' : 'X',
                win: this.checkWin(preState.chessAry),
                stepAry: preState.stepAry
            }
        })
    }

    checkWin(chessAry) {
        for(let i=0; i<3; i++) {
            if (chessAry[i][0]!='' && chessAry[i][0]==chessAry[i][1] && chessAry[i][0] == chessAry[i][2]) {
                return chessAry[i][0]
            }

            if (chessAry[0][i]!='' && chessAry[0][i] == chessAry[1][i] && chessAry[2][i] == chessAry[0][i]) {
                return chessAry[0][i]
            }
        }

        if (chessAry[0][0]!='' && chessAry[0][0]==chessAry[1][1] && chessAry[2][2] == chessAry[0][0]) {
            return chessAry[0][0]
        }

        if (chessAry[0][2]!='' && chessAry[0][2]==chessAry[1][1] && chessAry[2][0] == chessAry[0][2]) {
            return chessAry[0][2]
        }

        return ''
    }

    onClickStep(index) {
        this.setState((preState) => {
            return {
                chessAry: preState.stepAry[index]
            }
        })
    }

    reStart() {
        this.setState((preState) => {
            return {
                win: '',
                nextChess: 'X',
                chessAry: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                stepAry: []
            }
        })
    }

    render() {
        return (
            <div style={{overflow:'hidden'}}>
                <Chessboard chessAry={this.state.chessAry} onPlayChess={this.onPlayChess} />
                <div style={{clear: 'both'}}>
                    {this.state.win && <label>win: {this.state.win}</label>}
                    {
                        <ul>
                            {
                                this.state.win && this.state.stepAry.map((el, index) => {
                                    return <li onClick={this.onClickStep.bind(this, index)}><a href="javascript:void(0);">Game #{index}</a></li>
                                })
                            }
                            {
                                (this.state.stepAry.length==9 || this.state.win) && <li onClick={this.reStart}><a href="javascript:void(0);">restart</a></li>
                            }
                        </ul>
                    }
                </div>
            </div>
        )
    }
}

export default ChessGame