import React, { useEffect, useState } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';

//put app_id and token from agora
const APP_ID = '832907e7998c49b0a141ee75201e2eac';
const TOKEN ="007eJxTYHjlNPn/zQNqCyrTb6u7OcZukwsrNuTVnHTV92xSSeSHpB8KDBbGRpYG5qnmlpYWySaWSQaJhiaGqanmpkYGhqlGqYnJ6mc00xoCGRlWKq9mYIRCEJ+bwb2otCCgKD8rNbmEgQEAKK4hqA==";
const CHANNEL = 'GrupProject';

AgoraRTC.setLogLevel(4);

let agoraCommandQueue = Promise.resolve();

const createAgoraClient = ({
    onVideoTrack,
    onUserDisconnected,
}) => {
    const client = createClient({
        mode: 'rtc',
        codec: 'vp8',
    });

    let tracks;

    const waitForConnectionState = (connectionState) => {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (client.connectionState === connectionState) {
                    clearInterval(interval);
                    resolve();
                }
            }, 200);
        });
    };

    const connect = async () => {
        await waitForConnectionState('DISCONNECTED');

        const uid = await client.join(
            APP_ID,
            CHANNEL,
            TOKEN,
            null
        );

        client.on('user-published', (user, mediaType) => {
            client.subscribe(user, mediaType).then(() => {
                if (mediaType === 'video') {
                    onVideoTrack(user);
                }
            });
        });

        client.on('user-left', (user) => {
            onUserDisconnected(user);
        });

        tracks =
            await AgoraRTC.createMicrophoneAndCameraTracks();

        await client.publish(tracks);

        return {
            tracks,
            uid,
        };
    };

    const disconnect = async () => {
        await waitForConnectionState('CONNECTED');
        client.removeAllListeners();
        for (let track of tracks) {
            track.stop();
            track.close();
        }
        await client.unpublish(tracks);
        await client.leave();
    };

    return {
        disconnect,
        connect,
    };
};

export const VideoRoom = () => {
    const [users, setUsers] = useState([]);
    const [uid, setuid] = useState(null);

    useEffect(() => {
        const onVideoTrack = (user) => {
            setUsers((previousUsers) => [...previousUsers, user]);
        };

        const onUserDisconnected = (user) => {
            setUsers((previousUsers) =>
                previousUsers.filter((u) => u.uid !== user.uid)
            );
        };

        const { connect, disconnect } = createAgoraClient({
            onVideoTrack,
            onUserDisconnected,
        });


        const setup = async () => {
            const { tracks, uid } = await connect();
            setuid(uid);
            setUsers((previousUsers) => [
                ...previousUsers,
                {
                    uid,
                    audioTrack: tracks[0],
                    videoTrack: tracks[1],
                },
            ]);
        };

        const cleanup = async () => {
            await disconnect();
            setuid(null);
            setUsers([]);
        };
        agoraCommandQueue = agoraCommandQueue.then(setup);
        return () => {
            agoraCommandQueue = agoraCommandQueue.then(cleanup);
        };
    }, []);



    return (
        <>
            <div >
                <p className='ml-8  mt-10 mb-5 bg-cyan-400 px-2 py-1 rounded-sm inline-block'> UserId : {uid} </p>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <div className='ml-96 bg-cyan-400 grid grid-cols-4 gap-10  px-10 py-10  '
                    >
                        {users.map((user) => (
                            <VideoPlayer key={user.uid} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
