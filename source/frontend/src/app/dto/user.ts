import {Contact, PublishedContactDetailSettings} from "../models/common/contact";
import {UserRole} from "../models/common/user";

export interface NonRegisteredUserInfoCreationDto {
  contact: Contact
  spokenLanguagesCodes?: string[]
  publishedContactDetail: PublishedContactDetailSettings
}

export interface PublicUserInfoDto {
  username?: string
  firstname?: string,
  lastname?: string,
  email?: string,
  telephoneNumber?: string,
  spokenLanguagesCodes?: string[],
}

export interface LoggedUserInfoDto {
  id: string
  username: string
  role: UserRole
}


export interface PublicUserInfoDto {
  username?: string
  firstname?: string,
  lastname?: string,
  email?: string,
  telephoneNumber?: string,
  spokenLanguagesCodes?: string[],
}

export interface UserDto {
  publicId?: string
  username?: string
  firstname?: string,
  lastname?: string,
  email?: string,
  telephoneNumber?: string,
  spokenLanguagesCodes?: string[],
  publishedContactDetailsSettings?: PublishedContactDetailSettings
}
