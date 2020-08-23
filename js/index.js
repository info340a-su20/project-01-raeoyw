'use strict'

fetch('/data/data.json')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let data = json;

        // create clip based on the data
        for(let i = 0; i < data.clips.length; i++) {
            let clipInfo = data.clips[i];
            createNewClip(clipInfo);
            createDropdownItem(clipInfo.clipName);
        }

        // delete clip
        let deleteItem = document.querySelectorAll('.dropdown-item');
        deleteItem.forEach(function(e) {
            e.addEventListener('click', function() {
                let clipAll = document.querySelectorAll('.single');
                for(let i = 0; i < clipAll.length; i++) {
                    if(clipAll[i].innerText.includes(e.innerText)) {
                        clipAll[i].remove()
                        deleteItem[i].remove();
                    }
                }
            })
        })

        // change page
        let clipAll = document.querySelectorAll('.clip');
        clipAll.forEach(function(e){
            e.onclick = function() {

                fetch('/data/data.json')
                .then((response) => {
                    return response.json();
                })
                .then((json) => {
                    let data = json;

                    let clip = document.querySelector('.clip-container')
                    clip.style.display = "none";
                    
                    let text = e.innerText;
                    if(text.includes('Workout')) {
                        data = data.lists[0].workout;
                        listPage(data);
                    } else if(text.includes('Read')) {
                        data = data.lists[1].read;
                        listPage(data);
                    } else if(text.includes('Grandma')) {
                        data = data.lists[2].grandma;
                        listPage(data);
                    } else if(text.includes('Modern')) {
                        data = data.lists[3].modern;
                        listPage(data);
                    } else if(text.includes('Cook')) {
                        data = data.lists[4].cook;
                        listPage(data);
                    } else if(text.includes('School')) {
                        data = data.lists[5].schoolwork;
                        listPage(data);
                    } else if(text.includes('Guitar')) {
                        data = data.lists[6].guitar;
                        listPage(data);
                    }
                    // } else {
                    //     data = data.lists[7].new;
                    //     listPage(data);
                    // } 

                    // accepte new list
                    let createList = document.querySelector('#listForm');
                    createList.addEventListener('submit', function(event) {
                        event.preventDefault();

                        let listName = document.getElementById('new-list-name').value;
                        let listItem = document.getElementById('new-list-item').value;

                        let listInfo = {
                            'listName': listName,
                            'listItem': listItem
                        }

                        createNewList(listInfo);

                        document.forms[0].reset(); 

                        document.querySelector('.popUp').style.display = 'none';
                        document.querySelector('body').style.backgroundColor = 'white';
                    })
                })
                .catch((err) => {
                    console.error(err);
                })
            }
        })
    })
    .catch((err) => {
        console.error(err);
    })

// show create clip console
let addClipButton = document.querySelector('.add');
addClipButton.addEventListener('click', function() {
    document.querySelector('.popUp').style.display = 'flex';
    document.querySelector('body').style.backgroundColor = 'grey';
})

// close create clip console
let closePopup = document.querySelector('.cancel');
closePopup.addEventListener('click', function() {
    document.querySelector('.popUp').style.display = 'none';
    document.querySelector('body').style.backgroundColor = 'white';
})

// accept new clip
let clipContainer = document.querySelector('.clip-container');
let createClip = document.querySelector('form');
createClip.addEventListener('submit', function(event) {
    event.preventDefault();

    let clipName = document.getElementById('new-clip-name').value;
    let clipTimeRange = document.getElementById('new-clip-time').value;

    let clipInfo = {
        'clipName': clipName,
        'clipTimeRange': clipTimeRange,
        'clipCoverSrc': 'img/placeholder.jpeg'
    }

    createNewClip(clipInfo);
    createDropdownItem(clipInfo.clipName);

    // newList(clipInfo);

    document.forms[0].reset(); 

    document.querySelector('.popUp').style.display = 'none';
    document.querySelector('body').style.backgroundColor = 'white';
})


// functions

// create new clip based on the user input
function createNewClip(data) {
    let newClip = document.createElement('div');
    newClip.setAttribute('id', 'list');
    newClip.classList.add('flex-card');
    newClip.classList.add('clip');
    newClip.classList.add('single');

    let newCover = document.createElement('img');
    newCover.setAttribute('id', 'clip-img');
    newCover.classList.add('clip-img');
    newCover.src = data.clipCoverSrc;

    let newContent = document.createElement('div');
    newContent.classList.add('card-content');

    let newText = document.createElement('div');
    newText.classList.add('card-text');

    let newTitle = document.createElement('div');
    newTitle.classList.add('title');
    newTitle.innerHTML = data.clipTimeRange;

    let newGoal = document.createElement('div');
    newGoal.classList.add('goal');
    newGoal.innerHTML = data.clipName;

    // let changeImgBut = document.createElement('button');
    // changeImgBut.setAttribute('type', 'button');
    // changeImgBut.classList.add('btn');
    // changeImgBut.classList.add('btn-outline-dark');
    // changeImgBut.classList.add('changeCover');
    // changeImgBut.innerText = 'Change Cover';

    clipContainer.append(newClip);
    newClip.append(newCover);
    newClip.append(newContent);
    // newContent.append(changeImgBut);
    newContent.append(newText);
    newText.append(newTitle);
    newText.append(newGoal);
}

// create new dropdown item
function createDropdownItem(clipName) {
    let item = document.createElement('button');
    item.classList.add('dropdown-item');
    item.setAttribute('type', 'button');
    item.innerText = clipName;

    document.querySelector('.dropdown-menu').append(item);
}

// create list page
function listPage(data) {
    let body = document.querySelector('.whole');

    let bts = document.createElement('div');
    bts.classList.add('d-flex', 'justify-content-center');
    body.append(bts);

    let backLink = document.createElement('a');
    backLink.href = 'index.html';
    bts.append(backLink);

    let butReturn = document.createElement('button');
    butReturn.setAttribute('type', 'button');
    butReturn.classList.add('btn', 'btn-outline-dark');
    butReturn.innerText = 'Back To Clip';
    backLink.append(butReturn);

    let addClip = document.querySelector('.add');
    addClip.innerText = "+ List";    

    let deleteClip = document.querySelector('.delete');
    deleteClip.style.display = "none";

    let h2 = document.querySelector('h2');
    h2.innerText = "CREATE NEW LIST";

    let name = document.querySelector('#name');
    name.innerText = "List Name";

    let item = document.querySelector('#item');
    item.innerText = "List Item";

    let formChange = document.querySelector('form');
    formChange.setAttribute('id', 'listForm');

    let inputChange = document.querySelector('#new-clip-name');
    inputChange.setAttribute('id', 'new-list-name');

    let inputChange2 = document.querySelector('#new-clip-time');
    inputChange2.setAttribute('id', 'new-list-item');

    let justify = document.createElement('div');
    justify.classList.add('justify-content-center');
    body.append(justify);

    let innerContainer = document.createElement('div');
    innerContainer.classList.add('container');
    justify.append(innerContainer);

    let butGroup = document.createElement('div');
    butGroup.classList.add('d-flex', 'justify-content-center');
    innerContainer.append(butGroup);

    // let addBut = document.createElement('button');
    // addBut.setAttribute('type', 'button');
    // addBut.classList.add('btn', 'btn-outline-dark');
    // addBut.innerText = '+ List';
    // butGroup.append(addBut);

    // let deleteBut = document.createElement('button');
    // deleteBut.setAttribute('type', 'button');
    // deleteBut.classList.add('btn', 'btn-outline-dark');
    // deleteBut.innerText = '- List';
    // butGroup.append(deleteBut);

    let listContainer = document.createElement('div');
    listContainer.classList.add('list-container');
    innerContainer.append(listContainer);

    for(let i = 0; i < data.length; i++) {
        let list = document.createElement('div');
        list.setAttribute('id', 'list');
        list.classList.add('flex-card');
        listContainer.append(list);

        let header = document.createElement('div');
        header.classList.add('card-header');
        header.innerText = data[i].listName;
        list.append(header);

        let item = document.createElement('div');
        item.classList.add('container', 'listItem');
        item.classList.add('listItem');
        list.append(item);

        let check = document.createElement('div');
        check.classList.add('form-check');
        item.append(check);

        let input = document.createElement('input');
        input.classList.add('form-check-input');
        input.setAttribute('type', 'checkbox');
        input.setAttribute('value', '');
        input.setAttribute('id', 'defaultCheck1');
        check.append(input);

        for(let j = 0; j < data[i].listItem.length; j++) {
            let label = document.createElement('label');
            label.classList.add('form-check-label');
            label.setAttribute('for', 'defaultCheck1');
            label.innerText = data[i].listItem[j];
            check.append(label);
        }
    }
}

// create new list
function createNewList(data) {
    let listContainer = document.createElement('div');
    listContainer.classList.add('list-container');
    innerContainer.append(listContainer);

    let list = document.createElement('div');
    list.setAttribute('id', 'list');
    list.classList.add('flex-card');
    listContainer.append(list);

    let header = document.createElement('div');
    header.classList.add('card-header');
    header.innerText = data.listName;
    list.append(header);

    let item = document.createElement('div');
    item.classList.add('container', 'listItem');
    item.classList.add('listItem');
    list.append(item);

    let check = document.createElement('div');
    check.classList.add('form-check');
    item.append(check);

    let input = document.createElement('input');
    input.classList.add('form-check-input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', '');
    input.setAttribute('id', 'defaultCheck1');
    check.append(input);

    let label = document.createElement('label');
    label.classList.add('form-check-label');
    label.setAttribute('for', 'defaultCheck1');
    label.innerText = data.listItem;
    check.append(label);
}