describe("parser", function() {
  var parser;

  beforeEach(function() {
    parser = new Parser();
  });

  it("should be able to parse a line", function() {
    var result = parser.parseLine( "ITEM-10001:10.2" );
    expect( result ).toEqual( "ITEM-10001:10.2" );
  });

  it( "pattern is /.*/", function() {
    expect( parser.getPattern() ).toEqual( /.*/ );
  });

//  it("input is valid", function() {
//    expect(function() {
//          parser.validateInput( "" );
//    }).toThrowError("invalid input format");
//  });

  describe("parse input", function() {
        var input;
        beforeEach(function() {
           input = ["ITEM-1001","ITEM-1002", "ITEM-1003"];
        });

        it("parse input to be array list", function() {
          var result = parser.parse( input );

          expect( result.length ).toEqual( 3 );
          expect( result[0] ).toEqual( "ITEM-1001" );
        });
  });

});

describe("CommodityParser", function() {
  var parser;

  beforeEach(function() {
    parser = new CommodityParser();
  });

  it("should be able to parse a line", function() {
    var result = parser.parseLine( "ITEM10001:10.2" );
    expect( result ).toEqual( new CommodityItem( "ITEM10001", 10.2 ) );
  });

  it( "pattern is /^(\\w+):(\\d+[.]*\\d+)$/", function() {
    expect( parser.getPattern() ).toEqual( /^(\w+):(\d+[.]*\d+)$/ );
  });


  describe("parse input", function() {
        var input;
        beforeEach(function() {
           input = ["ITEM10001:10.2","ITEM000001:40", "ITEM000003:32.3"];
        });

        it("parse input to be 3 commodities ", function() {
          var result = parser.parse( input );

          expect( result.length ).toEqual( 3 );
          expect( result[0] ).toEqual( new CommodityItem( "ITEM10001", 10.2 ) );
        });
  });

});

describe("DiscountPromotionParser", function() {
  var parser;

  beforeEach(function() {
    parser = new DiscountPromotionParser();
  });

  it("should be able to parse a line", function() {
    var result = parser.parseLine( "ITEM-10001:96" );
    expect( result ).toEqual( new DiscountPromotionItem( "ITEM-10001", 96 ) );
  });

  it( "pattern is /^(\\w+):(\\d+)$/", function() {
    expect( parser.getPattern() ).toEqual( /^(\w+):(\d+)$/ );
  });

  describe("parse input", function() {
        var input;
        beforeEach(function() {
           input = ["ITEM10001:95","ITEM00002:85"];
        });

        it("parse input to be 2 discount promotion items", function() {
          var result = parser.parse( input );

          expect( result.length ).toEqual( 2 );
          expect( result[0] ).toEqual( new DiscountPromotionItem( "ITEM10001", 95 ) );
        });
  });

});

describe("SecondHalfPromotionParser", function() {
  var parser;

  beforeEach(function() {
    parser = new SecondHalfPromotionParser();
  });

  it("should be able to parse a line", function() {
    var result = parser.parseLine( "ITEM10001" );
    expect( result ).toEqual( new SecondHalfPromotionItem( "ITEM10001" ) );
  });

  it( "pattern is /[A-Za-z0-9]+/", function() {
    expect( parser.getPattern() ).toEqual( /[A-Za-z0-9]+/ );
  });

  describe("parse input", function() {
        var input;
        beforeEach(function() {
           input = ["ITEM10001","ITEM000003"];
        });

        it("parse input to be 2 second half promotion items", function() {
          var result = parser.parse( input );

          expect( result.length ).toEqual( 2 );
          expect( result[0] ).toEqual( new SecondHalfPromotionItem( "ITEM10001" ) );
        });
  });

});

describe("CartParser", function() {
  var parser;

  beforeEach(function() {
    parser = new CartParser();
  });

  it("should be able to parse a line", function() {
    var result = parser.parseLine( "ITEM10001-4" );
    expect( result ).toEqual( new CartItem( "ITEM10001", 4 ) );
  });

  it( "pattern is /^(\\w+)-(\\d+)$/", function() {
    expect( parser.getPattern() ).toEqual( /^(\w+)-(\d+)$/ );
  });

  describe("parse input", function() {
        var input;
        beforeEach(function() {
           input = ["ITEM10001-4","ITEM000003-3"];
        });

        it("parse input to be 2 second half promotion items", function() {
          var result = parser.parse( input );

          expect( result.length ).toEqual( 2 );
          expect( result[0] ).toEqual( new CartItem( "ITEM10001", 4 ) );
        });
  });

});