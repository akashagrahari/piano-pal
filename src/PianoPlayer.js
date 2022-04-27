import * as Tone from 'tone'

const { Midi } = require('@tonejs/midi');

export function PianoPlayer() {

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

    this.initializeTracks = () => {
        console.log("Intialie Track");
        const fetchMidi = async () => {
            try {
                let midi = await Midi.fromUrl("https://akashagrahari.github.io/public/Imagine.mid");
                // console.log("duration: ", midi.duration);
                console.log("midi: ", midi);
                let availableTracks = {}
                midi.tracks.forEach(function callback(value, index) {
                    availableTracks[index + 1] = value;
                })
                console.log("available tracks in piano player: ", availableTracks);
                this.tracks = availableTracks;
            } catch (error) {
                console.log(error);
            }
        }
        fetchMidi();
    }

    this.selectTrack = (trackId) => {
        this.selectedTrack = this.tracks[trackId];
    }

    this.initializeTrackGrid = () => {
        console.log("Initialize Track Grid");

    }

    this.play = () => {
        console.log("Play");
    }

    this.pause = () => {
        console.log("Pause");

    }

    this.stop = () => {
        console.log("Stop");
    }

    this.playNote = (key) => {
        let note = key.target.id;
        Tone.loaded().then(() => {
            this.sampler.triggerAttackRelease([note], 1);
        })
    }
}