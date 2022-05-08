import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Form,
    Button,
    Container,
    ProgressBar,
    Modal,
    ListGroup,
    ListGroupItem,
    InputGroup,
    FormControl,
} from 'react-bootstrap'
import Sketch from "react-p5";
import * as Tone from 'tone'
import { PianoPlayer } from './PianoPlayer';
import * as AWS from 'aws-sdk';
import { ConfigurationOptions } from 'aws-sdk';
import { API, graphqlOperation } from "aws-amplify";
import { createTrack } from './graphql/mutations';
import { useNavigate } from 'react-router-dom';

// AWS.config.update({ region: 'us-east-1' });
const docClient = new AWS.DynamoDB.DocumentClient();


const { Midi } = require('@tonejs/midi');


function MainApp(props) {
    const [player, setPlayer] = useState();
    const [intro, setIntro] = useState();
    const [showTracks, setShowTracks] = useState();
    const [tracks, setTracks] = useState();
    const [isTrackSelected, setIsTrackSelected] = useState();
    const navigate = useNavigate();
    // const [songs, setSongs] = useState();

    useEffect(() => {
        if (!player) {
            let pianoPlayer = new PianoPlayer();
            pianoPlayer.initializeSampler();
            setPlayer(pianoPlayer);
        }

        if (showTracks && !tracks) {
            console.log("Tracks: ", player.tracks);
            setTracks(player.tracks);
        }

        if (isTrackSelected) {
            player.initializeTrackGrid();
        }
    });

    // async function fetchTracks() {
    //     try {
    //         const tracksData = await API.graphql(graphqlOperation(listTracks))
    //         const trackList = tracksData.data.listTracks.items;
    //         console.log("songList: ", trackList);
    //         setSongs(trackList);
    //     } catch (error) {
    //         console.log("error: ", error);
    //     }
    // }

    function handleStop(e) {
        player.stop();
    }

    function handlePlay(e) {
        player.play();
    }

    function handlePause(e) {
        player.pause();
    }

    // function handleShowTracks() {
    //     setShowTracks(true);
    // }

    function handleCloseTracks() {
        setShowTracks(false);
    }

    function handleCloseMode() {
        setIntro(true);
    }

    function handleShowMode() {
        setIntro(false);
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

    function devToolTip(track) {
        alert("Feature in development. Sorry for inconvenience");
        // $('[data-toggle="tooltip"]').tooltip();
    }

    function parseFile(file) {
        let midi;
        let midiString;
        const reader = new FileReader();
        reader.onload = function (e) {
            midi = new Midi(e.target.result);
            // document.querySelector(
            //     "#ResultsText"
            // ).value = JSON.stringify(midi, undefined, 2);
            midiString = JSON.stringify(midi);
            // document
            // .querySelector("tone-play-toggle")
            // .removeAttribute("disabled");
            // currentMidi = midi;
            // console.log("midi: ", midi);
            player.initializeTracks(midi);
            setIntro(true);
            setShowTracks(true);
        };
        reader.readAsArrayBuffer(file);

        const uploadFile = async () => {
            try {
                const song = {
                    artist: "placeholder_artist",
                    midi: midiString,
                    title: file.name.split('.')[0],
                    type: "placeholder_type",
                    id: "123",
                }
                const response = await API.graphql(graphqlOperation(createTrack, { input: song }));
                // const response = await API.graphql(graphqlOperation(createTrack, { input: song }))
                console.log("response: ", response);
            } catch (error) {
                console.log("error: ", error);
            }
        }

        uploadFile();

    }

    function uploadFile(event) {
        console.log(event.target.files);
        parseFile(event.target.files[0]);

    }

    function browseFile() {
        let inputFile = document.getElementById('browse-midi').click();
    }

    function showDirectory() {
        navigate('/directory');
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
                                    <div className="col-sm-6">
                                        <p className='track-text'>{tracks[key].instrument.name}</p>
                                    </div>
                                    <div className='col-sm-6'>
                                        <Button variant="outline-dark header-button player-button" onClick={devToolTip} data-toggle="preview-tooltip" data-placement="top" title="Feature in development" id={key}  >Preview </Button>
                                        <Button variant="outline-dark header-button player-button" onClick={selectTrack} id={key}  >Select</Button>
                                    </div>
                                </div>
                            </ListGroupItem>
                        )}
                    </ListGroup>
                </Modal.Body>
            </Modal>
            <Modal show={!intro} onHide={handleCloseMode}>
                <Modal.Header closeButton>
                    <Modal.Title>Select Mode</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-sm-6 button-wrapper' >
                            <input type="file" onChange={uploadFile} className="file-upload" id='browse-midi' />
                            <Button variant="outline-dark header-button" onClick={browseFile}>Upload MIDI  <i className="bi bi-upload "></i></Button>
                        </div>
                        <div className='col-sm-6 button-wrapper' >
                            <Button variant="outline-dark header-button" onClick={showDirectory}>Browse Library  <i className="bi bi-search "></i></Button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-6 button-wrapper' >
                            <p className='help-text'>Upload a MIDI file from sources like <a href='https://freemidi.org/' target='_blank'>FreeMidi</a></p>
                        </div>
                        <div className='col-sm-6 button-wrapper' >
                            <p className='help-text'>Browse MIDI files from the community library</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 button-wrapper' >
                            <Button variant="outline-dark header-button" onClick={handleCloseMode}>Play Piano  <i className="bi bi-music-note"></i></Button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 button-wrapper' >
                            <p className='help-text'>Play around with the virtual piano</p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <div className='piano-roll' id='piano-roll'>
                <canvas id='piano-roll-canvas'></canvas>
            </div>
            <div className='piano-wrapper' >
                <ul id="piano">
                    <li><div className="white" id='C1' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='D1' onMouseDown={playNote}></div><div className="black" id='Db1' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='E1' onMouseDown={playNote}></div><div className="black" id='Eb1' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='F1' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='G1' onMouseDown={playNote}></div><div className="black" id='Gb1' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='A1' onMouseDown={playNote}></div><div className="black" id='Ab1' onMouseDown={playNote}></div></li>
                    <li><div className="white" id='B1' onMouseDown={playNote}></div><div className="black" id='Bb1' onMouseDown={playNote}></div></li>

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
                        <Button variant="outline-light header-button player-button" onClick={handlePause} ><i className="bi bi-pause-fill player-icon"></i></Button>
                        <Button variant="outline-light header-button player-button" onClick={handleStop}><i className="bi bi-stop-fill player-icon"></i></Button>
                    </div>
                    <div className="progress col-sm-7">
                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" id="progress-bar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="col-sm-2 upload">
                        <Button variant="outline-light header-button" onClick={handleShowMode}>Learn a song!</Button>
                    </div>
                </div>

            </div>
        </div >
    )
};


export default MainApp;