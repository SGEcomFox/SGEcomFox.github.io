$(document).ready(function() {
    buildTestItems(10)
    console.log("start");
    
})

function buildTestItems(amount) {
    for(let i=0; i<amount; i++) {
        const newItem = $('<div>', {
            class: 'itemCard',
            id : 'item'+i
        });
        $('main').append(newItem);
    }
}