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
  });

  it('should be able to initialize', function() {
    var universe = new Universe(seedUniverse);
    expect(universe.currentGeneration.length).toBe(seedUniverse.length);
    expect(universe.getCellAt(0, 0)).toBeDefined();
  });

});