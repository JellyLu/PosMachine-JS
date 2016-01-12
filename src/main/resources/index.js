var page_index = {
    loadList:function(){
        PosMachineController.resourcePath =  "resource/";
        PosMachineController.loadList( page_index.showList );
    },
    showList:function( canCalculate ){
        if( PosMachineController.canCalculate ){
            $(".calculateBtn").removeAttr("disabled");
            $(".calculateBtn").css( "background-color", "#317EE7");
           var html = "";
                    html += "cartItems:</br>" + JSON.stringify( PosMachineController.cartItems ) + "</br></br>";
                    html += "commodityItems:</br>" + JSON.stringify( PosMachineController.commodityItems ) + "</br></br>";
                    html += "discountPromotionItems:</br>" + JSON.stringify( PosMachineController.discountPromotionItems ) + "</br></br>";
                    html += "secondHalfPromotionItems:</br>" + JSON.stringify( PosMachineController.secondHalfPromotionItems ) + "</br></br>";
                    $('.list').html(  html );
        }else{
            console.log( "读取文件还未结束,请稍后再试!" );
        }

    },
    consume:function(){
        var result = PosMachineController.consume();
        $('.result').html( result );
    }
};