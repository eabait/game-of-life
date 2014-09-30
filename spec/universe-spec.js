describe('Universe', function() {

  /**
   * 0001
   * 0110
   * 0110
   * 0000
   */

  var cell11 = new Cell(false, []);
  var cell12 = new Cell(false, []);
  var cell13 = new Cell(false, []);
  var cell14 = new Cell(true, []);

  var cell21 = new Cell(false, []);
  var cell22 = new Cell(true, []);
  var cell23 = new Cell(true, []);
  var cell24 = new Cell(false, []);

  var cell31 = new Cell(false, []);
  var cell32 = new Cell(true, []);
  var cell33 = new Cell(true, []);
  var cell34 = new Cell(false, []);

  var cell41 = new Cell(false, []);
  var cell42 = new Cell(false, []);
  var cell43 = new Cell(false, []);
  var cell44 = new Cell(false, []);

  cell11.neighbours = [cell12, cell22, cell21];
  cell12.neighbours = [cell13, cell23, cell22, cell21, cell11];
  cell13.neighbours = [cell14, cell24, cell23, cell22, cell12];
  cell14.neighbours = [cell24, cell23, cell13];

  cell21.neighbours = [cell11, cell12, cell22, cell32, cell31];
  cell22.neighbours = [cell11, cell12, cell13, cell23, cell33, cell32, cell31, cell21];
  cell23.neighbours = [cell12, cell13, cell14, cell24, cell34, cell33, cell32, cell22];
  cell24.neighbours = [cell13, cell14, cell34, cell33, cell23];

  cell31.neighbours = [cell21, cell22, cell32, cell42, cell41];
  cell32.neighbours = [cell21, cell22, cell23, cell33, cell43, cell42, cell41, cell31];
  cell33.neighbours = [cell22, cell23, cell24, cell34, cell44, cell43, cell42, cell32];
  cell34.neighbours = [cell23, cell24, cell44, cell43, cell33];

  cell41.neighbours = [cell31, cell32, cell42];
  cell42.neighbours = [cell31, cell32, cell33, cell43, cell41];
  cell43.neighbours = [cell32, cell33, cell34, cell44, cell42];
  cell44.neighbours = [cell33, cell34, cell43];

  var seedUniverse = [
    cell11, cell12, cell13, cell14,
    cell21, cell22, cell23, cell24,
    cell31, cell32, cell33, cell34,
    cell41, cell42, cell43, cell44
  ];

  it('should be able to initialize', function() {
    var universe = new Universe(seedUniverse);
    universe.tick();

    console.log(+cell11.alive + ' ' + +cell12.alive + ' ' + +cell13.alive + ' ' + +cell14.alive);
    console.log(+cell21.alive + ' ' + +cell22.alive + ' ' + +cell23.alive + ' ' + +cell24.alive);
    console.log(+cell31.alive + ' ' + +cell32.alive + ' ' + +cell33.alive + ' ' + +cell34.alive);
    console.log(+cell41.alive + ' ' + +cell42.alive + ' ' + +cell43.alive + ' ' + +cell44.alive);
  });

});