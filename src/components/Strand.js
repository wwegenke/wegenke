import React, {useState} from 'react'
import {useInterval, getRandomInt} from '../scripts/scripts'

const Strand = (props) => {
    const numPoints = props.numPoints == null || props.numPoints < 2 ? 2 : props.numPoints;

    //const basePoints = [{x: 0, y: 0}, {x: 500, y: 0}, {x: 1000, y: 0}, {x: 1500, y: 0}, {x: 2000, y: 0}, {x: 2500, y: 0}, {x: 3000, y: 0}, {x: 3500, y: 0}, {x: 4000, y: 0}, {x: 4500, y: 0}]
    const minWidth = 0;
    const maxWidth = props.width || 200;
    const minHeight = 0;
    const maxHeight = props.height || 100;
    let basePoints = [];
    let spaceBetween = maxWidth / (numPoints - 1);
    let midHeight = maxHeight / 2;
    for(let i = 0; i < numPoints; i++) {
        basePoints.push({x: i * spaceBetween, y: midHeight});
    }
    let [points, setPoints] = useState(basePoints);
    let [targetPoints, setTargetPoints] = useState(basePoints);
    let [prevPoints, setPrevPoints] = useState(basePoints);
    let [targetInterval, setTargetInterval] = useState(1);
    let [timeElapsed, setTimeElapsed] = useState(0);
    let updateInterval = 25;

    useInterval(() => {
        let elapsedTime = timeElapsed + updateInterval;
        let elapsedPercent = elapsedTime / targetInterval;
        
        setPoints(points.map((point, i) => {
            let x = point.x;
            let y = point.y;

            let totalDistanceX = (targetPoints[i].x - prevPoints[i].x);
            let totalDistanceY = (targetPoints[i].y - prevPoints[i].y);

            if (elapsedPercent < 1) {

                // x = prevPoints[i].x + (totalDistanceX * Math.pow(elapsedPercent, 2)) / (Math.pow(elapsedPercent, 2) + Math.pow(1 - elapsedPercent, 2));
                // y = prevPoints[i].y + (totalDistanceY * Math.pow(elapsedPercent, 2)) / (Math.pow(elapsedPercent, 2) + Math.pow(1 - elapsedPercent, 2));

                x = prevPoints[i].x + (totalDistanceX * (Math.sin(Math.PI * elapsedPercent - Math.PI / 2) + 1) / 2);
                y = prevPoints[i].y + (totalDistanceY * (Math.sin(Math.PI * elapsedPercent - Math.PI / 2) + 1) / 2);

                // x += (targetPoints[i].x - prevPoints[i].x) / (targetInterval / updateInterval);
                // y += (targetPoints[i].y - prevPoints[i].y) / (targetInterval / updateInterval);

                return {x: x, y: y};
            }
            else
                return {x: targetPoints[i].x, y: targetPoints[i].y};
        }));

        setTimeElapsed(elapsedTime);
    }, updateInterval);
    useInterval(() => {
        setTargetInterval(getRandomInt(7000, 15000));
        setTimeElapsed(0);
        setPrevPoints(points);
        setTargetPoints(basePoints.map((point, i) => {
            let x = point.x;
            let y = point.y;
            // // if (i == 0) {
            //     if (targetPoints[i].y > 300)
            //         y = getRandomInt(0, 300);
            //     else
            //         y = getRandomInt(300, 500);
            // // } else {
            // //     y = targetPoints[i - 1].y;
            // // }

            y = getRandomInt(minHeight, maxHeight);

            // let xMin = i == 0 ? 0 : ((basePoints[i].x + basePoints[i - 1].x) / 2) + 100;
            // let xMax = i == basePoints.length - 1 ? max : ((basePoints[i + 1].x + basePoints[i].x) / 2) - 100;

            let backDistance = (i === 0 ? x - minWidth : (x - basePoints[i - 1].x) / 3);
            let forwardDistance = (i === basePoints.length - 1 ? maxWidth - x : (basePoints[i + 1].x - x) / 3);

            x = getRandomInt(Math.max(x - backDistance, minWidth), Math.min(x + forwardDistance, maxWidth));

            return {x: x, y: y}
        }));
    }, targetInterval);

    let stringPoints = "M " + points.map((point, i) => {
        //let result = point.x + "," + point.y;
        let myPoint = point.x + "," + point.y;
        let midPointAhead = (i < points.length - 1) ? (point.x + (points[i + 1].x - point.x) / 2) : null;
        let midPointBehind = (i > 0) ? (point.x - (point.x - points[i - 1].x) / 2) : null;

        let result = "";
        if (midPointBehind) {
            result += midPointBehind + "," + point.y + " ";
        }
        result += myPoint;
        if (midPointAhead) {
            result += " C " + midPointAhead + "," + point.y;
        }

        // if (i == 0)
        //     result += " C " + (point.x + (points[i + 1].x - point.x) / 2) + "," + point.y;
        // else if (i == points.length - 1) {
        //     result = (point.x - (point.x - points[i - 1].x) / 2) + "," + point.y + " " + result;
        // } else {
        //     result = (point.x - (point.x - points[i - 1].x) / 2) + "," + point.y + " " + result;
        //     if (i >= 2)
        //         result = "S " + result;
        // }

        return result;
    }).join(" ");
        
    return (
        <path strokeWidth="0.3" d={stringPoints} stroke={props.grad} fill="transparent"/>
    );
};

export default Strand;