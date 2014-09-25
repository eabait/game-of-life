var Cell = (function() {
  'use strict';

  function Cell(alive, neighbours) {
    this.alive = alive;
    this.neighbours = neighbours;
  }

  Cell.prototype.willLive = function() {
    var aliveNeighbours = this.getNumberOfAliveNeighbours();

    return !this.shouldDieByUnderPopulation(aliveNeighbours) &&
           !this.shouldDieByOverPopulation(aliveNeighbours) &&
           (this.shouldLiveToNextGeneration(aliveNeighbours) ||
           this.shouldLiveByReproduction(aliveNeighbours));
  };

  Cell.prototype.shouldDieByUnderPopulation = function(aliveNeighbours) {
    return (this.isAlive() && aliveNeighbours < 2);
  };

  Cell.prototype.shouldLiveToNextGeneration = function(aliveNeighbours) {
    return (this.isAlive() && (aliveNeighbours >= 2 || aliveNeighbours <= 3));
  };

  Cell.prototype.shouldDieByOverPopulation = function(aliveNeighbours) {
    return (this.isAlive() && aliveNeighbours > 3);
  };

  Cell.prototype.shouldLiveByReproduction = function(aliveNeighbours) {
    return (!this.isAlive() && aliveNeighbours === 3)
  };

  Cell.prototype.getNumberOfAliveNeighbours = function() {
    return this.neighbours.reduce(function(aliveNeighbours, neighbour) {
      return aliveNeighbours + !!neighbour.isAlive();
    }, 0);
  };

  Cell.prototype.isAlive = function() {
    return this.alive;
  };

  return Cell;

}());