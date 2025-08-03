$(document).ready(function() {
    buildTestItems(10)
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
           const scrollWrapper = $('<div>', {
            class: 'descriptionScrollWrapper'
        });
        const newItemDescription = $('<label>', {
            class: 'itemDescription',
            id: 'itemDescription'+i
        })
        newItemDescription.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id neque vitae mauris venenatis finibus. Nulla ultricies dignissim iaculis. Suspendisse quis sodales justo. Vivamus metus augue, rhoncus sit amet vulputate eget, sagittis eget enim. Nulla eget bibendum risus. Etiam sit amet elit dapibus, ultricies mi at, varius mi. Maecenas feugiat purus a placerat mattis.');
        scrollWrapper.append(newItemDescription); 
        newItem.append(scrollWrapper);        
    }
}

