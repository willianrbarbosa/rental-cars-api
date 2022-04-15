interface IAuthenticateUserDTO {
  email: string;
  password: string;
}

interface IUserTokenDTO {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

export { IAuthenticateUserDTO, IUserTokenDTO };
