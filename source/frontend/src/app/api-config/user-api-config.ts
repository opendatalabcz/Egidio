import {BASE_API_URL} from "./common-api-config";

export const USER_BASE_API_URL = `${BASE_API_URL}/user`
export function singleUserBaseApiUrl(publicId: string) {
  return `${USER_BASE_API_URL}/${publicId}`
}

export function publicUserInfoApiUrl(publicId: string) {
  return `${singleUserBaseApiUrl(publicId)}`
}