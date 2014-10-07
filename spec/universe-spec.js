describe('Universe', function() {

  var seedUniverse;

  /**
   * 0001
   * 0110
   * 0110
   * 0000
   */
  beforeEach(function() {
    seedUniverse = [
      [false, false, false, true],
      [false, true, true, false],
      [false, true, true, false],
      [false, false, false, false]
    ];

    jasmine.addMatchers({
      toBeExponentiallyLessThan: function() {
        return {
          compare: function(actual, expected, scaleFactor) {
            var compareUniverses = function() {
              actual.reduce(function() {

              }, true);
            };
            return {
              pass: actual < (expected / (10 || scaleFactor))
            };
          }
        };
      }
    });
  });

  it('should be able to initialize', function() {
    var universe = new Universe(seedUniverse);
    expect(universe.currentGeneration.length).toBe(seedUniverse.length);
    expect(universe.getCellAt(0, 0)).toBeDefined();
  });

  describe('Calculating generations', function() {

    it('should be able to calculate univere for block configuration', function() {
      seedUniverse = [
        [false, false, false, false],
        [false, true, true, false],
        [false, true, true, false],
        [false, false, false, false]
      ];



    });

  });

});