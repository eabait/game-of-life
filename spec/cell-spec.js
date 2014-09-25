describe('Cell', function() {
  var cell;

  it('should be able to initialize', function() {
    cell = new Cell(true, []);
    expect(cell.isAlive()).toBe(true);
  });

  describe('can count how many neighbours are alive', function() {
    it('there shuld be zero alive neighbours', function() {
      cell = new Cell(true, []);
      expect(cell.getNumberOfAliveNeighbours()).toEqual(0);
    });

    it('there should be six alive neighbours', function() {
      cell = new Cell(true, [
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, [])
      ]);
      expect(cell.getNumberOfAliveNeighbours()).toEqual(6);
    });

  });

  describe('can predict its next state', function() {

    it('should die in next generation by under-population', function() {
      cell = new Cell(true, [
        new Cell(false, []),
        new Cell(false, [])
      ]);
      cell.alive = cell.willLive();
      expect(cell.isAlive()).toBe(false);
    });

    it('should die in next generation by over-population', function() {
      cell = new Cell(true, [
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, [])
      ]);
      cell.alive = cell.willLive();
      expect(cell.isAlive()).toBe(false);
    });

    it('should live in next generation', function() {
      cell = new Cell(true, [
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, []),
        new Cell(false, []),
        new Cell(false, []),
        new Cell(false, [])
      ]);
      cell.alive = cell.willLive();
      expect(cell.isAlive()).toBe(true);
    });

    it('should live in next generation by reproduction', function() {
      cell = new Cell(true, [
        new Cell(true, []),
        new Cell(true, []),
        new Cell(true, []),
        new Cell(false, []),
        new Cell(false, []),
        new Cell(false, [])
      ]);
      cell.alive = cell.willLive();
      expect(cell.isAlive()).toBe(true);
    });

  });

});