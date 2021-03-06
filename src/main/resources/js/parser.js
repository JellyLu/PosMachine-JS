function CartItem( barcode, quantity ){
    this.barcode = barcode;
    this.quantity = quantity;
}

function CommodityItem( barcode, price ){
    this.barcode = barcode;
    this.price = price;
}

function DiscountPromotionItem( barcode, discount ){
    this.barcode = barcode;
    this.discount = discount;
}

function SecondHalfPromotionItem( barcode ){
    this.barcode = barcode;
}

var Parser = function(){}

Parser.prototype = {
    PATTERN:/.*/,
    parse:function( input ){
        var list = [];
        input.forEach( function( line){
            this.validateInput( line );
            list.push( this.parseLine( line ) );
        }, this);
        return list;
    },
    validateInput:function( line ){
        try{
          var isPattern = this.getPattern().test(line);
            if( !isPattern ){
                console.log( this.getPattern() + " " + isPattern + " " + line);
                throw "invalid input format";
            }
        }catch( err ){
            alert( err );
        }
    },
    parseLine:function( line ){
        return line;
    },
    getPattern:function(){
        return this.PATTERN;
    }
};

var CommodityParser = function(){}
CommodityParser.prototype = new Parser();
CommodityParser.prototype.PATTERN = /^(\w+):(\d+[.]*\d+)$/;
CommodityParser.prototype.parseLine = function( line ){
                                         var barcode = line.split(":")[0];
                                         var price = parseFloat( line.split(":")[1] );
                                         return new CommodityItem( barcode, price );
                                      };



var DiscountPromotionParser = function(){}
DiscountPromotionParser.prototype = new Parser();
DiscountPromotionParser.prototype.PATTERN = /^(\w+):(\d+)$/;
DiscountPromotionParser.prototype.parseLine = function( line ){
                                                   var barcode = line.split(":")[0];
                                                   var discount = parseInt( line.split(":")[1] );
                                                   return new DiscountPromotionItem( barcode, discount );
                                               };

var SecondHalfPromotionParser = function(){}
SecondHalfPromotionParser.prototype = new Parser();
SecondHalfPromotionParser.prototype.PATTERN = /[A-Za-z0-9]+/;
SecondHalfPromotionParser.prototype.parseLine = function( line ){ return new SecondHalfPromotionItem( line ); };

var CartParser = function(){}
CartParser.prototype = new Parser();
CartParser.prototype.PATTERN = /^(\w+)-(\d+)$/;
CartParser.prototype.parseLine = function( line ){
                                     var barcode = line.split("-")[0];
                                     var quantity = parseInt( line.split("-")[1] );
                                     return new CartItem( barcode, quantity );
                                  };
