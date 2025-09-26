export interface userRegisterDTO {
  name: string;
  email: string;
  birthdate: Date;
  nDni: number;
  username: string;
  password: string;
  credential?: { id: number };
}

export interface userLoginDTO {
  username: string;
  password: string;
}

export interface userInfoDTO {
  name: string;
  email: string;
  username?: string;
}
