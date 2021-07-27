import React, { useState, useEffect, useRef } from 'react';

const setActiveNavButton = (btnClass) => {
    let aside = document.getElementById("aside");
    if (aside) {
        let asideBtns = [...aside.getElementsByClassName('bubble-button')];

        asideBtns.forEach(element => {
            if (element.classList.contains(btnClass) && !element.classList.contains('active'))
                element.classList.add('active');
            else if (!element.classList.contains(btnClass) && element.classList.contains('active'))
                element.classList.remove('active');
        });
    }
};

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let tick = () => {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const getRandomInt = (min, max) => {
    if (max == null) {
        max = min;
        min = 0;
    }
    return Math.floor(Math.random() * Math.floor(max - min)) + min;
}

export {setActiveNavButton, useInterval, getRandomInt}