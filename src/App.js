import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {size: 3};
        this.newGame = this.newGame.bind(this);
    }

    newGame() {
        //задання розміру
        var sizeValue = document.getElementById("sizeBar").value;
        this.setState(prevState => ({size: sizeValue}));
        //Ініціалізація масиву
        var data = [];
        for(var i=0; i<sizeValue; i++) {
            data[i] = [];
            for(var j=0; j<sizeValue; j++) {
                data[i][j] = i* sizeValue + j + 1;
            }
        }
        data[sizeValue-1][sizeValue-1] = "";
        //функція перестановки 2-ох елементів
        function swap (data, i1, j1, i2, j2) {
            var t = data[i1][j1];
            data[i1][j1] = data[i2][j2];
            data[i2][j2] = t;
        }
        //Запам'ятовуємо позицію пустого елемента
        var emptyi = sizeValue -1;
        var emptyj = sizeValue -1;
        //перемішуєм елементи масиву
        for(var i=0; i<2018; i++) {
            switch (Math.round(3*Math.random())) {
                case 0:
                    if(emptyi != 0)
                        swap(data, emptyi, emptyj, --emptyi, emptyj);
                    break;
                case 1:
                    if(emptyj != sizeValue -1)
                        swap(data, emptyi, emptyj, emptyi, ++emptyj);
                    break;
                case 2:
                    if(emptyi != sizeValue -1)
                        swap(data, emptyi, emptyj, ++emptyi, emptyj);
                    break;
                case 3:
                    if(emptyj != 0)
                        swap(data, emptyi, emptyj, emptyi, --emptyj);
            }
        }
        //Створення таблиці
        var table = document.createElement("table");
        for(var i=0; i<sizeValue; i++) {
            var row = document.createElement("tr");
            for(var j=0; j<sizeValue; j++) {
                var cell = document.createElement("td");
                cell.id = i + " " + j;
                cell.onclick = Move;
                cell.innerHTML = data[i][j];
                row.appendChild(cell);
            }
            table.appendChild(row);
        }
        var box = document.getElementById("gameBoard");
        if(box.childNodes.length == 1)
            box.removeChild(box.firstChild);
        box.appendChild(table);
        //функція 1-ого ходу
        function Move (e) {
            var el = e.srcElement || e.target;
            var i = el.id.charAt(0);
            var j = el.id.charAt(2);
            if((i == emptyi && Math.abs(j-emptyj)==1) || (j==emptyj && Math.abs(i-emptyi)==1) ) {
                document.getElementById(emptyi + " " + emptyj).innerHTML = el.innerHTML;
                el.innerHTML = "";
                emptyi = i;
                emptyj = j;
                //перевірка правильної комбінації
                var counter = 0;
                for(var i =0; i<sizeValue; i++) {
                    for(var j=0; j<sizeValue; j++) {
                            if ((document.getElementById(i + " " + j).innerHTML == (i * sizeValue + j + 1))) {
                                counter++;
                            }
                    }
                }
                if (counter == sizeValue*sizeValue-1) {
                    alert("Вітаю! Ви перемогли!");
                }
            }
        }
    }


    render() {
        return (
            <div id="app">
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
                  <button onClick={this.newGame}>Start the Game</button>
                </p>
              </div>
              <div id="gameBoard">

              </div>
            </div>
        );
    }
}


export default App;
