interface AuthResult {
    accessToken: string,
    userProfile: {
        nickname: string,
        profileImage: string
    }
}