"use client";

{/* 마이페이지 / 출석체크 */ }
import '../mypage.scss';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import arrowLeftGrayDark from '@/essets/arrowLeftGrayDark.svg';


export default function MyCheck() {

    const router = useRouter();

    // 뒤로가기
    const onClickBackHandler = () => {
        router.back();
    }


    return (
        <section className='checkPage'>
            <div className='checkTitle'>
                <p className='backIcon' onClick={onClickBackHandler}>
                    <Image src={arrowLeftGrayDark} alt='arrowLeft' />
                </p>
                <h3>출석체크</h3>
            </div>

            <div className='monthCover'>
                <p className='month'>march</p>

                <table>
                    <thead>
                        <tr>
                            <th>일</th>
                            <th>월</th>
                            <th>화</th>
                            <th>수</th>
                            <th>목</th>
                            <th>금</th>
                            <th>토</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>1</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>11</td>
                            <td>12</td>
                            <td>13</td>
                            <td>14</td>
                            <td>15</td>
                            <td>16</td>
                        </tr>
                        <tr>
                            <td>17</td>
                            <td>18</td>
                            <td>19</td>
                            <td>20</td>
                            <td>21</td>
                            <td>22</td>
                            <td>23</td>
                        </tr>
                        <tr>
                            <td>24</td>
                            <td>25</td>
                            <td>26</td>
                            <td>27</td>
                            <td>28</td>
                            <td>29</td>
                            <td>30</td>
                        </tr>
                        <tr>
                            <td>31</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <div className='iceCreamBtn'>
                    오늘의 <span>아이스크림</span> 받기
                </div>
            </div>
        </section>
    );
}