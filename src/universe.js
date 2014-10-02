var Universe = (function() {
  'use strict';

  function Universe(initialUniverse) {
    this.currentGeneration = initialUniverse;
    this.mapUniverse(initialUniverse);
  }

  Universe.prototype.mapUniverse = function mapUniverse(matrix) {
    this.currentGeneration = createCellUniverse(matrix);
    this.updateCellsNeighbours(this.currentGeneration);
  };

  function createCellUniverse(matrix) {
    return matrix.map(function(cellRow) {
      return cellRow.map(function(cellStatus) {
        return new Cell(cellStatus, []);
      });
    });
  }

  Universe.prototype.updateCellsNeighbours = function updateCellsNeighbours(matrix) {
    this.currentGeneration.forEach(function(row, rowIndex) {
      row.forEach(function(cell, colIndex) {
        this.setCellNeighbours(cell, matrix, colIndex, rowIndex);
      }, this);
    }, this);
  };

  function getMovementsAndLimits(x, y, len) {
    return {
      up: y - 1,
      down: y + 1,
      left: x - 1,
      right: x + 1,
      canMoveUp: y - 1 >= 0,
      canMoveDown: y + 1 < len,
      canMoveLeft: x - 1 >= 0,
      canMoveRight: x + 1 < len
    };
  }

  Universe.prototype.setCellNeighbours = function setCellNeighbours(cell, matrix, x, y) {
    var loc = getMovementsAndLimits(x, y, matrix.length);

    if (loc.canMoveLeft) {
      cell.addNeighbour(this.getCellAt(loc.left, y));
      if (loc.canMoveUp) {
        cell.addNeighbour(this.getCellAt(loc.left, loc.up));
      }
      if (loc.canMoveDown) {
        cell.addNeighbour(this.getCellAt(loc.left, loc.down));
      }
    }
    if (loc.canMoveRight) {
      cell.addNeighbour(this.getCellAt(loc.right, y));
      if (loc.canMoveUp) {
        cell.addNeighbour(this.getCellAt(loc.right, loc.up));
      }
      if (loc.canMoveDown) {
        cell.addNeighbour(this.getCellAt(loc.right, loc.down));
      }
    }
    if (loc.canMoveUp) {
      cell.addNeighbour(this.getCellAt(x, loc.up));
    }
    if (loc.canMoveDown) {
      cell.addNeighbour(this.getCellAt(x, loc.down));
    }
  };

  Universe.prototype.getCellAt = function getCellAt(x, y) {
    //TODO add checks
    return this.currentGeneration[y][x];
  };

  Universe.prototype.tick = function tick() {
    var nextGeneration = this.currentGeneration.map(function(row) {
      return row.map(function(cell) {
        return new Cell(cell.willLive(), []);
      });
    });
    this.mapUniverse(nextGeneration);
  };

  Universe.prototype.print = function print() {
    return this.currentGeneration.reduce(function(acum, row) {
      var rowOfCells = row.map(function(cell) {
        return cell.isAlive();
      });
      return acum + '\n' + rowOfCells.join(' ');
    }, '');
  };

  return Universe;
}());