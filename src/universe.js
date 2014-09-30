var Universe = (function() {
  'use strict';

  function Universe(initialUniverse) {
    this.currentGeneration = initialUniverse;
  }

  Universe.prototype.tick = function() {
    var nextGeneration = this.currentGeneration.map(function(cell) {
      return new Cell(cell.willLive(), cell.neighbours);
    });
    this.currentGeneration = nextGeneration;
  };

  return Universe;
}());