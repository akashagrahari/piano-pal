
import { isFirefox } from 'react-device-detect';

// let whiteWidthPercent = 0.0255;
let whiteWidth;
let blackWidth;
// let blackWidthPercent = 0.01125;
const beatLengthPercent = 0.4;
const zeroPointMidiValue = 24;
let denominator = 100;
if (isFirefox) {
    denominator = 101;
}
let canvas;
let ctx;
let canvasHeight;
let canvasWidth;
let posY;
let beatLength;


function drawGridLines(cursor, trackGrid) {
    ctx.setLineDash([10, 8]);
    for (let i = 0; i < trackGrid.length; i++) {
        ctx.beginPath();
        ctx.moveTo(0, posY - (i * (beatLengthPercent * canvasHeight)));
        ctx.lineTo(canvasWidth, posY - (i * (beatLengthPercent * canvasHeight)));
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ced4da';
        ctx.stroke();
    }
}

function getPosXNote(midiValue, whiteWidth, blackWidth) {

    let modulus = midiValue % 12;
    let type = 'white';
    if ([1, 3, 6, 8, 10].includes(modulus)) {
        type = 'black';
    }
    let octavePosX = (Math.floor((midiValue / 12)) - 2) * (7 * whiteWidth);
    let notePosX = octavePosX;
    if (type == 'white') {
        let posOnKeyBoard = Math.ceil(modulus / 2);
        notePosX = notePosX + (posOnKeyBoard * whiteWidth);
    } else {
        let posOnKeyBoard = Math.floor(modulus / 2);
        notePosX = notePosX + (posOnKeyBoard * whiteWidth) + (whiteWidth * 0.8);
    }
    return notePosX;
}

function getPosYNote(bar, ticks, ppq, beatLength) {
    let notePosY = posY - (bar * beatLength) - (((ticks % ppq) / ppq) * (beatLength));
    return notePosY;
}

function getWidthNote(noteName, whiteWidth, blackWidth) {
    if (noteName.length == 3) {
        return blackWidth;
    } else {
        return whiteWidth;
    }
}

function getLengthNote(durationTicks, ppq, beatLength) {
    return ((durationTicks / ppq) * beatLength);
}

function drawSingleNote(ctx, notePosX, notePosY, width, height) {
    ctx.beginPath();
    ctx.fillStyle = '#ffc107';
    // ctx.fillRect(whiteWidth * 0.8, posY - (i * beatLengthPercent * canvasHeight), blackWidth, -(beatLengthPercent * canvasHeight * 0.5));
    ctx.fillRect(notePosX, notePosY, width, -height);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    // ctx.rect(whiteWidth * 0.8, posY - (i * beatLengthPercent * canvasHeight), blackWidth, -(beatLengthPercent * canvasHeight * 0.5));
    ctx.rect(notePosX, notePosY, width, -height);
    // ctx.shadowColor = 'black';
    // ctx.shadowBlur = 50;
    // ctx.shadowOffsetX = 5;
    // ctx.shadowOffsetY = 2;
    ctx.stroke();
}

function drawNotes(cursor, trackGrid, ppq, beatLength) {
    // let whiteWidth = whiteWidthPercent * canvas.width;
    // let blackWidth = blackWidthPercent * canvas.width;
    ctx.setLineDash([]);
    for (let i = 0; i < trackGrid.length; i++) {
        let noteList = trackGrid[i];
        noteList.forEach((note) => {
            let notePosX = getPosXNote(note.midiValue, whiteWidth, blackWidth);
            let notePosY = getPosYNote(i, note.ticks, ppq, beatLength);
            let width = getWidthNote(note.name, whiteWidth, blackWidth);
            let height = getLengthNote(note.durationTicks, ppq, beatLength);
            drawSingleNote(ctx, notePosX, notePosY, width, height)
            // ctx.beginPath();
            // ctx.fillStyle = 'yellow';
            // ctx.fillRect(posX, posY, width, -height);
            // ctx.stroke();
        });
        // break;
    }
}

export function drawInitialPianoRoll(cursor, trackGrid, ppq) {
    console.log('draw current piano roll');
    canvas = document.getElementById('piano-roll-canvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx = canvas.getContext('2d');
    canvasHeight = canvas.height;
    canvasWidth = canvas.width;
    posY = canvasHeight;
    let whiteKey = document.getElementById('B1');
    whiteWidth = whiteKey.getBoundingClientRect().width;
    let blackKey = document.getElementById('Bb1');
    blackWidth = blackKey.getBoundingClientRect().width;

    beatLength = beatLengthPercent * canvasHeight;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGridLines(cursor, trackGrid);
    drawNotes(cursor, trackGrid, ppq, beatLength);
    // posY = posY - beatLength;
    // ctx.setLineDash([10, 8]);

    // posY = posY + speedY;
    // console.log(posY);
    // if (isPlaying) {
    // stopId = requestAnimationFrame(this.drawPianoRoll);
    // }
}

export function animatePianoRoll(cursor, trackGrid, ppq, tempo) {
    let timeOneBeat = (60 * 1000) / tempo;
    let counter = 1;
    posY = posY + (beatLength / 100);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawGridLines(cursor, trackGrid);
    drawNotes(cursor, trackGrid, ppq, beatLength);
    let interval = setInterval(() => {
        counter += 1;
        if (counter == 100) {
            clearInterval(interval);
        }
        posY = posY + (beatLength / 100);
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawGridLines(cursor, trackGrid);
        drawNotes(cursor, trackGrid, ppq, beatLength);

    }, timeOneBeat / denominator);
}