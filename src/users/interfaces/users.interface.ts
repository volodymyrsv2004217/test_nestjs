export interface User {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  nickname: string;
  city: string;
  date_of_birth: string;
  registered_at: string;
  gender: 'm' | 'f';
  country: string;
}
