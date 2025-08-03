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
        const newItemDescription = $('<label>', {
            class: 'itemDescription',
            id: 'itemDescription'+i
        })
        const coin = Math.random();
        if(coin > 0.8) {
            newItemDescription.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla non porttitor nibh, non faucibus arcu. Sed nec elit quis erat pharetra consequat sit amet sit amet justo. Integer aliquet vehicula nunc, id placerat quam mollis eu. Nam sed lorem felis. Phasellus sit amet neque tempor, condimentum est eget, rhoncus metus.');
        } else {
            newItemDescription.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        }
        newItem.append(newItemDescription);        
    }
}

