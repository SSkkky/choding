"use client";

import { useEffect, useRef, useState } from 'react';
import { myQnAType} from '@/types/datatype'
import Link from 'next/link';
import axios from 'axios';
import "./QnA.scss";
import Image from 'next/image';
import dumi from '@/essets/charactor/CHO.svg'

export default function AllPage() {
  const [data, setData] = useState<myQnAType[]>([]);

  const findMaxPostId = (data: any) => {
    // 초기값으로 postId 값을 -Infinity로 설정
    const maxPostId = data.reduce((max: any, item: any) => {
      // 현재 요소의 postId가 현재 최대값보다 크다면 해당 postId를 최대값으로 설정
      return item.postId > max ? item.postId : max;
    }, -Infinity);

    return maxPostId;
  };

  // data 배열에서 제일 큰 postId 값을 찾기
  const maxPostId = findMaxPostId(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/post?colName=qna');

        // let resObj = [];
        response.data.forEach((obj:any) => {

          const tag = document.createElement('div');
          tag.innerHTML = obj.content;

          const tumb = tag.querySelector('img');

          const text:string[] = [];
          tag.childNodes.forEach((node: any) => {
            node.childNodes.forEach((child: any) => {
              if (child.tagName == undefined) {
                text.push(child)
              }
            });
          })
          // resObj.push({tumb, text:text[0]});
          obj.content = { thumb: tumb?.src, text: text[0] }
        })

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  //좋아요 좋아요 중소기업

  return (
    <div className="contPadding">
      <div className='QnAContentContainer'>
        {data && data.map((item, index) => (
          <Link href={`./QnA/${item._id}`} className='QuestionBox' key={index}>
            <div className='QuestionText'>
              <div className='QnAcontent'>
                <h2>{item.title}</h2>
                <p>{item.content.text?.textContent}</p>
              </div>
              <div className='QnAInfo'>
                <p>by {item.userName}</p>
                <p>💬 {item.comment.length}</p>
                <p>♥ <span>{item.like.length}</span></p>
              </div>
            </div>

            <div className='QuestionImg'>
              {/* <img src={item.content?.thumb} alt=""  /> */}
              <Image 
              src={item.content?.thumb || dumi} 
              alt='' 
              width={90} height={50} 
              />

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}