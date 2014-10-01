var Universe = (function() {
  'use strict';

  function Universe(initialUniverse) {
    this.currentGeneration = initialUniverse;
  }

  Universe.prototype.mapUniverse = function mapUniverse(matrix) {
    this.currentGeneration = createCellUniverse(matrix);
    updateCellsNeighbours();
  };

  function createCellUniverse(matrix) {
    return matrix.map(function(cellStatus) {
      return new Cell(cellStatus, []);
    });
  }

  function updateCellsNeighbours(matrix) {

  }

  function setCellNeighbours(matrix, x, y) {
  }

  Universe.prototype.tick = function tick() {
    var nextGeneration = this.currentGeneration.map(function(cell) {
      return new Cell(cell.willLive(), cell.neighbours);
    });
    this.currentGeneration = nextGeneration;
  };

  return Universe;
}());