"use client";

import { useCallback, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ArrowRight from '@/essets/arrowRight.svg';
import './myProjectBest.scss';
import MyProjectSlide from '../components/MyProjectSlide';
import serverStore from '@/lib/server/serverStore';
import {myProjectPostType} from '@/types/datatype';

export default function MyProjectBest() {
  const router = useRouter();
  const [projects, setProjects] = useState<myProjectPostType[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await serverStore('get', 'myProject');
      if (response) {
        const sortedProjects = sortProjectsByLikesAndComments(response.data);
        setProjects(sortedProjects);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortProjectsByLikesAndComments = (projects : myProjectPostType[]) => {
    return projects.sort((a, b) => {
      if (a.like.length === b.like.length) {
        return b.comments.length - a.comments.length;
      }
      return b.like.length - a.like.length;
    });
  };

  const sortedProjects = useMemo(() => sortProjectsByLikesAndComments(projects), [projects]);

  const handleClickBestFigure = useCallback(() => {
    // 컴포넌트가 리렌더링될 때마다 같은 함수를 재사용하도록!(최적화 ㅇㅅㅇb)
    if (projects.length > 0) {
      router.push(`/community/myProject/${sortedProjects[0].postId}`);
    }
  }, [sortedProjects, router]);


  return (
    <section id="communityMyProjectContainer" className="communityContainer">
      <div className="communityContHeader">
        <h2 className="containerTitle">최근 핫한 <span>프로젝트</span></h2>
        <div>
          <Link href='/community/myProject' className='more'>더보기
            <Image
              src={ArrowRight}
              alt='arrow image'
              width={20} height={20}
            />
          </Link>
        </div>
      </div>
      <section className="containerContents">
        {projects.length > 0 &&
          <figure className='ccitem best1'
            onClick={handleClickBestFigure}>
            {
              projects[0].image.length !== 0
              ? <Image src={projects[0].image} alt="이미지" width={100} height={100} />
              : <div className='noImage' />
            }
            <figcaption>
              <h3>{projects[0].title}</h3>
              <div className='bottom'>
                <span className='name'>by {projects[0].name}</span>
                <span className='like'>♥ {projects[0].like.length}</span>
                <span>💬 {projects[0].comments.length}</span>
              </div>
            </figcaption>
          </figure>
        }
        <MyProjectSlide slidePost={projects.slice(1)} />
      </section>
    </section>
  );
}
