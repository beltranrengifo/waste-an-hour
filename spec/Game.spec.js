/* eslint no-undef: "off" */
/* eslint jasmine/no-spec-dupes: "off" */

describe('Game constructor', function () {
  beforeEach(function () {
    const game = new Game();
  });

  it('Create the Game object', function () {
    expect(typeof Game).toBe('function');
  });

});
/* 
describe('shuffleCard method', function () {
  beforeEach(function () {
    var cardsArray = [{ name: 'aquaman',         img: 'aquaman.jpg' },
    { name: 'batman',          img: 'batman.jpg' },
    { name: 'captain america', img: 'captain-america.jpg' },
    { name: 'fantastic four',  img: 'fantastic-four.jpg' },
    { name: 'flash',           img: 'flash.jpg' },
    { name: 'green arrow',     img: 'green-arrow.jpg' },
    { name: 'green lantern',   img: 'green-lantern.jpg' },
    { name: 'ironman',         img: 'ironman.jpg' },
    ]
    memoryGame = new MemoryGame(cardsArray);
  });

  it('Should be declare', function () {
    expect(typeof memoryGame.shuffleCard).toBe('function');
  });

  it('Should return an array', function () {
    expect(typeof memoryGame.shuffleCard(memoryGame.cards)).toBe('object');
  });

  it('Should mixed the array and return a different one from the original', function () {
    var firstArray = memoryGame.shuffleCard([1,2,3,4,5,6,7,8,9])
    var secondArray = memoryGame.shuffleCard([1,2,3,4,5,6,7,8,9])
    expect(firstArray).not.toEqual(secondArray);
  });
}); */


