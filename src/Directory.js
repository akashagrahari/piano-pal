
import { useEffect, useState } from 'react';
import {
    Container,
    Table,
    Button,
    Modal,
    Form,
    Spinner,
} from 'react-bootstrap'
import { API, graphqlOperation, Storage } from "aws-amplify";
import { listTracks } from './graphql/queries';
import { useNavigate } from 'react-router-dom';
import { createTrack } from './graphql/mutations';

function Directory(props) {

    const [songs, setSongs] = useState();
    const [uploadWizard, setUploadWizard] = useState();
    const [songListChange, setSongListChange] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSongs();
    }, [songListChange])

    async function fetchSongs() {
        try {
            const songsData = await API.graphql(graphqlOperation(listTracks))
            const songList = songsData.data.listTracks.items;
            // console.log("song: ", songList[0]);
            setSongs(songList);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    const createDbRecord = async (title, artist, type, owner) => {
        try {
            const song = {
                title: title,
                artist: artist,
                type: type,
                owner: owner,
            }
            const response = await API.graphql(graphqlOperation(createTrack, { input: song }));
            console.log("create db record response: ", response);
            return response.data.createTrack.id;
        } catch (error) {
            console.log("error in db operation: ", error);
            alert('Something went wrong. Cannot upload the file.');
            return;
        }
    }

    const uploadFile = async (filename, file) => {
        try {
            const storageResult = await Storage.put(filename, file, {
                level: 'public',
                type: 'audio/midi'
            });
            console.log("storage result: ", storageResult);
            return storageResult;
        } catch (error) {
            console.log("error in midi file upload: ", error);
            alert('Something went wrong. Cannot upload the file.');
            return;
        }
    }

    function selectSong(event) {
        console.log(event.target.id);
        navigate('/main', { state: event.target.id });
    }

    function toMainApp() {
        navigate('/main');
    }

    function openSubmitFileWizard() {
        setUploadWizard(true);
    }

    function submitFile(event) {
        event.preventDefault();
        let submitText = document.getElementById('submit-text');
        let spinner = document.getElementById('upload-spin');
        submitText.classList.add('loader');
        spinner.classList.remove('loader');

        let title = event.target.elements.title.value;
        let artist = event.target.elements.artist.value;
        let type = event.target.elements.type.value;
        let owner = event.target.elements.owner.value;
        let file = event.target.elements.file.files[0];
        setTimeout(() => {
            let id = createDbRecord(title, artist, type, owner);
            id.then((filename) => {
                let storageResponse = uploadFile(filename + ".midi", file);
                storageResponse.then((response) => {
                    setSongListChange(songListChange + 1);
                    alert("File successfully uploaded");
                    handleCloseUploadWizard();
                    submitText.classList.remove('loader');
                    spinner.classList.add('loader');
                })
            })
            if (submitText.classList.contains('loader')) {
                submitText.classList.remove('loader');
                spinner.classList.add('loader');
            }
        }, 1000);
    }

    function handleCloseUploadWizard() {
        setUploadWizard(false);
    }

    return (
        <div>
            <Modal show={uploadWizard} onHide={handleCloseUploadWizard}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Track Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitFile}>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name='title' placeholder="Song title" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Control type="text" name='artist' placeholder="Artist" required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Select track type</Form.Label>
                            <Form.Select name='type'>
                                <option value='Chords'>Chords</option>
                                <option value='Lead'>Lead</option>
                                <option value='Chords + Lead'>Chords + Lead</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control type="text" name='owner' placeholder="Owner" disabled value={props.getToken()} />
                        </Form.Group>
                        <input type="file" id='browse-midi' accept='audio/midi' name='file' required />
                        <br></br>
                        <br></br>
                        <Button variant="outline-dark header-button" className='submit' type="submit">
                            <span id='submit-text'>Submit</span><Spinner className='submit loader' animation="grow" id='upload-spin' />
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Container fluid className='jumbotron directory'>
                <Button variant="outline-light header-button" className='back-button' onClick={toMainApp}>Back to Piano Player </Button>
                <Button variant="outline-light header-button" className='back-button' onClick={openSubmitFileWizard}>Submit a MIDI file </Button>
                <Table variant="dark" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Type</th>
                            <th>Rating</th>
                            <th>Owner</th>
                            <th>Date Submitted</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs && songs.map((song) =>
                            <tr>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.type}</td>
                                <td>{song.rating}</td>
                                <td>{song.owner}</td>
                                <td>{song.createdAt.split('T')[0]}</td>
                                <td><Button variant="outline-light" onClick={selectSong} id={song.id}  ><i className="bi bi-play" id={song.id}></i></Button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
};

export default Directory;