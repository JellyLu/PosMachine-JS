var CalculatePrice = {
    promotions:null,
    setPromotions:function( promotions ){
        this.promotions = promotions;
    },
    getCommodityPrice( originPrice, quantity ){
        var resultPrice = originPrice*quantity;
        if( this.promotions ){
            this.promotions.forEach( function( promotion ){
                resultPrice -= promotion.getPrice( originPrice, quantity );
                originPrice = resultPrice/quantity;
            });
        }
        return resultPrice;
    }
}


var PosMachine = function( commodityItems, discountPromotionItems,  secondHalfPromotionItems ){
     this.commodityItems = commodityItems;
     this.discountPromotionItems = discountPromotionItems;
     this.secondHalfPromotionItems = secondHalfPromotionItems;
     this.setPromotionMap();
};

PosMachine.prototype = {
    promotionMap:{},
    setPromotionMap:function(){
       this.addDiscountPromotionToMap();
       this.addSecondHalfPromotionToMap();
    },
    addDiscountPromotionToMap:function(){
        if( this.discountPromotionItems && this.discountPromotionItems.length > 0 ){
            this.discountPromotionItems.forEach( function( discountPromotionItem ){
                var promotionList = promotionMap[discountPromotionItem["barcode"]];
                promotionList.push( new DiscountPromotion( discountPromotionItem));
                promotionMap[discountPromotionItem["barcode"]] = promotionList;
            });
        }
    },
    addSecondHalfPromotionToMap:function(){
        if( this.secondHalfPromotionItems && this.secondHalfPromotionItems.length > 0 ){
            this.secondHalfPromotionItems.forEach( function( secondHalfPromotionItem ){
                var promotionList = promotionMap[secondHalfPromotionItem["barcode"]];
                promotionList.push( new SecondHalfPromotion());
                promotionMap[secondHalfPromotionItem["barcode"]] = promotionList;
            });
        }
    },
    calculate:function( cartItems ){
        console.log( cartItems );
        var total = 0.00;
        for( var i = 0, len = cartItems.length; i < len; ++i ){
            total += this.calculateSubtotal( cartItem[i] );
        }
        return total;
    },
    calculateSubtotal:function( cartItem ){
        var barcode = cartItem["barcode"];
        var calculatePrice = new CalculatePrice();
        cartItem.setPromotions( this.promotionMap[barcode] );
        return calculatePrice.getCommodityPrice( this.queryItemPrice( barcode ), cartItem["quantity"] );
    },
    queryItemPrice:function( barcode ){
        this.commodityItems.forEach( function( commodityItem ){
            if( commodityItem["barcode"].equal( barcode ) ){
                return commodityItem["price"];
            }
        });
    }
}

var PosMachineController = function( resourcePath ){ this.resourcePath = resourcePath; }

PosMachineController.prototype = {
    commodityItems:null,
    discountPromotionItems:null,
    secondHalfPromotionItems:null,
    cartItems:null,
    getPath:function(){
       var js=document.scripts;
       var jsPath;
       for(var i=js.length;i>0;i--){
        if(js[i-1].src.indexOf("posmachine.js")>-1){
          jsPath=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")-2);
        }
       }
       return jsPath + this.resourcePath;
    },
    loadList:function(){
        var content = "";
        var path = this.getPath();

        $.get( path + "itemlist.txt",function(data){
            var commodityParser = new CommodityParser();
            this.commodityItems = commodityParser.parse( data.split("\n") );
            console.log( "com:" + JSON.stringify( this.commodityItems ));
        });

        $.get( path + "discount_promotion.txt",function(data){
            var discountPromotionParser = new DiscountPromotionParser();
            this.discountPromotionItems = discountPromotionParser.parse( data.split("\n") );
            console.log( "dis:" + JSON.stringify( this.discountPromotionItems ));
        });

        $.get( path + "second_half_price_promotion.txt",function(data){
            var secondHalfPromotionParser = new SecondHalfPromotionParser();
            this.secondHalfPromotionItems = secondHalfPromotionParser.parse( data.split("\n") );
            console.log( "sec:" + JSON.stringify( this.secondHalfPromotionItems ));
        });

        $.get( path + "cart.txt",function(data){
            var cartParser = new CartParser();
            this.cartItems = cartParser.parse( data.split("\n") );
            console.log( "cart:" + JSON.stringify( this.cartItems ));
        });


    },
    consume:function(){
        var posMachine = new PosMachine( this.commodityItems, this.discountPromotionItems, this.secondHalfPromotionItems );
        var totalConsume = posMachine.calculate( this.cartItems );
        console.log( "totol consume:" + totalConsume );
        return totalConsume;
    }

};

