describe("CalculatePrice", function() {

  it("promotions should contain 2 discount promotion and 1 second half promotion", function() {
      var promotions = [new DisCountPromotion( 95 ), new SecondHalfPromotion(), new DisCountPromotion( 80 )];
      CalculatePrice.setPromotions( promotions );
      expect( CalculatePrice.promotions.length ).toEqual( 3 );
      expect( CalculatePrice.promotions ).toContain( new SecondHalfPromotion() );
      expect( CalculatePrice.promotions ).toContain( new DisCountPromotion( 95 ) );
    });

  it("commodity price should be 114", function() {
    var promotions = [new DisCountPromotion( 95 )];
    CalculatePrice.setPromotions( promotions );
    var result = CalculatePrice.getCommodityPrice( 40, 3 );
    expect( result ).toEqual( 114 );
  });

  it("commodity price should be 100", function() {
      var promotions = [new SecondHalfPromotion()];
      CalculatePrice.setPromotions( promotions );
      var result = CalculatePrice.getCommodityPrice( 40, 3 );
      expect( result ).toEqual( 100 );
  });

  it("commodity price should be 76", function() {
        var promotions = [new DisCountPromotion( 95 ), new SecondHalfPromotion(), new DisCountPromotion( 80 )];
        CalculatePrice.setPromotions( promotions );
        var result = CalculatePrice.getCommodityPrice( 40, 3 );
        expect( result ).toEqual( 76 );
  });
});

describe("PosMachine", function() {
  var commodityItems;
  var discountPromotionItems;
  var secondHalfPromotionItems;
  var posMachine;

  beforeEach(function() {
      commodityItems = [ new CommodityItem( "ITEM000001", 40 ),
                             new CommodityItem( "ITEM000003", 50 ),
                             new CommodityItem( "ITEM000005", 60 )];
      discountPromotionItems = [ new DiscountPromotionItem( "ITEM000001", 75 ),
                                     new DiscountPromotionItem( "ITEM000005", 90 )];
      secondHalfPromotionItems = [ new SecondHalfPromotionItem("ITEM000001"),
                                       new SecondHalfPromotionItem("ITEM000003")];
      posMachine = new PosMachine( commodityItems, discountPromotionItems, secondHalfPromotionItems);
    });

  it("barcode ITEM000003'price should be 50", function() {

      expect( posMachine.queryItemPrice( "ITEM000003" ) ).toEqual( 50 );
    });

  it("5 ITEM00001's price should be 120", function() {
    console.log( posMachine.promotionMap);
    var result = posMachine.calculateSubtotal( new CartItem( "ITEM000001", 5 ) );
    expect( result ).toEqual( 120 );
  });

  describe( "calculate", function(){
      it("cart items total price should be 258", function() {
            var cartItems = [new CartItem( "ITEM000001", 3 ),
                             new CartItem( "ITEM000003", 2 ),
                             new CartItem( "ITEM000005", 2 )];

            var result = posMachine.calculate( cartItems );

            expect( result ).toEqual( 258 );
      });

      it("cart items total price should be 0", function() {
            var cartItems = [];

            var result = posMachine.calculate( cartItems );

            expect( result ).toEqual( 0 );
      });
  });
});