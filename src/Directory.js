
import { useEffect, useState } from 'react';
import {
    Container,
    Table,
    Button
} from 'react-bootstrap'
import { API, graphqlOperation } from "aws-amplify";
import { listTracks } from './graphql/queries';
import { useNavigate } from 'react-router-dom';


function Directory(props) {

    const [songs, setSongs] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!songs) {
            fetchSongs();
        }
    })

    async function fetchSongs() {
        try {
            const songsData = await API.graphql(graphqlOperation(listTracks))
            const songList = songsData.data.listTracks.items;
            console.log("song: ", songList[0]);
            setSongs(songList);
        } catch (error) {
            console.log("error: ", error);
        }
    }

    function toMainApp() {
        navigate('/main');
    }
    return (
        <div>

            <Container fluid className='jumbotron heading'>
                <Button variant="outline-light header-button" className='back-button' onClick={toMainApp}>Back to Piano Player </Button>
                <Table variant="dark" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Type</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs && songs.map((song) =>
                            <tr>
                                <td>{song.title}</td>
                                <td>{song.artist}</td>
                                <td>{song.type}</td>
                                <td></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
};

export default Directory;