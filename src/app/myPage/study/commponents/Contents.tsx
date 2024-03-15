"use client";

import '../../mypage.scss';
import serverStore from '@/lib/server/serverStore';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';



export default function MyStudyContents() {


    return (
        <div className='studyContents'>
            <div>동영상</div>
            <div>
                <div></div>
                <p>웹 개발자라면 한 번쯤 써..</p>
                <b>곰문곰</b>
            </div>
        </div>
    )
}