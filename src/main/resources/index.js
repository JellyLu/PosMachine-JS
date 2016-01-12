var page_index = {
    loadList:function(){
        PosMachineController.resourcePath =  "resource/";
        PosMachineController.loadList();
    },
    showList:function(){
         var html = "";
         html += "cartItems:</br>" + JSON.stringify( PosMachineController.cartItems ) + "</br></br>";
         html += "commodityItems:</br>" + JSON.stringify( PosMachineController.commodityItems ) + "</br></br>";
         html += "discountPromotionItems:</br>" + JSON.stringify( PosMachineController.discountPromotionItems ) + "</br></br>";
         html += "secondHalfPromotionItems:</br>" + JSON.stringify( PosMachineController.secondHalfPromotionItems ) + "</br></br>";
         $('.list').html(  html );
    },
    consume:function(){
        var result = PosMachineController.consume();
        $('.result').html( result );
    }
};