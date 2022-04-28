import { Component, Input, OnInit, HostListener } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @Input() gridSize = 0;
  gameGrid: any;
  testGameGrid: any;
  winningNumber = 2048;
  key: any;

  constructor() {}

  // Handle keyBoard input
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    this.moveGridElements();
    // Move the elements in array in the direction
    // combine the same array elements in the given direction
    // check if 2048 is achieved
    this.checkIfWon();
    // generate 2 at random place (if no place possible then end game)
    this.generateNewTwo();
  }

  ngOnInit(): void {
    // generate array of grid size:
    this.gameGrid = this.generateArray(this.gridSize);
    this.testGameGrid = this.generateArray(this.gridSize);
    // initialize two 2s at random location in Gamegrid
    this.initializeGameGrid();
  }

  moveGridElements() {
    // move elements in the direction as per keypress// w:up, s:down, d:right, a:left
    // combine the same consecutive elements
    switch (this.key) {
      case 'w': {
        for (let k = 0; k < this.gridSize; k++) {
          //left to right
          let tempArray = new Array();
          for (let i = 0; i < this.gridSize; i++) {
            if (this.gameGrid[i][k] !== 0) {
              tempArray.push(this.gameGrid[i][k]);
            }
          }
          // Adding consecutive similar number
          let squeezedArray = this.elementSumSqueeze(
            JSON.parse(JSON.stringify(tempArray))
          );
          for (let i = 0; i < this.gridSize; i++) {
            if (squeezedArray[i]) {
              this.gameGrid[i][k] = squeezedArray[i];
            } else {
              this.gameGrid[i][k] = 0;
            }
          }
        }
        // assign squeezed elements back to gameGrid
        break;
      }
      case 's': {
        for (let k = 0; k < this.gridSize; k++) {
          //left to right
          let tempArray = new Array();
          for (let i = this.gridSize - 1; i >= 0; i--) {
            console.log(`i=${i}, elem = ${this.gameGrid[i][k]}`);

            if (this.gameGrid[i][k] !== 0) {
              tempArray.push(this.gameGrid[i][k]);
            }
          }
          console.log(tempArray);
          // Adding consecutive similar number
          let squeezedArray = this.elementSumSqueeze(
            JSON.parse(JSON.stringify(tempArray))
          );
          console.log(squeezedArray);
          for (let p = 0, q = this.gridSize - 1; p < this.gridSize; p++, q--) {
            if (squeezedArray[p]) {
              this.gameGrid[q][k] = squeezedArray[p];
            } else {
              this.gameGrid[q][k] = 0;
            }
          }
        }
        break;
      }
      case 'a': {
        console.log('a is pressed');
        for (let k = 0; k < this.gridSize; k++) {
          //left to right
          let tempArray = new Array();
          for (let i = 0; i < this.gridSize; i++) {
            if (this.gameGrid[k][i] !== 0) {
              tempArray.push(this.gameGrid[k][i]);
            }
          }
          // Adding consecutive similar number
          let squeezedArray = this.elementSumSqueeze(
            JSON.parse(JSON.stringify(tempArray))
          );
          for (let i = 0; i < this.gridSize; i++) {
            if (squeezedArray[i]) {
              this.gameGrid[k][i] = squeezedArray[i];
            } else {
              this.gameGrid[k][i] = 0;
            }
          }
        }
        break;
      }
      case 'd': {
        console.log('d is pressed');

        for (let k = 0; k < this.gridSize; k++) {
          //left to right
          let tempArray = new Array();
          for (let i = this.gridSize - 1; i >= 0; i--) {
            console.log(`i=${i}, elem = ${this.gameGrid[k][i]}`);

            if (this.gameGrid[k][i] !== 0) {
              tempArray.push(this.gameGrid[k][i]);
            }
          }
          console.log(tempArray);
          // Adding consecutive similar number
          let squeezedArray = this.elementSumSqueeze(
            JSON.parse(JSON.stringify(tempArray))
          );
          console.log(squeezedArray);
          for (let p = 0, q = this.gridSize - 1; p < this.gridSize; p++, q--) {
            if (squeezedArray[p]) {
              this.gameGrid[k][q] = squeezedArray[p];
            } else {
              this.gameGrid[k][q] = 0;
            }
          }
        }
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  elementSumSqueeze(arr: any) {
    if (arr.length == 0) {
      return [];
    }
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] = arr[i] + arr[i + 1];
        arr[i + 1] = 0;
        for (let k = i + 1; k < arr.length - 1; k++) {
          // shifting since one space(0) has come
          arr[k] = arr[k + 1];
        }
        arr[arr.length - 1] = 0; // after shifting removing last elem
      }
    }
    return arr;
  }

  generateArray(size: Number) {
    var arr = new Array();

    for (var i = 0; i < size; i++) {
      arr[i] = new Array();
      for (var j = 0; j < size; j++) {
        arr[i][j] = 0;
      }
    }
    return arr;
    // let tmpArray = new Array(size);
    // let finalArray = new Array();
    // for(let i=0;i<size;i++){
    //   finalArray.push(tmpArray);
    // }
    // console.log(`Final Array: ${finalArray}, Length: ${finalArray.length}, Width: ${finalArray[0].length}`);
    // return finalArray;
  }

  initializeGameGrid() {
    let position1 = { i: 0, k: 0 };
    let position2 = { i: 0, k: 0 };
    position1 = this.getRandomGridLocation(this.gridSize);
    position2 = this.getRandomGridLocation(this.gridSize);
    while (_.isEqual(position1, position2)) {
      console.log('Randomizing again------');
      position2 = this.getRandomGridLocation(this.gridSize);
    }
    console.log(JSON.stringify(this.gameGrid));
    this.gameGrid[position1.i][position1.k] = 2;
    this.gameGrid[position2.i][position2.k] = 2;
  }

  getRandomGridLocation(size: number) {
    let ri = Math.floor(Math.random() * size);
    let rk = Math.floor(Math.random() * size);
    return { i: ri, k: rk };
  }

  generateNewTwo() {
    let randomBool = false;
    let generated = false;
    let lastBlankElem = { i: -1, k: -1 };
    for (let ri = 0; ri < this.gridSize; ri++) {
      for (let rk = 0; rk < this.gridSize; rk++) {
        randomBool = Math.random() > 0.4 ? true : false;
        if (this.gameGrid[ri][rk] == 0) {
          lastBlankElem = { i: ri, k: rk };
          if (randomBool) {
            this.gameGrid[ri][rk] = 2;
            return;
          }
        }
      }
    }
    if (lastBlankElem.i == -1 || lastBlankElem.k == -1) {
      // Should also check if all possible steps are done
      alert('Game Over');
    }
    this.gameGrid[lastBlankElem.i][lastBlankElem.k] = 2;
  }

  checkIfWon() {
    for (let i = 0; i < this.gridSize; i++) {
      for (let k = 0; k < this.gridSize; k++) {
        if (this.gameGrid[i][k] == this.winningNumber) {
          alert('won the game');
        }
      }
    }
  }

  getColor(item: number) {
    switch (item) {
      case 2: {
        return 'rgb(238, 228, 218)';
        break;
      }
      case 4: {
        return 'rgb(237, 224, 200)';
        break;
      }
      case 8: {
        return 'rgb(242, 177, 121)';
        break;
      }
      case 16: {
        return 'rgb(245, 149, 99)';
        break;
      }
      case 32: {
        return 'rgb(246, 124, 95)';
        break;
      }
      case 64: {
        return 'rgb(246, 94, 59)';
        break;
      }
      case 128: {
        return 'rgb(237, 207, 114)';
        break;
      }
      case 256: {
        return 'rgb(237, 204, 97)';
        break;
      }
      case 512: {
        return 'rgb(237, 200, 80)';
        break;
      }
      case 1024: {
        return 'rgb(237, 197, 63)';
        break;
      }
      case 2048: {
        return 'rgb(237, 194, 46)';
        break;
      }

      default: {
        return 'rgb(204, 192, 179)';
        break;
      }
    }
  }
}
