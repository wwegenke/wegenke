import React, {useState, useRef, useLayoutEffect} from 'react'
import Strand from './Strand'

const StringEffect = () => {
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({});

    // holds the timer for setTimeout and clearInterval
    let movement_timer = null;

    // the number of ms the window size must stay the same size before the
    // dimension state variable is reset
    const RESET_TIMEOUT = 100;

    const test_dimensions = () => {
      // For some reason targetRef.current.getBoundingClientRect was not available
      // I found this worked for me, but unfortunately I can't find the
      // documentation to explain this experience
      if (targetRef.current) {
        setDimensions({
          width: targetRef.current.clientWidth,
          height: targetRef.current.clientHeight
        });
      }
    }

    // This sets the dimensions on the first render
    useLayoutEffect(() => {
      test_dimensions();
    }, []);

    // every time the window is resized, the timer is cleared and set again
    // the net effect is the component will only reset after the window size
    // is at rest for the duration set in RESET_TIMEOUT.  This prevents rapid
    // redrawing of the component for more complex components such as charts
    window.addEventListener('resize', ()=>{
      clearInterval(movement_timer);
      movement_timer = setTimeout(test_dimensions, RESET_TIMEOUT);
    });

    return (
        <svg className="string" height="200" width="100%" xmlns="http://www.w3.org/2000/svg" ref={targetRef}>
            <defs>
                <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#05a"/>
                    <stop offset="100%" stopColor="#0a5"/>
                </linearGradient>
            </defs>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
            <Strand width={dimensions.width} height={dimensions.height} grad="url(#grad)" numPoints={6}/>
        </svg>
    );
};

export default StringEffect;