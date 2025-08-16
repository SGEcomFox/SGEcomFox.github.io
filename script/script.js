import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const supabaseUrl = 'https://kblncwtvwxcslvbdkmkv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtibG5jd3R2d3hjc2x2YmRrbWt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyOTcxODgsImV4cCI6MjA2OTg3MzE4OH0.piYep49xM1rgMeKw1U0Lzbq_JmHMG3EGPPG894lajUk';
const supabase = createClient(supabaseUrl, supabaseKey);

let itemData = [];
let playerData = [];
let inventoryData = [];
let categoryData = [];
let inventory = [];
let activePlayer;

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
            $('main').empty();
            activePlayer = player.playerName;
            loadItems(player.playerName);          
        })
        $('#navBar').append(button);    
    }
    $('#closeButton').click(async function() {
        $('#dialogWindow').css('display', 'none');
        inventoryData = await importData( 'inventory', '*');
        inventory = createInventory();
        loadItems(activePlayer);    
    })
    $('#loginButton').on('click', () => {
        const loginWindow = $(`<div id="loginWindow">
                <input inputmode="numeric" id="loginInput">
                <button id="loginClose">Close</button>
                <button id="loginEnter">Enter</button>
            </div>`);
        $('main').append(loginWindow);
        $('main').on('click', '#loginClose, #loginEnter', (e) => {
            if (e.target.id === 'loginClose') {
                $('#loginWindow').remove();
            } else if (e.target.id === 'loginEnter') {
                console.log("Enter");
                
                
                const value = $('#loginInput').val();
                console.log(typeof(value));
                tryLogin(value);
            }
        });
    });
}

function loadItems(name) {
    $('main').empty();
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
    createAddButton(name);  
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

function createAddButton(name) {
    //if logged in == true {
    const addButtonDiv = $(`
        <div class="itemCard" id="addButton_${name}}">
            <img class="addIcon" src="/icons/addIcon.png" />              
        </div>`);
    $('main').append(addButtonDiv);
    $('.addIcon').on('click', () => {
        addNewItemDialog(name);
    })    
}

function addNewItemDialog(name) {   
    const categorySelect = $('<div class="categorySelect" id="categorySelect">');
    
    $('#dialogWindow').css('display', 'block')
    $('#dialogWindowContent').empty();
    $('#dialogWindowContent').append(categorySelect);
    for(const category of categoryData ) {
        const categoryIcon = $(
            `<div id="categoryDiv_${category.name}" class="categoryDiv">
                <img class="categoryIcon" src="/icons/${category.symbol}" />
            </div>`).css('background-color', category.color);
        $('#categorySelect').append(categoryIcon);
        $(`#categoryDiv_${category.name}`).on('click', () => {
            listItems(category.name, name);
        });        
    }  
}

function listItems(category, player) {
    $('#dialogWindowContent').empty();
    for (const item of itemData) {
        if (item.category === category) {
            $(`<div class= "itemListing">
                    <label class ="itemListingName" >${item.item_name}</label>
                    <button class="itemListingAddButton" id="itemListingButton_${item.id}"> Add </button>
                    <label class="itemListingDescription">${item.short_description}</label>
                </div>`).appendTo('#dialogWindowContent');
            $(`#itemListingButton_${item.id}`).on('click', () => {
                addItem(item.id, player);                                             
            })

        }
    }  
}

async function addItem(item_id, player) {
    // Step 1: Check if this player already has the item
    const { data: existing, error: fetchError } = await supabase
        .from('inventory') // your table name
        .select('*')
        .eq('player', player)
        .eq('item_id', item_id)
        .maybeSingle();

    if (fetchError) {
        console.error('Error fetching inventory:', fetchError);
        return;
    }

    if (existing) {
        // Step 2: Update amount
        const { error: updateError } = await supabase
            .from('inventory')
            .update({ amount: existing.amount + 1 })
            .eq('id', existing.id);

        if (updateError) {
            console.error('Error updating inventory:', updateError);
        } else {
            console.log(`Increased amount for ${player}, item ${item_id}`);
        }
    } else {
        // Step 3: Insert new row
        const { error: insertError } = await supabase
            .from('inventory')
            .insert([
                {
                    item_id: item_id,
                    player: player,
                    amount: 1
                }
            ]);

        if (insertError) {
            console.error('Error inserting inventory:', insertError);
        } else {
            console.log(`Added new item ${item_id} for ${player}`);
        }
    }

}

async function tryLogin(value) {
    const { data, error } = await supabase
        .from('loginData')
        .select('password')
        .single();

    if (data.password == value) {
        console.log("success");
        
    } else {
        console.log("fail");
        
    }
}





