"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Close from '@/essets/close.svg';
import './question.scss';

import LevelTest from './LevelTest';
import Dailyquiz from './Dailyquiz';
import { useQuestion } from '@/context/questionStore';



export default function UserQuestion() {

    const { quiz, isOpenFunc } = useQuestion();

    const handleClose = () => {
        isOpenFunc({ isOpen: false, isTest: false });
    };

    if (!quiz.isOpen) return null;

    return (
        <>

            <section className={`question ${quiz.isOpen ? 'active' : ''}`}>
                <div className='popUpBg'>
                    <button className='popUpX'
                        onClick={handleClose}>
                        <Image
                            className='close'
                            src={Close}
                            alt='close Image'
                            width={25} height={25}
                        ></Image>
                    </button>

                    {
                        quiz.isTest ? <LevelTest /> : <Dailyquiz />
                    }

                </div>
            </section >
        </>

    );
}

