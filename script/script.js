$(document).ready(function() {
    buildTestItems(10)
    console.log("start");
    
})

function buildTestItems(amount) {
    for(let i=0; i<amount; i++) {
        const newItem = $('<div>', {
            class: 'itemCard',
            id: 'item'+i
        });
        $('main').append(newItem);
        const newIcon = $('<img>', {
            class: 'itemIcon',
            src: '/icons/sword.png'
        });
        newItem.append(newIcon)
        const newItemName = $('<label>', {
            class: 'itemName',
            id: 'itemName'+i
        });
        newItemName.text('testItem');
        newItem.append(newItemName);
        const newItemCount = $('<label>', {
            class: 'itemCount',
            id: 'itemCount'+i
        });
        newItemCount.text(Math.floor(Math.random() * 99) + 1);
        newItem.append(newItemCount);

        
    }
}