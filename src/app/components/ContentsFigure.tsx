import { levelDataYoutube, googleSearchItem, naverSearchItem } from '@/types/datatype';
import './contentsFigure.scss';

interface contentsFigureType {
    result: levelDataYoutube[] | googleSearchItem[] | naverSearchItem[] | undefined,
    option: number;
}

export default function ContentsFigure({ result, option }: contentsFigureType) {
    if (result === null) {
        return <div>검색 결과가 없습니다!</div>
    }

    return (
        result && result.map((item, i) => {
            if (option === 0) {
                const youtubeItem = item as levelDataYoutube;
                return (
                    <figure className='contentsFigure' key={youtubeItem.title + i}>
                        <a href={youtubeItem.link} target='_blank'>
                            {
                                !youtubeItem.pagemap || !youtubeItem.pagemap.cse_thumbnail || !youtubeItem.pagemap.cse_thumbnail[0]
                                    ? <div className='noImage'></div>
                                    : <img src={youtubeItem.pagemap.cse_thumbnail[0].src} alt={youtubeItem.title} />
                            }
                            <figcaption>
                                <div className='figcaption'>
                                    <div className='top'>
                                        <p className='title'>{youtubeItem.title}</p>
                                        <p className='description'>{youtubeItem.snippet}</p>
                                    </div>
                                    <span className='author'>{null}</span>
                                </div>
                            </figcaption>
                        </a>
                    </figure>
                );
            }
            else if (option === 1 && 'pagemap' in item) {
                const googleItem = item as googleSearchItem;
                return (
                    <figure className='contentsFigure' key={googleItem.title + i}>
                        <a href={googleItem.link} target='_blank'>
                            {
                                !googleItem.pagemap || !googleItem.pagemap.cse_thumbnail || !googleItem.pagemap.cse_thumbnail[0]
                                    ? <div className='noImage'></div>
                                    : <img src={googleItem.pagemap.cse_thumbnail[0].src} alt={googleItem.title} />
                            }
                            <figcaption>
                                <div className='figcaption'>
                                    <div className='top'>
                                        <p className='title'>{googleItem.title}</p>
                                        <p className='description'>{googleItem.snippet}</p>
                                    </div>
                                    <span className='author'>{null}</span>
                                </div>
                            </figcaption>
                        </a>
                    </figure>
                );
            }
            else if (option === 2) {
                const naverItem = item as naverSearchItem;
                return (
                    <figure className='contentsFigure' key={naverItem.title + i}>
                        <a href={naverItem.link} target='_blank'>
                            <figcaption>
                                <div className='figcaption'>
                                    <div className='top'>
                                        <p className='title'>{naverItem.title}</p>
                                        <p className='description'>{naverItem.description}</p>
                                    </div>
                                    <span className='author'>{naverItem.bloggername}</span>
                                </div>
                            </figcaption>
                        </a>
                    </figure>
                );
            }
            else if (option === 4) {
                const community = item as levelDataYoutube;
                return (
                    <figure className='contentsFigure' key={community.title + i}>
                        <a href={community.link} target='_blank'>
                            {
                                !community.pagemap || !community.pagemap.cse_thumbnail || !community.pagemap.cse_thumbnail[0]
                                    ? <div className='noImage'></div>
                                    : <img src={community.pagemap.cse_thumbnail[0].src} alt={community.title} />
                            }
                            <figcaption>
                                <div className='figcaption'>
                                    <div className='top'>
                                        <p className='title'>{community.title}</p>
                                        <p className='description'>{community.snippet}</p>
                                    </div>
                                    <span className='author'>{null}</span>
                                </div>
                            </figcaption>
                        </a>
                    </figure>
                );
            }
            return null;
        })
    );
}