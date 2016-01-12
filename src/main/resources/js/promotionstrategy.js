var Promotion = function(){}
Promotion.prototype = {
    getPrice:function( originPrice, quantity ){
        return 0;
    }
};

var DisCountPromotion = function( discount ){
    try{
        if( discount < 0 ){
            throw "则口不能小于0";
        }
        this.discount = discount;
    }catch( err ){
        alert( err );
    }
}

DisCountPromotion.prototype = new Promotion();
DisCountPromotion.prototype.getPrice = function( originPrice, quantity ){
                                            return originPrice*( 100 - this.discount )*quantity/100;
                                       }

var SecondHalfPromotion = function(){}
SecondHalfPromotion.prototype = new Promotion();
SecondHalfPromotion.prototype.getPrice = function( originPrice, quantity ){
                                             var halfQuantity = parseInt(quantity/2);
                                             return originPrice/2*halfQuantity;
                                         }

