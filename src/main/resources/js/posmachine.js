var CalculatePrice = {
    promotions:null,
    setPromotions:function( promotions ){
        this.promotions = promotions;
    },
    getCommodityPrice:function( originPrice, quantity ){
        var resultPrice = originPrice*quantity;
        if( this.promotions ){
            this.promotions.forEach( function( promotion ){
                resultPrice -= promotion.getPrice( originPrice, quantity );
                originPrice = resultPrice/quantity;
            });
        }
        return resultPrice;
    }
};

var PosMachine = function( commodityItems, discountPromotionItems,  secondHalfPromotionItems ){
     this.commodityItems = commodityItems;
     this.discountPromotionItems = discountPromotionItems;
     this.secondHalfPromotionItems = secondHalfPromotionItems;
     this.setPromotionMap();
};

PosMachine.prototype = {
    promotionMap:new HashMap(),
    setPromotionMap:function(){
       this.addDiscountPromotionToMap();
       this.addSecondHalfPromotionToMap();
    },
    addDiscountPromotionToMap:function(){
        if( this.discountPromotionItems && this.discountPromotionItems.length > 0 ){
            for( var i = 0, len = this.discountPromotionItems.length; i < len; ++i ){
                var discountPromotionItem = this.discountPromotionItems[i];
                var promotionList = this.promotionMap.get( discountPromotionItem["barcode"] )?this.promotionMap.get( discountPromotionItem["barcode"] ):new Array();
                promotionList.push( new DisCountPromotion( discountPromotionItem["discount"] ) );
                this.promotionMap.put( discountPromotionItem["barcode"], promotionList);
            };
        }
    },
    addSecondHalfPromotionToMap:function(){
        if( this.secondHalfPromotionItems && this.secondHalfPromotionItems.length > 0 ){
            for( var i = 0, len = this.secondHalfPromotionItems.length; i < len; ++i ){
                var secondHalfPromotionItem = this.secondHalfPromotionItems[i];
                var promotionList = this.promotionMap.get( secondHalfPromotionItem["barcode"] )?this.promotionMap.get( secondHalfPromotionItem["barcode"] ):new Array();
                promotionList.push( new SecondHalfPromotion());
               this. promotionMap.put( secondHalfPromotionItem["barcode"], promotionList );
            }
        }
    },
    calculate:function( cartItems ){
        var total = 0.00;
        if( cartItems ){
            for( var i = 0, len = cartItems.length; i < len; ++i ){
                total += this.calculateSubtotal( cartItems[i] );
            }
        }
        return total;
    },
    calculateSubtotal:function( cartItem ){
        var barcode = cartItem["barcode"];
        CalculatePrice.setPromotions( this.promotionMap.get(barcode) );
        var originPrice = this.queryItemPrice( barcode );
        return CalculatePrice.getCommodityPrice( originPrice, cartItem["quantity"] );
    },
    queryItemPrice:function( barcode ){
        for( var i = 0, len = this.commodityItems.length; i < len; ++i ){
            var commodityItem = this.commodityItems[i];
            if( commodityItem["barcode"] ==  barcode  ){
                return commodityItem["price"];
            }
        }
    }
};



