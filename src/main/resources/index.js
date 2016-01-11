var page_index = {
    posMachineController:new PosMachineController( "resource/" ),
    loadList:function(){
        var content = page_index.posMachineController.loadList();
        $('.list').html( content );
    },
    consume:function(){
        console.log( page_index.posMachineController );
        var result = page_index.posMachineController.consume();
        $('.result').html( result );
    }
};