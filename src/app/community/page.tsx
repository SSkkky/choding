//src/app/community.tsx
// "use client";
import './community.scss';
import QnABest from './QnABest';
import MyProjectBest from './MyProjectBest';

export default function Community() {
  return (
    <section id="communityHome">
      <QnABest />
      <MyProjectBest />
    </section>
  );
}