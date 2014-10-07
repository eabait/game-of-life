describe('Universe', function() {

  var seedUniverse;
  var universe;

  beforeEach(function() {
    seedUniverse = [
      [false, false, false, true],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false]
    ];

    jasmine.addMatchers({
      toMatchUniverse: function() {
        return {
          compare: function(actual, expected) {
            var compareUniverses = function() {
              return actual.reduce(function(acumMatrix, rowCells, rowIndex) {
                return acumMatrix && rowCells.reduce(function(acumRow, cell, cellIndex) {
                  return acumRow && (cell.isAlive() == expected[rowIndex][cellIndex]);
                }, true);
              }, true);
            };
            var isMatch = compareUniverses(actual, expected);
            return {
              pass: isMatch
            };
          }
        };
      }
    });
  });

  it('should be able to initialize', function() {
    universe = new Universe(seedUniverse);
    expect(universe.currentGeneration.length).toBe(seedUniverse.length);
    expect(universe.getCellAt(0, 0)).toBeDefined();
  });

  it('should detect a dead generation', function() {
    seedUniverse = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];

    universe = new Universe(seedUniverse);

    expect(universe.isDeadGeneration()).toBe(true);
  });

  describe('Tick', function() {

    it('should be able to calculate next generation for block configuration', function() {
      seedUniverse = [
        [false, false, false, false],
        [false, true, true, false],
        [false, true, true, false],
        [false, false, false, false]
      ];

      universe = new Universe(seedUniverse);
      universe.tick();

      expect(universe.currentGeneration).toMatchUniverse(seedUniverse);

      universe.tick();

      expect(universe.currentGeneration).toMatchUniverse(seedUniverse);
    });

    it('should be able to calculate blinker configuration', function() {
      var blinkerOdd = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, true, true, true, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
      ];

      var blinkerEven = [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false]
      ];

      universe = new Universe(blinkerOdd);
      universe.tick();

      expect(universe.currentGeneration).toMatchUniverse(blinkerEven);

      universe.tick();

      expect(universe.currentGeneration).toMatchUniverse(blinkerOdd);

      universe.tick();

      expect(universe.currentGeneration).toMatchUniverse(blinkerEven);
    });

    it('should die after two generations', function() {
      seedUniverse = [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, true, false, true, false],
        [false, false, true, false, false],
        [false, false, false, false, false]
      ];

      var firstGeneration = [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
      ];

      var deadGeneration = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
      ];

      //universe = new Universe(seedUniverse);
      //universe.tick();

      //expect(universe.currentGeneration).toMatchUniverse(firstGeneration);

      //universe.tick();

      //expect(universe.isDeadGeneration()).toBe(true);
    });

  });

});