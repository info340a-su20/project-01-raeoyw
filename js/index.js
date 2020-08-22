'use strict'

fetch('/data/data.json')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let data = json;
        console.log(data.clipName);
        let newClip = document.createElement('div');
        newClip.setAttribute('id', 'list');
        newClip.classList.add('flex-card');
        newClip.classList.add('clip');

        let newContent = document.createElement('div');
        newContent.classList.add('card-content');

        let newText = document.createElement('div');
        newText.classList.add('card-text');

        let newTitle = document.createElement('div');
        newTitle.classList.add('title');
        newTitle.innerHTML = data.clipName

        let newGoal = document.createElement('div');
        newGoal.classList.add('goal');
        newGoal.innerHTML = data.clipTimeRange;

        clipContainer.append(newClip);
        newClip.append(newContent);
        newContent.append(newText);
        newText.append(newTitle);
        newText.append(newGoal);
    })
    .catch((err) => {
        console.error(err);
    })

// Show Create Clip Console
let addClipButton = document.querySelector('.add');
addClipButton.addEventListener('click', function() {
    document.querySelector('.addClip').style.display = "flex";
    document.querySelector('body').style.backgroundColor = "grey";
})

// Create New Clip
let clips = [];
let clipContainer = document.querySelector('.list-container');
let createClip = document.querySelector('form');
createClip.addEventListener('submit', function(event) {
    event.preventDefault();

    let clipName = document.getElementById('new-clip-name').value;
    let clipTimeRange = document.getElementById('new-clip-time').value;

    let clip = {
        clipName: clipName,
        clipTimeRange: clipTimeRange
    }
    clips.push(clip);
    document.forms[0].reset();

    clips = JSON.stringify(clips);

    // Create new clip based on the user input
    let newClip = document.createElement('div');
    newClip.setAttribute('id', 'list');
    newClip.classList.add('flex-card');
    newClip.classList.add('clip');

    let newContent = document.createElement('div');
    newContent.classList.add('card-content');

    let newText = document.createElement('div');
    newText.classList.add('card-text');

    let newTitle = document.createElement('div');
    newTitle.classList.add('title');
    newTitle.innerHTML = clipTimeRange

    let newGoal = document.createElement('div');
    newGoal.classList.add('goal');
    newGoal.innerHTML = clipName;

    clipContainer.append(newClip);
    newClip.append(newContent);
    newContent.append(newText);
    newText.append(newTitle);
    newText.append(newGoal);

    document.querySelector('.addClip').style.display = "none";
    document.querySelector('body').style.backgroundColor = "white";
})

// Create New Clip