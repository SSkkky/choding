"use client"

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import "./QnAWrite.scss";
import { connectToDB } from '@/lib/mongodb';
import axios from 'axios';
import { useSession } from 'next-auth/react';

const QuillExample = dynamic(() => import('./components/QuillExample'), { ssr: false });

export default function QnAWrite() {

    const { data: session, status } = useSession();
    const [data, setData] = useState([]);
    const [postId,setPostId] = useState(0);

    const findMaxPostId = (data:any) => {
        // 초기값으로 postId 값을 -Infinity로 설정
        const maxPostId = data.reduce((max:any, item:any) => {
            // 현재 요소의 postId가 현재 최대값보다 크다면 해당 postId를 최대값으로 설정
            return item.postId > max ? item.postId : max;
        }, -Infinity);
    
        return maxPostId;
    };
    
    // data 배열에서 제일 큰 postId 값을 찾기
    const maxPostId = findMaxPostId(data);
    
    console.log("제일 큰 postId:", maxPostId);

    console.log(data);

    const handleSaveContent = (title: string, content: string) => {
        const postId = maxPostId + 1; // 제일 큰 postId 값에 1을 더하여 새로운 postId 설정
        console.log(title, content);
        // 데이터베이스에 데이터 저장 로직을 직접 구현하거나, 외부 함수를 호출하여 처리할 수 있습니다.
        saveToDatabase(title, content, postId);
    };

    console.log(session)

    const saveToDatabase = async (title: string, content: string, postId:number) => {
        try {
            const Email = session?.user?.email;
            const userName = session?.user?.name;
            const comment:any = [];
            const like:any = [];
            const data = { title, content, Email, userName, comment, like, postId};
            // // 데이터베이스 연결 및 데이터 저장
            axios.post('/api/post',data); // axios로 api서버로 데이터를 보낸다
            console.log('데이터가 성공적으로 저장되었습니다.');
            // 성공적으로 데이터가 저장된 후 수행할 작업 추가
        } catch (error) {
            console.error('데이터 저장 중 오류 발생:', error);
            // 데이터 저장 중 오류 처리 로직 추가
        }
    };

    useEffect(()=>{
        const fetchData = async () => {
            const response = await axios.get('/api/post?colName=qna');
            setData(response.data);
        }
        fetchData()
    },[])

    return (
        <>
            <section className='QnAWriteMain'>
                <form onSubmit={(e) => e.preventDefault()}>
                    <QuillExample onSaveContent={handleSaveContent} />
                </form>
            </section>
        </>
    );
}
