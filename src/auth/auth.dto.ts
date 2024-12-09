export class AuthResponseDto {
    token: string;
    expiresIn: number;
}

export class UserDto {
    username: string;
    password: string;
}