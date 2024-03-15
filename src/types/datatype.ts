export type myProjectPostType = {
    date: string,
    overview: string,
    position: string[],
    postId: number,
    title: string,
    goal: string,
    link: string,
    member: string[],
    stack: string[],
    image: string,
    like: LikeUserEmail[],
    comments: myProjectCommentType[],
    name: string | null | undefined,
    email: string | null | undefined
}

export type myQnAType = {
    _id : number,
    title : string,
    content : {thumb : string, text : any},
    Email : string | null | undefined,
    userName : string | null | undefined,
    like : LikeUserEmail[],
    comment : myQnACommenttype[],
    postIds : number | undefined,
    postId : number,
}

export type myQnACommenttype = {
    updateKey: string,
    updateValue: number,
    updateType: string,
    field: string,
    value: myQnACommentValue,
}

export type myQnACommentValue = {
    commentText: string | null | undefined,
    name: string | null | undefined,
    email: string | null | undefined,
    thisDay: string,
    img : any
}

export type LikeUserEmail = {
    email: string,
    some : any
}

export type myProjectCommentType = {
    updateKey: string,
    updateValue: number,
    updateType: string,
    field: string,
    value: myProjectCommentValue
}

export type myProjectCommentValue = {
    name: string | null | undefined,
    email: string | null | undefined,
    image: string | null | undefined,
    comment: string,
    date: string
}

export type FilterComponentType = {
    watch: (type: string) => string[],
    type: string,
    title: string,
    options: string[],
    handleOptionClick: (option: string, title: string) => void,
    activeOptions: string[],
    setValue: any
};

export type ButtonComponentType = {
    label: string,
    onClick: () => void,
    isActive: boolean,
};

export type googleSearchItem = {
    "title": string,
    "link": string
    "displayLink": string,
    "snippet": string,
    "pagemap": {
        "cse_thumbnail": [
            {
                "src": string,
                "width": string,
                "height": string
            }
        ],
        "metatags": [
            {
                "twitter:description": string
            }
        ]
    }
};

export type naverSearchItem = {
    "title": string,
    "link": string,
    "description": string,
    "bloggername": string,
    "bloggerlink": string,
    "postdate": string
};


// -------------------------------------- 유튜브 검색 결과
export type youtubeSearch = {
    "kind": string,
    "etag": string,
    "items": youtubeSearchItem,
    "pageInfo": {
        "totalResults": number,
        "resultsPerPage": number
    }
}

export type youtubeSearchItem = {
    "kind": string,
    "etag": string,
    "id": string,
    "snippet": youtubeSnippet
}

export type youtubeSnippet = {
    "publishedAt": string,
    "channelId": string,
    "title": string,
    "description": string,
    "thumbnails": youtubeThumbnails,
    "channelTitle": string,
    "playlistId": string,
    "position": number,
    "resourceId": {
        "kind": string,
        "videoId": string
    },
    "videoOwnerChannelTitle": string,
    "videoOwnerChannelId": string
}

export type youtubeThumbnails = {
    "default": youtubeThumbObject,
    "medium"?: youtubeThumbObject,
    "high"?: youtubeThumbObject,
    "standard"?: youtubeThumbObject,
    "maxres"?: youtubeThumbObject
}

export type youtubeThumbObject = {
    "url": string,
    "width": number,
    "height": number
}

// 레벨별 데이터

export type levelDataType = {
    "youtube": levelDataYoutube[],
    "google": googleSearchItem[],
    "naver": naverSearchItem[],
}

export type levelDataYoutube = {
    "title": string,
    "link": string
    "displayLink": string,
    "snippet": string,
    "pagemap": {
        "cse_thumbnail": [
            {
                "src": string,
                "width": string,
                "height": string
            }
        ]
    }
};

