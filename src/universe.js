var Universe = (function() {
  'use strict';

  function Universe(initialUniverse) {
    this.currentGeneration = initialUniverse;
    this.mapUniverse(initialUniverse);
  }

  Universe.prototype.tick = function tick() {
    var nextGeneration = this.currentGeneration.map(function(row) {
      return row.map(function(cell) {
        return new Cell(cell.willLive(), []);
      });
    });
    this.mapUniverse(nextGeneration);
  };

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
        this.addCellNeighbours(cell, matrix, colIndex, rowIndex);
      }, this);
    }, this);
  };

  function getMovementsAndLimits(x, y, len) {
    return {
      x: x,
      y: y,
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

  Universe.prototype.addCellNeighbours = function addCellNeighbours(cell, matrix, x, y) {
    var cellLocation = getMovementsAndLimits(x, y, matrix.length);

    this.addLeftNeighbour(cell, cellLocation);
    this.addBottomLeftNeighbour(cell, cellLocation);
    this.addTopLeftNeighbour(cell, cellLocation);
    this.addRightNeighbour(cell, cellLocation);
    this.addBottomRightNeighbour(cell, cellLocation);
    this.addTopRightNeighbour(cell, cellLocation);
    this.addTopNeighbour(cell, cellLocation);
    this.addBottomNeighbour(cell, cellLocation);
  };

  Universe.prototype.addLeftNeighbour = function addLeftNeighbour(cell, cellLocation) {
    if (cellLocation.canMoveLeft) {
      cell.addNeighbour(this.getCellAt(cellLocation.left, cellLocation.y));
    }
  };

  Universe.prototype.addBottomLeftNeighbour = function addBottomLeftNeighbour(cell, cellLocation) {
    if (cellLocation.canMoveLeft && cellLocation.canMoveDown) {
      cell.addNeighbour(this.getCellAt(cellLocation.left, cellLocation.down));
    }
  };

  Universe.prototype.addTopLeftNeighbour = function addTopLeftNeighbour(cell, cellLocation) {
    if (cellLocation.canMoveLeft && cellLocation.canMoveUp) {
      cell.addNeighbour(this.getCellAt(cellLocation.left, cellLocation.up));
    }
  };

  Universe.prototype.addRightNeighbour = function addRightNeighbour(cell, cellLocation) {
    if (cellLocation.canMoveRight) {
      cell.addNeighbour(this.getCellAt(cellLocation.right, cellLocation.y));
    }
  };

  Universe.prototype.addTopRightNeighbour = function addTopRightNeighbour(cell, cellLocation) {
    if (cellLocation.canMoveRight && cellLocation.canMoveUp) {
      cell.addNeighbour(this.getCellAt(cellLocation.right, cellLocation.up));
    }
  };

  Universe.prototype.addBottomRightNeighbour = function addBottomRightNeighbour(cell, cellLocation) {
    if (cellLocation.canMoveRight && cellLocation.canMoveDown) {
      cell.addNeighbour(this.getCellAt(cellLocation.right, cellLocation.down));
    }
  };

  Universe.prototype.addTopNeighbour = function addTopNeighbour(cell, cellLocation) {
    if (cellLocation.canMoveUp) {
      cell.addNeighbour(this.getCellAt(cellLocation.x, cellLocation.up));
    }
  };

  Universe.prototype.addBottomNeighbour = function addBottomNeighbour(cell, cellLocation) {
    if (cellLocation.canMoveDown) {
      cell.addNeighbour(this.getCellAt(cellLocation.x, cellLocation.down));
    }
  };

  Universe.prototype.getCellAt = function getCellAt(x, y) {
    //TODO add checks
    return this.currentGeneration[y][x];
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