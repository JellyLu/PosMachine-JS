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
       this.promotionMap = new HashMap();
       this.addDiscountPromotionToMap();
       this.addSecondHalfPromotionToMap();
    },
    addDiscountPromotionToMap:function(){
        if( this.discountPromotionItems && this.discountPromotionItems.length > 0 ){
            this.discountPromotionItems.forEach( function( discountPromotionItem ){
                var promotionList = this.promotionMap.get( discountPromotionItem["barcode"] )?this.promotionMap.get( discountPromotionItem["barcode"] ):new Array();
                promotionList.push( new DisCountPromotion( discountPromotionItem["discount"] ) );
                this.promotionMap.put( discountPromotionItem["barcode"], promotionList);
            }, this);
        }
    },
    addSecondHalfPromotionToMap:function(){
        if( this.secondHalfPromotionItems && this.secondHalfPromotionItems.length > 0 ){
            this.secondHalfPromotionItems.forEach( function( secondHalfPromotionItem ) {
                var promotionList = this.promotionMap.get( secondHalfPromotionItem["barcode"] )?this.promotionMap.get( secondHalfPromotionItem["barcode"] ):new Array();
                promotionList.push( new SecondHalfPromotion());
                this. promotionMap.put( secondHalfPromotionItem["barcode"], promotionList );
            }, this );
        }
    },
    calculate:function( cartItems ){
        var total = 0.00;
        if( cartItems ){
            cartItems.forEach( function( cartItem ){
                total += this.calculateSubtotal( cartItem );
            }, this );
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
        var price = 0.0;
        this.commodityItems.forEach( function( commodityItem ){
            if( commodityItem["barcode"] ==  barcode  ){
                price = commodityItem["price"];
                return;
            }
        });
        return price;
    }
};



