var Cell = (function() {
  'use strict';

  /**
   * Cell function constructor
   * @param {boolean} alive     Initial cell state. If true is alive, dead otherwise
   * @param {Array} neighbours  Cell's neighbours
   */
  function Cell(alive, neighbours) {
    this.alive = alive;
    this.neighbours = neighbours;
  }

  /**
   * @return {boolean} Returns true if this cell will live to the next generation
   */
  Cell.prototype.willLive = function willLive() {
    var aliveNeighbours = this.getNumberOfAliveNeighbours();

    return !this.shouldDieByUnderPopulation(aliveNeighbours) &&
           !this.shouldDieByOverPopulation(aliveNeighbours) &&
           (this.shouldLiveToNextGeneration(aliveNeighbours) ||
           this.shouldLiveByReproduction(aliveNeighbours));
  };

  /**
   * @param  {Number} aliveNeighbours number of alive neighbours
   * @return {boolean}  true if the cell should die by under-population
   */
  Cell.prototype.shouldDieByUnderPopulation = function shouldDieByUnderPopulation(aliveNeighbours) {
    return (this.isAlive() && aliveNeighbours < 2);
  };

  /**
   * @param  {Number} aliveNeighbours number of alive neighbours
   * @return {boolean}  true if the cell should live to next generation
   */
  Cell.prototype.shouldLiveToNextGeneration = function shouldLiveToNextGeneration(aliveNeighbours) {
    return (this.isAlive() && (aliveNeighbours >= 2 || aliveNeighbours <= 3));
  };

  /**
   * @param  {Number} aliveNeighbours number of alive neighbours
   * @return {boolean}  true if the cell should die by over-population
   */
  Cell.prototype.shouldDieByOverPopulation = function shouldLiveToNextGeneration(aliveNeighbours) {
    return (this.isAlive() && aliveNeighbours > 3);
  };

  /**
   * @param  {Number} aliveNeighbours number of alive neighbours
   * @return {boolean}  true if the cell should live by reproduction
   */
  Cell.prototype.shouldLiveByReproduction = function shouldLiveByReproduction(aliveNeighbours) {
    return (!this.isAlive() && aliveNeighbours === 3);
  };

  /**
   * Returns the number of cell's living neighbours
   * @return {Number} number of this cell neighbours that are alive
   */
  Cell.prototype.getNumberOfAliveNeighbours = function getNumberOfAliveNeighbours() {
    return this.neighbours.reduce(function(aliveNeighbours, neighbour) {
      return aliveNeighbours + (+neighbour.isAlive());
    }, 0);
  };

  /**
   * @return {Boolean} Returns true if the cell is alive, false otherwise
   */
  Cell.prototype.isAlive = function isAlive() {
    return this.alive;
  };

  /**
   * Sets cell state as live or dead
   * @param {boolean} live if true the cell is alive, if false is dead
   */
  Cell.prototype.setAlive = function setAlive(alive) {
    this.alive = alive;
  };

  return Cell;

}());