interface IUser {
  id: number;
  name: string;
  email: string;
  birthday: Date;
  nDni: number;
  credentialsId: number;
  username?: string;
}

export default IUser;
