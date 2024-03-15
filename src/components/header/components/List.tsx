import { useQuestion } from "@/context/questionStore"
import Link from "next/link"

type ListComponentType = {
    options: string[],
    href: string[],
    onClickMenu: React.MouseEventHandler
}

export default function List({ options, onClickMenu, href }: ListComponentType) {
    const { isOpenFunc } = useQuestion();
    return (
        <ul className='MenuGroup'>
            {options.map((item, index) => (
                <li key={index} onClick={onClickMenu}>
                    {
                        (item !== '오늘의 퀴즈') ? (
                            <Link href={href[index]}>{item}</Link>
                        ) : (
                            <span onClick={() => { isOpenFunc({ isOpen: true, isTest: false }) }}>{item}</span>
                        )
                    }
                </li>
            ))}
        </ul>
    )
}

// isOpenFunc({ isOpen: true, isTest: true }) 레벨테스트
// isOpenFunc({ isOpen: true, isTest: false }) 오늘의퀴즈