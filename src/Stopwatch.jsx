import React, {useState, useEffect, useRef} from 'react';
function Stopwatch(){

    const [isRunnning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(()=> {
        if(isRunnning){
            intervalIdRef.current =setInterval(()=>{
                setElapsedTime(Date.now()- startTimeRef.current);
            },10);

            return ()=> {
                clearInterval(intervalIdRef.current);
            }
        }

    }, [isRunnning]);

    function start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;

    }
    function stop(){
        setIsRunning(false);
    }
    function reset(){
        setElapsedTime(0);
        setIsRunning(false);
    }
    function formateTime(){
        let hours = Math.floor(elapsedTime / (1000 * 60 *60) )       ;
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60 );      
        let seconds = Math.floor(elapsedTime / (1000 ) %60 );
        let milliseconds = Math.floor((elapsedTime%1000)/10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");


        return `${hours}:${minutes}:${seconds}:${milliseconds}`

    }

    return (<div className='stopwatch'>
        <div className='display'>{formateTime()}</div>
        <div className='controls'>
            <button onClick={start} className='start-button'>start</button>
            <button onClick={stop} className='stop-button'>stop</button>
            <button onClick={reset} className='reset-button'>reset</button>

        </div>

    </div>)
     
}

export default Stopwatch