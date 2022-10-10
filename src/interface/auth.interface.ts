export interface IUserProfile {
    email: string
    password?: string
    role: number
    id?: number
}

export interface IJwtUser {
    id: number
    email: string
    role: number
    iat?: any,
    exp?: any
}