export interface User {
  token: string;
  user: {
    id: number;
    guid: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
  };
}
