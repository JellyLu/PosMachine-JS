describe("Promotion", function() {
  var promotion;

  beforeEach(function() {
    promotion = new Promotion();
  });

  it("promotion price should be 0", function() {
    var result = promotion.getPrice( 40.2, 3 );
    expect( result ).toEqual( 0 );
  });

});

describe("DisCountPromotion", function() {
  var promotion;

  beforeEach(function() {
    promotion = new DisCountPromotion( 95 );
  });

  it("promotion price should be 6", function() {
    var result = promotion.getPrice( 40, 3 );
    expect( result ).toEqual( 6 );
  });

});

describe("SecondHalfPromotion", function() {
  var promotion;

  beforeEach(function() {
    promotion = new SecondHalfPromotion();
  });

  it("promotion price should be 0", function() {
      var result = promotion.getPrice( 40, 1 );
      expect( result ).toEqual( 0 );
    });

  it("promotion price should be 20", function() {
    var result = promotion.getPrice( 40, 3 );
    expect( result ).toEqual( 20 );
  });

  it("promotion price should be 40", function() {
      var result = promotion.getPrice( 40, 4 );
      expect( result ).toEqual( 40 );
    });

});