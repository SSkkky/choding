import Link from 'next/link';
import Image from 'next/image';
import plusSVG from '@/essets/plus.svg';
import { useSession } from 'next-auth/react';

export default function WriteMyProject() {
    const { data: session, status } = useSession();

    let writeDisplay = {
        display: status === 'authenticated' ? 'block' : 'none'
    }

    return (
        <aside id="WriteMyProject" style={writeDisplay}>
            <Link href="/community/myProject/write" className='writeBtn'>
                <Image src={plusSVG} alt="write icon" width={20} height={20} />
            </Link>
        </aside>
    )
}