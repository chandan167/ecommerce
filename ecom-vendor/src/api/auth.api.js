import { httpClient } from "../utils/http"

export const signUpApi = (data) => {
    return httpClient.post('/auth/sign-up', data)
}