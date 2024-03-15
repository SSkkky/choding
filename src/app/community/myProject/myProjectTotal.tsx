"use client";

import FigureComponent from "./components/FigureComponent";
import { myProjectStore } from "./context/myProject";
import './myProjectTotal.scss';

export default function MyProjectTotal() {
  const { setResult, result } = myProjectStore();

  // result 다 받아오기 전
  if (!Array.isArray(result)) {
    return <div id="Loading">~ 로딩중입니다 ~</div>;
  }

  return (
    <section id="MyProjectTotal">
      <FigureComponent />
    </section>
  );
}
