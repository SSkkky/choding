export type signUpType = {
    name: string,
    password: string,
    passwordCheck?: string,
    email: string,
    image: string
}

export type userDataType = {
    email: string,
    image: string | null,
    id: string | null | undefined,
    password: string | undefined,
    name: string | null,
    level: string | undefined | null
}

export type userPointType = {
    email: string,
    level: string | null,
    point: string | null
}