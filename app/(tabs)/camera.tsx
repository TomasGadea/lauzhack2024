import React, { useState } from 'react';

const VideoRecorderScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [cameraType, setCameraType] = useState('back');

  const toggleCameraType = () => {
    setCameraType(cameraType === 'back' ? 'front' : 'back');
  };

  const recordVideo = () => {
    setIsRecording(true);
    // Simulated video recording logic
    console.log('Video recording started');
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulated video saving logic
    console.log('Video recording stopped');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="relative bg-black h-96 flex items-center justify-center">
          <div className="text-white text-center">
            {cameraType === 'back' 
              ? 'Back Camera View' 
              : 'Front Camera View'}
          </div>
        </div>
        
        <div className="flex justify-between p-4">
          <button 
            onClick={toggleCameraType}
            className="bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            Flip Camera
          </button>
          
          <button 
            onClick={isRecording ? stopRecording : recordVideo}
            className={`
              px-4 py-2 rounded-md transition
              ${isRecording 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-green-600 text-white hover:bg-green-700'}
            `}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
        </div>
      </div>
      
      {isRecording && (
        <div className="mt-4 text-red-600 font-bold">
          Recording in Progress
        </div>
      )}
    </div>
  );
};

export default VideoRecorderScreen;
