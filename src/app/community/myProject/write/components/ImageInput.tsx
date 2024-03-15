"use client";

import { storage } from '@/firebase/firebase-sdk';
import {ref, uploadBytes, listAll, getDownloadURL, deleteObject } from 'firebase/storage'
import { useEffect, useState } from 'react';

type ImgListItem = {
  url: string;
  fullPath: string;
};

type SetImgListFunction = React.Dispatch<React.SetStateAction<ImgListItem[]>>;

export default function ImageInput() {
  const [imgList, setImgList] = useState<ImgListItem[]>([]);

  function upload(e: React.ChangeEvent<HTMLFormElement>, setImgList: SetImgListFunction) {
  e.preventDefault();
  const formdata = new FormData(e.target as HTMLFormElement);
    const file = formdata.get('photo');
    if (!(file instanceof File)) return;
    
    const storageRef = ref(storage, 'myProject_' + file.name);

    uploadBytes(storageRef, file)
    .then(async snapshot => {
      const url = await getDownloadURL(ref(storage, snapshot.metadata.fullPath));
      setImgList([...imgList, {url, fullPath: snapshot.metadata.fullPath}])
    })
  }

  return (
    <section id="myProjectWriteImage">
      <input type="file" id="photo" name="photo" style={{ display: 'none' }} />
      <label htmlFor="photo" className="custom-file-upload">대표 이미지를 업로드해주세요</label>
      <button type="submit">등록</button>
    </section>
  );
}
