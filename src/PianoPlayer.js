import * as Tone from 'tone'

const { Midi } = require('@tonejs/midi');


function MidiNote(durationTicks, midiValue, name, velocity, ticks, duration) {
    this.durationTicks = durationTicks;
    this.midiValue = midiValue;
    this.velocity = velocity;
    this.ticks = ticks;
    this.name = name;
    this.duration = duration;
}
export function PianoPlayer() {

    const trackGrid = [];
    let cursor = 0;
    let isPlaying = false;
    const whiteWidthPercent = 0.025;
    const blackWidthPercent = 0.01125;
    const beatLengthPercent = 0.4;
    const speedY = 3;
    let posY = 0;
    var stopId;

    // let noteLayer = []

    this.initializeSampler = () => {

        console.log("Initialize Sampler");
        let s = new Tone.Sampler({
            urls: {
                "C2": "C2.mp3",
                "D#2": "Ds2.mp3",
                "F#2": "Fs2.mp3",
                "A2": "A2.mp3",
                "C3": "C3.mp3",
                "D#3": "Ds3.mp3",
                "F#3": "Fs3.mp3",
                "A3": "A3.mp3",
                "C4": "C4.mp3",
                "D#4": "Ds4.mp3",
                "F#4": "Fs4.mp3",
                "A4": "A4.mp3",
                "C5": "C5.mp3",
                "D#5": "Ds5.mp3",
                "F#5": "Fs5.mp3",
                "A5": "A5.mp3",
                "C6": "C6.mp3",
                "D#6": "Ds6.mp3",
                "F#6": "Fs6.mp3",
                "A6": "A6.mp3"
            },
            release: 1,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).toDestination();
        this.sampler = s;
    }

    this.initializeTracks = (midi) => {
        console.log("Intialie Track");
        const fetchMidi = async () => {
            try {
                // let midi = await Midi.fromUrl("https://akashagrahari.github.io/public/Imagine.mid");
                let availableTracks = {}
                midi.tracks.forEach(function callback(value, index) {
                    availableTracks[index + 1] = value;
                })
                this.tracks = availableTracks;
                this.tempo = midi.header.tempos[0].bpm;
                this.timeSignature = midi.header.timeSignatures[0].timeSignature[0];
                this.ppq = midi.header.ppq;
                Tone.Transport.bpm.value = this.tempo;
                console.log(availableTracks);
            } catch (error) {
                console.log(error);
            }
        }
        fetchMidi();
    }

    this.selectTrack = (trackId) => {
        this.selectedTrack = this.tracks[trackId];
        this.currentBeat = 0;
        this.currentNotePos = 0;

    }

    this.drawGridLines = () => {
        let canvas = document.getElementById('piano-roll-canvas');
        let ctx = canvas.getContext('2d');
        let canvasHeight = canvas.height;
        let canvasWidth = canvas.width;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.setLineDash([10, 8]);/*dashes are 5px and spaces are 3px*/
        for (let i = 0; i < trackGrid.length; i++) {
            ctx.beginPath();
            ctx.moveTo(0, posY - (i * (beatLengthPercent * canvasHeight)));
            ctx.lineTo(canvasWidth, posY - (i * (beatLengthPercent * canvasHeight)));
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
        posY = posY + speedY;
        // console.log(posY);
        if (isPlaying) {
            stopId = requestAnimationFrame(this.drawGridLines);
        }
    }

    function getPosXNote(midiValue, whiteWidth, blackWidth) {
        // console.log(midiValue, whiteWidth, blackWidth);
        let zeroPointMidiValue = 24;
        let modulus = midiValue % 12;
        let type = 'white';
        if ([1, 3, 6, 8, 10].includes(modulus)) {
            type = 'black';
        }
        let octavePosX = (Math.floor(midiValue / zeroPointMidiValue)) * (7 * whiteWidth);
        let notePosX = octavePosX;
        if (type == 'white') {
            let posOnKeyBoard = Math.ceil(modulus / 2);
            notePosX = notePosX + (posOnKeyBoard * whiteWidth);
        } else {
            let posOnKeyBoard = Math.floor(modulus / 2);
            notePosX = notePosX + (posOnKeyBoard * whiteWidth) + (whiteWidth * 0.85);
        }
        // console.log(notePosX);
        return notePosX;
    }

    function getPosYNote(cursor, ticks, ppq, canvasHeight) {
        // console.log(posY, cursor, beatLengthPercent, canvasHeight, ticks, ppq);
        let notePosY = posY - (cursor * (beatLengthPercent * canvasHeight)) - (((ticks / (4 * ppq)) - 2) * beatLengthPercent * canvasHeight);
        return notePosY;
    }

    function getWidthNote(noteName, whiteWidth, blackWidth) {
        if (noteName.length == 3) {
            return blackWidth;
        } else {
            return whiteWidth;
        }
    }

    function getLengthNote(durationTicks, ppq, canvasHeight) {
        return ((durationTicks * beatLengthPercent * canvasHeight) / (ppq));
    }


    this.drawNoteLines = () => {
        let canvas = document.getElementById('piano-roll-canvas');
        let ctx = canvas.getContext('2d');
        let canvasHeight = canvas.height;
        let canvasWidth = canvas.width;
        let whiteWidth = whiteWidthPercent * canvas.width;
        let blackWidth = blackWidthPercent * canvas.width;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.setLineDash([])
        for (let i = 8; i < trackGrid.length; i++) {
            let noteList = trackGrid[i];
            noteList.forEach((note) => {
                let posX = getPosXNote(note.midiValue, whiteWidth, blackWidth);
                let posY = getPosYNote(i, note.ticks, this.ppq, canvasHeight);
                let width = getWidthNote(note.name, whiteWidth, blackWidth);
                let height = getLengthNote(note.durationTicks, this.ppq, canvasHeight);
                // console.log(posX, posY, width, height);
                ctx.beginPath();
                ctx.fillStyle = 'yellow';
                ctx.fillRect(posX, posY, width, -height);
                ctx.stroke();
            });
            // break;
        }
        posY = posY + speedY;
        if (isPlaying) {
            stopId = requestAnimationFrame(this.drawNoteLines);
        }
    }

    this.drawTrackGrid = () => {
        let canvas = document.getElementById('piano-roll-canvas');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;


        posY = canvas.height;
        // console.log(context);
        // drawGridLines(context, canvas.width, canvas.height);
        // stopId = requestAnimationFrame(this.drawGridLines);
        stopId = requestAnimationFrame(this.drawNoteLines);
    }

    this.initializeTrackGrid = () => {
        if (trackGrid.length == 0) {
            let allNotes = this.selectedTrack.notes;
            let endOfTrackTicks = this.selectedTrack.endOfTrackTicks;
            let noteIndex = 0;
            let currLayer = [];

            for (let currTick = 0; currTick <= endOfTrackTicks; currTick = currTick + this.ppq) {
                while (allNotes[noteIndex] && allNotes[noteIndex].ticks < (currTick + this.ppq)) {
                    let currNote = allNotes[noteIndex];
                    let midiNote = new MidiNote(currNote.durationTicks, currNote.midi, currNote.name, currNote.velocity, currNote.ticks, currNote.duration);
                    currLayer.push(midiNote);
                    noteIndex = noteIndex + 1;
                }
                trackGrid.push(currLayer);
                currLayer = [];
            }

        }
        this.drawTrackGrid();
        console.log(trackGrid);
    }

    this.playWholeSong = () => {
        console.log("Play");
        let time = Tone.now();
        Tone.loaded().then(() => {
            console.log(this.selectedTrack);
            this.selectedTrack.notes.forEach((note) => {
                this.sampler.triggerAttackRelease(
                    note.name,
                    note.duration,
                    note.time + time,
                    note.velocity
                );
            });
        });
    }

    function getKeyId(note) {

        function getNextChar(char) {
            if (char == "G") {
                return "A";
            } else {
                return String.fromCharCode(char.charCodeAt(0) + 1);
            }

        }

        if (note.length == 3) {
            if (note.includes("#")) {
                let octave = note.charAt(2);
                let oldNoteLetter = note.charAt(0);
                if (oldNoteLetter == "B") {
                    octave = getNextChar(octave);
                }
                let newNoteLetter = getNextChar(oldNoteLetter);
                return (newNoteLetter + "b" + octave);
            }
        }
        return note;
    }

    this.playBeat = (sampler, time, ppq) => {
        let notes = trackGrid[cursor];
        if (cursor >= trackGrid.length) {
            this.stop();
            return;
        }
        notes.forEach((note) => {
            let relativeTime = new Tone.Time((note.ticks % ppq) + "i");
            Tone.Draw.schedule(function () {
                // let pianoRoll = document.getElementsByClassName('piano-roll')[0];

                setTimeout(() => {
                    let pianoKey = document.getElementById(getKeyId(note.name));
                    pianoKey.classList.add("active");
                    // console.log("active");
                    setTimeout(() => {
                        let pianoKey = document.getElementById(getKeyId(note.name));
                        pianoKey.classList.remove("active");
                        // console.log("inactive");
                    }, note.duration * 1000);
                }, relativeTime * 1000);

                // console.log("Key: ", pianoKey);
                // pianoKey
            }, time)
            sampler.triggerAttackRelease(note.name, note.duration, time + relativeTime.toSeconds(), note.velocity)

        });
        ++cursor;
    }

    this.updateProgressBar = (cursor, trackDuration) => {
        let progressBar = document.getElementById('progress-bar');
        let percentage = cursor * 100 / trackDuration;
        progressBar.style.width = parseFloat(percentage).toFixed(2) + "%";
    }

    this.play = () => {
        console.log("Play");
        let trackDuration = trackGrid.length;
        if (!isPlaying) {
            Tone.loaded().then(() => {
                Tone.Transport.scheduleRepeat(time => {
                    this.playBeat(this.sampler, time, this.ppq);
                    this.updateProgressBar(cursor, trackDuration);
                }, (this.ppq + "i"));
                Tone.Transport.start();
                isPlaying = true;
                this.drawNoteLines();
            });
        } else {
            Tone.Transport.start();
        }
    }

    this.pause = () => {
        console.log("Pause");
        Tone.Transport.pause();

    }

    this.stop = () => {
        console.log("Stop");
        Tone.Transport.stop();
        cursor = 0;
        this.updateProgressBar(0, trackGrid.length);
        cancelAnimationFrame(stopId);
    }

    this.playNote = (key) => {
        let note = key.target.id;
        if (!isPlaying) {
            Tone.loaded().then(() => {
                this.sampler.triggerAttackRelease([note], 1);
            })
        }

    }
}