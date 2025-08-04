import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://kblncwtvwxcslvbdkmkv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtibG5jd3R2d3hjc2x2YmRrbWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyOTcxODgsImV4cCI6MjA2OTg3MzE4OH0.piYep49xM1rgMeKw1U0Lzbq_JmHMG3EGPPG894lajUk';
const supabase = createClient(supabaseUrl, supabaseKey);

let itemData = [];
let playerData = [];
let inventoryData = [];
let categoryData = [];

$(document).ready(function() {    
    importDataBase().then(() => {
         buildDom();
    });
   
    //buildTestItems(10)
})

function buildDom(){
    buildButtons();
}

function buildButtons() {
    console.log(playerData);
    
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
    console.log("load Items");
    
}

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




