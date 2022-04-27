import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Form,
    Button,
    Container,
    ProgressBar,
    Modal,
    ListGroup,
    ListGroupItem
} from 'react-bootstrap'
import Sketch from "react-p5";
import * as Tone from 'tone'
import { PianoPlayer } from './PianoPlayer';

const { Midi } = require('@tonejs/midi');


function MainApp(props) {
    // const [uploadFile, setUploadFile] = useState();
    const [player, setPlayer] = useState();
    // const [playing, setPlaying] = useState();
    const [showTracks, setShowTracks] = useState();
    const [tracks, setTracks] = useState();
    const [isTrackSelected, setIsTrackSelected] = useState();
    // const [currentMidi, setCurrentMidi] = useState();
    // const [tracks, setTracks] = useState();
    // const [selectedTrack, setSelectedTrack] = useState();
    // const [sampler, setSampler] = useState();

    // function initializeSampler() {
    //     let s = new Tone.Sampler({
    //         urls: {
    //             "C2": "C2.mp3",
    //             "D#2": "Ds2.mp3",
    //             "F#2": "Fs2.mp3",
    //             "A2": "A2.mp3",
    //             "C3": "C3.mp3",
    //             "D#3": "Ds3.mp3",
    //             "F#3": "Fs3.mp3",
    //             "A3": "A3.mp3",
    //             "C4": "C4.mp3",
    //             "D#4": "Ds4.mp3",
    //             "F#4": "Fs4.mp3",
    //             "A4": "A4.mp3",
    //             "C5": "C5.mp3",
    //             "D#5": "Ds5.mp3",
    //             "F#5": "Fs5.mp3",
    //             "A5": "A5.mp3",
    //             "C6": "C6.mp3",
    //             "D#6": "Ds6.mp3",
    //             "F#6": "Fs6.mp3",
    //             "A6": "A6.mp3"
    //         },
    //         release: 1,
    //         baseUrl: "https://tonejs.github.io/audio/salamander/",
    //     }).toDestination();
    //     setSampler(s);
    // }

    useEffect(() => {
        if (!player) {
            let pianoPlayer = new PianoPlayer();
            pianoPlayer.initializeSampler();
            pianoPlayer.initializeTracks();
            // pianoPlayer.initializeTrackGrid();
            setPlayer(pianoPlayer);
            // console.log("piano player: ", pianoPlayer);
            // setTracks(pianoPlayer.getTracks());
        }

        if (showTracks && !tracks) {
            console.log("Tracks: ", player.tracks);
            // let availableTracks = player.tracks;
            // console.log("Available Tracks: ", availableTracks);
            setTracks(player.tracks);
        }

        if (isTrackSelected) {
            player.initializeTrackGrid();
        }
        // if (!sampler) {
        //     initializeSampler();
        // }
        // const fetchMidi = async () => {
        //     try {
        //         let midi = await Midi.fromUrl("https://akashagrahari.github.io/public/Imagine.mid");
        //         console.log("duration: " + midi.duration);
        //         setCurrentMidi(midi);
        //         let availableTracks = [];
        //         midi.tracks.forEach((track) => {
        //             availableTracks.push(track.name);
        //         });
        //         setTracks(availableTracks);
        //         setSelectedTrack(midi.tracks[0]);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // if (!currentMidi) {
        //     fetchMidi();
        // }

        // console.log("Playing: ", playing);
        // console.log("CurrentMidi: ", currentMidi);
        // if (playing && currentMidi && sampler) {
        //     playTrack();
        // }
    });

    // function stopTrack() {
    //     Tone.loaded().then(() => {
    //         // sampler.dispose();
    //         console.log("pls stop");
    //         Tone.Transport.stop();
    //     });
    // }

    // function findMinDiff(arr, n) {
    //     // Initialize difference as infinite
    //     let diff = Number.MAX_VALUE;

    //     // Find the min diff by comparing difference
    //     // of all possible pairs in given array
    //     for (let i = 0; i < n - 1; i++)
    //         for (let j = i + 1; j < n; j++)
    //             if (Math.abs((arr[i] - arr[j])) < diff)
    //                 diff = Math.abs((arr[i] - arr[j]));

    //     // Return min diff   
    //     return diff;
    // }

    // function playTrack() {
    //     console.log("pls play");
    //     // const now = Tone.now();
    //     // let track = currentMidi.tracks[0];
    //     let minTick = Number.MAX_VALUE;
    //     let ticksSet = new Set();
    //     selectedTrack.notes.forEach((note) => {
    //         ticksSet.add(note.ticks);
    //         if (note.ticks < minTick) {
    //             minTick = note.ticks;

    //         }
    //     });
    //     console.log("Minimum Ticks: ", minTick);
    //     console.log("Ticks Set: ", ticksSet);
    //     console.log("Ticks Set min diff: ", findMinDiff(ticksSet, ticksSet.size).toFixed(2));
    //     Tone.Transport.scheduleRepeat(time => {
    //         Tone.loaded().then(() => {
    //             // sampler.triggerAttackRelease(["C2"], 0.1);
    //             // track.notes.forEach((note) => {
    //             //     sampler.triggerAttackRelease(
    //             //         note.name,
    //             //         note.duration,
    //             //         note.time + time,
    //             //         note.velocity
    //             //     );
    //             // });
    //         });
    //     }, '192i');
    //     Tone.Transport.start();

    // }

    function handleStop(e) {
        // setPlaying(false);
        // stopTrack();
        // initializeSampler();
    }

    function handlePlay(e) {
        // setPlaying(true);
    }

    function setTrackList() {
        // var tracksModal = document.getElementById('tracks-modal');
        // tracksModal.innerHTML = 'Blah';
        // console.log("Tracks modal:", tracksModal);
    }

    function handleShowTracks() {
        setShowTracks(true);
    }

    function handleCloseTracks() {
        setShowTracks(false);
    }

    function handleFileUpload(e) {
        e.preventDefault()
        // const url = 'http://localhost:3000/uploadFile';
        // const formData = new FormData();
        // formData.append('file', file);
        // formData.append('fileName', file.name);
        // const config = {
        // headers: {
        // 'content-type': 'multipart/form-data',
        // },
        // };
        // axios.post(url, formData, config).then((response) => {
        // console.log(response.data);
        // });
    }


    function demoTrack() {

    }

    function selectTrack(track) {
        player.selectTrack(track.target.id);
        setIsTrackSelected(true);
        handleCloseTracks();
    }


    function playNote(key) {
        player.playNote(key);
        // console.log(key.target.id);
        // let note = key.target.id;
        // Tone.loaded().then(() => {
        //     sampler.triggerAttackRelease([note], 1);
        // })
    }

    return (
        <div>
            <Modal show={showTracks} onHide={handleCloseTracks}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Track</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>

                        {tracks && Object.keys(tracks).map(key =>
                            <ListGroupItem>
                                <div className="row track-list">
                                    <div className="col-sm-10">
                                        <h3>{tracks[key].name}</h3>
                                    </div>
                                    <div className='col-sm-2'>
                                        <Button variant="primary" onClick={selectTrack} id={key}  ><i className="bi bi-check2 player-icon" id={key}></i></Button>
                                    </div>
                                </div>
                            </ListGroupItem>
                        )}
                    </ListGroup>
                </Modal.Body>
            </Modal>

            <div className='piano-roll'>

                {/* <h1> Blah</h1>
                <h1> Blah</h1>
                <h1> Blah</h1>
                <i className="bi bi-activity"></i> */}
            </div>
            <div className='piano-wrapper' >
                <ul id="piano">
                    <li><div className="white" id='C2' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='D2' onMouseDown={playNote}></div><div className="black" id='Db2' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='E2' onMouseDown={playNote}></div><div className="black" id='Eb2' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='F2' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='G2' onMouseDown={playNote}></div><div className="black" id='Gb2' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='A2' onMouseDown={playNote}></div><div className="black" id='Ab2' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='B2' onMouseDown={playNote}></div><div className="black" id='Bb2' onMouseDown={playNote}></div></li>


                    <li><div className="white" id='C3' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='D3' onMouseDown={playNote}></div><div className="black" id='Db3' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='E3' onMouseDown={playNote}></div><div className="black" id='Eb3' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='F3' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='G3' onMouseDown={playNote}></div><div className="black" id='Gb3' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='A3' onMouseDown={playNote}></div><div className="black" id='Ab3' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='B3' onMouseDown={playNote}></div><div className="black" id='Bb3' onMouseDown={playNote}></div></li>

                    <li><div className="white" id='C4' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='D4' onMouseDown={playNote}></div><div className="black" id='Db4' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='E4' onMouseDown={playNote}></div><div className="black" id='Eb4' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='F4' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='G4' onMouseDown={playNote}></div><div className="black" id='Gb4' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='A4' onMouseDown={playNote}></div><div className="black" id='Ab4' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='B4' onMouseDown={playNote}></div><div className="black" id='Bb4' onMouseDown={playNote}></div></li>


                    <li><div className="white" id='C5' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='D5' onMouseDown={playNote}></div><div className="black" id='Db5' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='E5' onMouseDown={playNote}></div><div className="black" id='Eb5' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='F5' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='G5' onMouseDown={playNote}></div><div className="black" id='Gb5' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='A5' onMouseDown={playNote}></div><div className="black" id='Ab5' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='B5' onMouseDown={playNote}></div><div className="black" id='Bb5' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='C6' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='D6' onMouseDown={playNote}></div><div className="black" id='Db6' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='E6' onMouseDown={playNote}></div><div className="black" id='Eb6' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='F6' onMouseDown={playNote}></div></li>
                </ul>
            </div>
            <div className="player">

                <div className="row">
                    {/* <span class="col-sm-3">Some inline element</span> */}
                    <div className="col-sm-2">
                        <Button variant="outline-light header-button player-button" onClick={handlePlay}><i className="bi bi-play-fill player-icon"></i></Button>
                        <Button variant="outline-light header-button player-button" ><i className="bi bi-pause-fill player-icon"></i></Button>
                        <Button variant="outline-light header-button player-button" onClick={handleStop}><i className="bi bi-stop-fill player-icon"></i></Button>
                    </div>
                    <div className="progress col-sm-7">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="col-sm-2 upload">
                        <Button variant="outline-light header-button" onClick={handleShowTracks}>Upload MIDI  <i className="bi bi-upload player-icon"></i></Button>
                    </div>
                </div>

            </div>
        </div >
    )
};


export default MainApp;