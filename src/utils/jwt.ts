import jsonwebtoken from 'jsonwebtoken';

export const SECRET_KEY = 'sdkldslkmdsmkldsmklmkldsmklsd'

export function encode (user: any) {
    const token = jsonwebtoken.sign({
        user: user.login
      }, SECRET_KEY, {})
    return token
}

export function validateToken(authToken: string) {
    console.log(authToken)
    try {
        return typeof authToken === 'string' && jsonwebtoken.verify(authToken, SECRET_KEY)
    } catch (error) {
        return false
    }
}