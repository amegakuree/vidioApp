import React, {
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react';
//this is videoPlayer
export const VideoPlayer = ({ user }) => {
    const ref = useRef();

    useEffect(() => {
        user.videoTrack.play(ref.current);
    }, []);

    return (
        <div className='bg-slate-200 p-2 rounded-sm'>

            <div
                ref={ref}
                style={{ width: '200px', height: '200px' }}
            ></div>
            <div className='mt-2 pl-6 bg-slate-200 px-2 py-1 rounded-sm text-black '>
                UserId: {user.uid}
            </div>
        </div>
    );
};
