// camera
"use client";
import { useEffect, useRef, useState } from 'react';
import { FaCamera } from "react-icons/fa";
import { LuCameraOff } from "react-icons/lu";

const Camera = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [hasAccess, setHasAccess] = useState<boolean>(true);
    const [isCameraOn, setIsCameraOn] = useState<boolean>(false); // State to toggle the camera

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            }
            setIsCameraOn(true);
        } catch (error) {
            console.error("Error accessing the camera: ", error);
            setHasAccess(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            const tracks = stream.getTracks();
            tracks.forEach((track) => track.stop()); // Stop each track
            videoRef.current.srcObject = null; // Clear the video source
        }
        setIsCameraOn(false);
    };

    useEffect(() => {
        // Clean up the camera stream on unmount
        return () => {
            stopCamera();
        };
    }, []);

    const toggleCamera = () => {
        if (isCameraOn) {
            stopCamera();
        } else {
            startCamera();
        }
    };

    return (
        <div className="flex flex-col items-center relative">
            <div className={`w-[37vw] h-96 border-4 border-green-400 dark:border-green-800 rounded-lg flex items-center justify-center ${isCameraOn ? '' : 'bg-gray-200 dark:bg-gray-800'}`}>
                {hasAccess ? (
                    <>
                        <video
                            ref={videoRef}
                            className={`w-full h-full object-cover rounded-sm ${isCameraOn ? 'block' : 'hidden'}`}
                            style={{ transform: 'scaleX(-1)' }} // to make the video mirror
                            playsInline
                            autoPlay
                            muted
                        />
                        {!isCameraOn && <p className="text-gray-500"><LuCameraOff size={120} className='opacity-70' /></p>} {/* Placeholder text */}
                        <button
                            onClick={toggleCamera}
                            className={`mt-4 ${isCameraOn ? "bg-red-500" : "bg-blue-500"} hover:opacity-90 text-white font-bold py-2 px-4 rounded absolute bottom-4`}
                        >
                            <FaCamera />
                        </button>
                    </>
                ) : (
                    <p className="text-red-500 text-xl">Camera access denied or unavailable</p>
                )}
            </div>
        </div>
    );
};

export default Camera;
