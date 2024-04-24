import React, { useEffect, useState } from 'react';
import AgoraRTC, { createClient } from 'agora-rtc-sdk-ng';
import { VideoPlayer } from './VideoPlayer';

const APP_ID = 'a75cfe4277c74f63b49487953011693b';
const TOKEN =
    "007eJxTYNC6VleX6rhgve+8J3vOdnu0MEw18vmQ2K1+xnhG5Zl4m20KDInmpslpqSZG5ubJ5iZpZsZJJpYmFuaWpsYGhoZmlsZJE7+rpzUEMjJcvnCBmZEBAkF8TgbnxJyczLz00GIGBgAQqiH3";
const CHANNEL = 'CallingUs';

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
