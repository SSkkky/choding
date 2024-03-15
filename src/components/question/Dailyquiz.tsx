"use client";

import { useEffect, useState } from "react";
import QuizData from './daily.json';
import DailyquizStart from "./DailyquizStart";
import DailyquizEnd from "./DailyquizEnd";
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useQuestion } from '@/context/questionStore';



export default function Dailyquiz() {

    const now = dayjs();
    dayjs.locale('ko');
    const today = dayjs().format("YYYY년 MM월 DD일");

    const [timer, setTimer] = useState(10); //10초제한
    const [ingId, setIngId] = useState(0);
    const [ques, setQues] = useState(QuizData.dailyQuiz);
    const ingQues = ques[ingId];
    const [userValue, setUserValue] = useState(null); //사용자 답
    //test state
    const [testState, setTestState] = useState(1);


    useEffect(() => {
        setQues(randomArray(QuizData.dailyQuiz)); // 퀴즈 랜덤설정
    }, []);



    useEffect(() => {
        let intervalId: any;
        if (testState == 2) {
            intervalId = setInterval(() => {
                if (timer > 0) {
                    setTimer(timer - 1);
                } else {
                    clearInterval(intervalId);
                    setTestState(3);
                }
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [timer, testState]);



    const formatTime = (time: any) => {
        return time < 10 ? '0' + time : time;
    };



    const handleAnswer = (index: any) => {
        // console.log(index);
        setUserValue(index);
    };


    function randomArray(array: any) {
        const randomQues = [...array];
        for (let i = randomQues.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [randomQues[i], randomQues[j]] = [randomQues[j], randomQues[i]];
        }
        return randomQues;
    }



    return (
        <>
            {testState === 1 && <DailyquizStart startTest={setTestState} />}
            {testState === 2 &&

                <div className='popUp02'>
                    <div className='popUpContents'>
                        <h3 className='dailyNum'>{today}</h3>
                        <div className='qQuestion'>{ingQues.question}</div>
                        <div className='qAnswer'>
                            <form>

                                {ingQues.choice.map((choice, index) => (
                                    <p key={index}>
                                        <label className="radio_cus">
                                            <input
                                                type="radio"
                                                name="choice"
                                                value={index}
                                                onChange={() => handleAnswer(index)}
                                            />
                                            {choice}
                                        </label>
                                    </p>
                                ))}

                            </form>
                        </div>
                        <p className='timer'>00:{formatTime(timer)}</p>

                        <button className='popUpBtn'
                            onClick={() => { setTestState(3) }}>제출하기</button>
                    </div>
                </div>
            }

            {testState === 3 && <DailyquizEnd isCorrect={userValue == ingQues.answer} />}

        </>
    )
}