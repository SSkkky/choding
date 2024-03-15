// components/QuillExample.tsx
"use client"

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connectToDB } from '@/lib/mongodb';
import ImageResize from 'quill-image-resize';
Quill.register('modules/ImageResize', ImageResize);

interface QuillExampleProps {
    onSaveContent: (title: string, content: string) => void;
}

export default function QuillExample({ onSaveContent }: QuillExampleProps) {
    const router = useRouter();

    const [value, setValue] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);

    const handleChange = (content: string, delta: any, source: string, editor: any) => {
        setValue(content);
        // extractImages(content);
    };

    // const extractImages = (content : string) =>{
    //     const imgTags = content.match(/<img[^>]+src="([^">]+)"/g);
    //     if (imgTags) {
    //         // 추출된 이미지 URL 배열에 추가
    //         const extractedImages = imgTags.map(tag => tag.match(/src="([^"]+)"/)[1]);
    //         setImages(extractedImages);
    //     }
    // };

    const handleSave = () => {
        onSaveContent(title, value);
    };

    // 뒤로가기
    const onClickBackHandler = () => {
        router.back();
    }

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            // [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'], // 이미지 삽입 버튼 추가
            ['clean']
        ],
        ImageResize: {
            parchment: Quill.import('parchment')
        }
    };

    function validareFormWith(){
        const name = document.querySelector('#QnATitle');
        const contents = document.querySelector('#QnAContent');

        if(!name){
            alert('제목을 적어주세요')
            return false
        }
        if(!contents){
            alert('내용을 넣어주세요');
            return false
        }
    }

    return (
        <>
            <div className='BtnBox'>
                <button className='delete' onClick={onClickBackHandler}>취소</button>
                <button className='save' onClick={()=>{handleSave(); onClickBackHandler();}}>저장</button>
            </div>
            <div className='writebox'>
                <input
                    type="text"
                    id='QnATitle'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="제목이 들어와요!"
                    className='QnAWriteTitle'
                />

                <ReactQuill
                    theme="snow"
                    id='QnAContent'
                    value={value}
                    onChange={handleChange}
                    placeholder="Write something..."
                    style={{ height: "500px", margin: "18px" }}
                    modules={modules}
                />
            </div>
        </>
    );
}
