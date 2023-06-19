import React, { useState } from 'react';
   import AudioCutter from 'react-audio-cutter';

   function MyComponent() {
     const [cutStartTime, setCutStartTime] = useState(0);
     const [cutEndTime, setCutEndTime] = useState(10);

     function handleCutChange(startTime, endTime) {
       setCutStartTime(startTime);
       setCutEndTime(endTime);
     }

     return (
       <div>
         <AudioCutter
           src="my-audio-file.mp3"
           cutStartTime={cutStartTime}
           cutEndTime={cutEndTime}
           onCutChange={handleCutChange}
         />
         <p>Selected range: {cutStartTime} - {cutEndTime}</p>
       </div>
     );
   }