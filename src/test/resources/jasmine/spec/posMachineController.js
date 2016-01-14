describe("PosMachineController", function() {

  beforeEach(function() {
     PosMachineController.resourcePath =  "resource/";

  });

  it("load 4 lists", function() {
     var count = 0;

     PosMachineController.loadList( function( isFinished ){
        if( isFinished ){
            expect( count ).toEqual( 3 );
            expect( PosMachineController.commodityItems.length ).toEqual( 3 );
            expect( PosMachineController.discountPromotionItems.length ).toEqual( 2 );
            expect( PosMachineController.secondHalfPromotionItems.length ).toEqual( 2 );
            expect( PosMachineController.cartItems.length ).toEqual( 3 );
        }else{
          count ++;
        }
    });

  });

  it("total price should be 258", function() {
     PosMachineController.loadList( function( isFinished ){
        if( isFinished ){
            var result = PosMachineController.consume();
            expect( result ).toEqual( 258 );
        }
     });

  });

});
