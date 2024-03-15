"use client";

import React, { useEffect, useState } from 'react';
import QuizData from './level.json';
import LevelTestStart from './LevelTestStart';
import LevelTestEnd from './LevelTestEnd';

export default function LevelTest() {

    const [score, setScore] = useState(0);
    const [ingId, setIngId] = useState(0);
    const [timer, setTimer] = useState(10);
    const [ques, setQues] = useState(QuizData.oxQuiz);
    const ingQues = ques[ingId];

    //test state
    const [testState, setTestState] = useState(1);
    const [userValue, setUservalue] = useState(null);


    useEffect(() => {
        let intervalId: any;
        if (testState == 2) {
            intervalId = setInterval(() => {
                if (timer > 0) {
                    setTimer(timer - 1);
                }
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [timer, testState]);


    const formatTime = (time: any) => {
        return time < 10 ? '0' + time : time;
    };


    useEffect(() => {
        let intervalId: any;
        if (testState == 2) {
            intervalId = setInterval(() => {
                nextQuestion();
            }, 10000);
        }
        return () => clearInterval(intervalId);
    }, [ingId, ques, testState]);


    const btnHandler = (res: any) => {
        setUservalue(res);
    };


    const submitHandler = () => {
        if (userValue === ingQues.answer) {
            setScore(score + 1);
        }
        nextQuestion();
    };

    const nextQuestion = () => {
        const nextId = ingId + 1;
        if (nextId < ques.length) {
            setIngId(nextId);
            setTimer(10);
            setUservalue(null);

        } else {
            // console.log('====================================');
            // console.log(score);
            // console.log('====================================');
            setTestState(3);
        }
    };






    return (
        <>
            {testState === 1 && <LevelTestStart startTest={setTestState} />}
            {testState === 2 &&
                <div className='popUp02'>
                    <div className='popUpContents'>
                        <h3 className='qNum'>{ingQues.number}</h3>
                        <div className='qQuestion'>{ingQues.question}</div>
                        <div className='qAnswer'>
                            <button
                                className={userValue === true ? 'active' : ''}
                                onClick={() => btnHandler(true)}>O</button>

                            <button
                                className={userValue === false ? 'active' : ''}
                                onClick={() => btnHandler(false)}>X</button>
                        </div>
                        {/* <p>점수는 {score}</p> */}
                        <p className='timer'>00:{formatTime(timer)}</p>

                        <button className="popUpBtn"
                            onClick={submitHandler}>제출하기</button>

                    </div>
                </div>
            }
            {testState === 3 && <LevelTestEnd score={score} />};
        </>
    )
}
