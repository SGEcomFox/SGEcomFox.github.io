import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://kblncwtvwxcslvbdkmkv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtibG5jd3R2d3hjc2x2YmRrbWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyOTcxODgsImV4cCI6MjA2OTg3MzE4OH0.piYep49xM1rgMeKw1U0Lzbq_JmHMG3EGPPG894lajUk';
const supabase = createClient(supabaseUrl, supabaseKey);

let itemData = [];
let playerData = [];
let inventoryData = [];
let categoryData = [];
let inventory = [];

$(document).ready(function() {    
    importDataBase().then(() => {
        inventory = createInventory();                      
        buildDom();
    });
   
    //buildTestItems(10)
})

function buildDom(){
    buildButtons();
}

function buildButtons() {
    for (const player of playerData) { 
        const button = $('<button>', {
            id: player.playerName + 'Button',  
            class: 'playerButton',
            text: player.characterName
        });
        button.css('background-color', player.color);
        button.on('click', () => {
            loadItems(player.playerName)
        })
        $('#navBar').append(button);    
    }
}

function loadItems(name) {
     for (const item of inventory) {
        if (item.player !== name) continue; 
        const itemCard = $(`
            <div class="itemCard" id="item${item.id}">
                <img class="itemIcon" src="/icons/${item.symbol}" />
                <label class="itemName" id="itemName${item.id}">${item.item_name}</label>
                <label class="itemCount" id="itemCount${item.id}">${item.amount}</label>
                <label class="itemDescription" id="itemDescription${item.id}">${item.description}</label>               
            </div>
        `).css('background-color', item.color);

        $('main').append(itemCard);
    }  
}

function buildTestItems() {
    for(let i=0; i<amount; i++) {
        const newItem = $('<div>', {
            class: 'itemCard',
            id: `item${i}`
        });
        $('main').append(newItem);
        const newIcon = $('<img>', {
            class: 'itemIcon',
            src: '/icons/sword.png'
        });
        newItem.append(newIcon)
        const newItemName = $('<label>', {
            class: 'itemName',
            id: `itemName${i}`
        });
        newItemName.text('testItem');
        newItem.append(newItemName);
        const newItemCount = $('<label>', {
            class: 'itemCount',
            id: `itemCount${i}`
        });
        newItemCount.text(x);
        newItem.append(newItemCount);
        const newItemDescription = $('<label>', {
            class: 'itemDescription',
            id: `itemDescription${i}`
        })
        const coin = Math.random();
        if(coin > 0.8) {
            newItemDescription.text(y);
        } else {
            newItemDescription.text(y);
        }
        newItem.append(newItemDescription);        
    }
}

async function importDataBase(data) {
    switch(data) {
        case 'player':
            playerData = await importData('players', '*');
            break;
        case 'category':
            categoryData = await importData('categories', '*');
            break;
        case 'inventory':
            inventoryData = await importData( 'inventory', '*');
            break;
        case 'item':
            itemData = await importData('items', '*');
            break;
        default:
            playerData = await importData('players', '*');
            categoryData = await importData('categories', '*');
            inventoryData = await importData( 'inventory', '*');
            itemData = await importData('items', '*');
            console.log('importDataBase done'); 
            break;
    }
}

async function importData(table, columns) {
    const { data, error } = await supabase
        .from(table)
        .select(columns);

    if (error) {
        console.error('Error loading items:', error.message);
    } else {
        return data
    }
}

function createInventory() {
    const inventory = inventoryData.map(inv => {
        const item = itemData.find(it => it.id === inv.item_id);
        const category = categoryData.find(cat => cat.name === item?.category);
        return {
            id: inv.id,
            item_id: inv.item_id,
            player: inv.player,
            amount: inv.amount,
            item_name: item?.item_name ?? null,
            description: item?.description ?? null,
            category: item?.category ?? null,
            color: category?.color ?? null,
            symbol: category?.symbol ?? null
        };
    });  
    return inventory;       
}




