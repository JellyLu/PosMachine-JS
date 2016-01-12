var PosMachineController = {
    commodityItems:null,
    discountPromotionItems:null,
    secondHalfPromotionItems:null,
    cartItems:null,
    resourcePath:"",
    getPath:function(){
       var js=document.scripts;
       var jsPath;
       for(var i=js.length;i>0;i--){
        if(js[i-1].src.indexOf("PosMachineController.js")>-1){
          jsPath=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")-2);
        }
       }
       return jsPath + PosMachineController.resourcePath;
    },
    loadList:function(){
        var path = this.getPath();

        $.get( path + "itemlist.txt",function(data){
            var commodityParser = new CommodityParser();
            PosMachineController.commodityItems = commodityParser.parse( data.split("\n") );
        });

        $.get( path + "discount_promotion.txt",function(data){
            var discountPromotionParser = new DiscountPromotionParser();
            PosMachineController.discountPromotionItems = discountPromotionParser.parse( data.split("\n") );
        });

        $.get( path + "second_half_price_promotion.txt",function(data){
            var secondHalfPromotionParser = new SecondHalfPromotionParser();
            PosMachineController.secondHalfPromotionItems = secondHalfPromotionParser.parse( data.split("\n") );
        });

        $.get( path + "cart.txt",function(data){
            var cartParser = new CartParser();
            PosMachineController.cartItems = cartParser.parse( data.split("\n") );
        });


    },
    consume:function(){
        var posMachine = new PosMachine( PosMachineController.commodityItems, PosMachineController.discountPromotionItems, PosMachineController.secondHalfPromotionItems );
        var totalConsume = posMachine.calculate( PosMachineController.cartItems );
        return totalConsume;
    }

};