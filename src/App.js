import React, { Component } from 'react';
import './App.css';

var data = [];
var sizeValue = 3;
var empty = {i: sizeValue-1, j: sizeValue-1};
var newGame = function () {
    data = [];
    for(var i=0; i<sizeValue; i++) {
        data[i] = [];
        for(var j=0; j<sizeValue; j++) {
            data[i][j] = i* sizeValue + j + 1;
        }
    }
    data[sizeValue-1][sizeValue-1] = "";
    empty = {i: sizeValue-1, j: sizeValue-1};
    //функція перестановки 2-ох елементів
    function swap (data, i1, j1, i2, j2) {
        var t = data[i1][j1];
        data[i1][j1] = data[i2][j2];
        data[i2][j2] = t;
    }
    //перемішуєм елементи масиву
    for(var i=0; i<2018; i++) {
        switch (Math.round(3*Math.random())) {
            case 0:
                if(empty.i != 0)
                    swap(data, empty.i, empty.j, --empty.i, empty.j);
                break;
            case 1:
                if(empty.j != sizeValue -1)
                    swap(data, empty.i, empty.j, empty.i, ++empty.j);
                break;
            case 2:
                if(empty.i != sizeValue -1)
                    swap(data, empty.i, empty.j, ++empty.i, empty.j);
                break;
            case 3:
                if(empty.j != 0)
                    swap(data, empty.i, empty.j, empty.i, --empty.j);
        }
    }
};
newGame();
class SizeBar extends Component {
    constructor (props) {
        super(props);
        this.state = {size: 3};
        this.setSize = this.setSize.bind(this);
    }
    setSize() {
        sizeValue = document.getElementById("sizeBar").value;
        this.setState(prevState => ({size: sizeValue}));
        newGame();
    }
    render() {
        return (
            <div id="sizeBarDiv">
                <p>Select size:
                    <select id="sizeBar">
                        <option value="3">3x3</option>
                        <option value="4">4x4</option>
                        <option value="5">5x5</option>
                        <option value="6">6x6</option>
                        <option value="7">7x7</option>
                        <option value="8">8x8</option>
                    </select><br />
                    <button onClick={this.setSize}>Start the Game</button>
                </p>
            </div>
        );
    }
}

class Cell extends Component {
    constructor(props) {
        super(props);
        this.movement = this.movement.bind(this);
    }
     movement() {
        var el = this.props.value;
        var i = this.props.id.charAt(0);
        var j = this.props.id.charAt(2);

       if((i == empty.i && Math.abs(j-empty.j)==1) || (j==empty.j && Math.abs(i-empty.i)==1) ) {
            data[empty.i][empty.j] = el;
            data[i][j] = "";
            empty.i = i;
            empty.j = j;
            //перевірка правильної комбінації
            var counter = 0;
            for(var i =0; i<sizeValue; i++) {
                for(var j=0; j<sizeValue; j++) {
                    if (data[i][j] == (i * sizeValue + j + 1)) {
                        counter++;
                    }
                }
            }
            if (counter == sizeValue*sizeValue-1) {
                alert("Вітаю! Ви перемогли!");
            }
        }
    }
    render() {
        return (
            <td onClick={this.movement}  >{this.props.value}</td>
        );
    }
}
class Row extends Component {
    constructor(props) {
        super(props);
        this.state = {size: sizeValue}
    }
    render() {
        var cells = [];
        for(var i=0; i<sizeValue; i++) {
            cells[i] = data[this.props.id][i];
        }
        var rows_id = this.props.id;
        return (
            <tr>
                {cells.map(function(cell, index) {
                    return <Cell key={index} id={rows_id + " " + index} value={cell} />
                })}
            </tr>
        );
    }
}

class Table extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        var rows = [];
        for(var i=0; i<sizeValue; i++) {
            rows[i] = i;
        }
        return (
            <table>
                {rows.map(function(row) {
                    return <Row key={row} id={row} />
                })}
            </table>
        );
    }
}


 class App extends Component {
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.interval = this.interval.bind(this);
    }
    update() {
        this.forceUpdate();
    }
    interval() {
        setInterval(this.update, 100);
    }
    render() {
        return (
            <div id="app" onMouseMove={this.interval}>
              <SizeBar />
              <div id="gameBoard">
                <Table/>
              </div>
            </div>
        );
    }
}

export default App;

