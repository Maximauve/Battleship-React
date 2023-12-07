import { type User } from 'src/types/user/User';
import { type UserLoginDTO } from 'src/types/user/UserLoginDTO';
import { type UserRegisterDTO } from 'src/types/user/UserRegisterDTO';
import { post } from 'src/config/requests';
import { type UserRegistered } from 'src/types/user/UserRegistered';
import { jwtDecode } from 'jwt-decode';
import { type Login201 } from 'src/types/api/Login201';
import { type JwtDecoded } from 'src/types/api/JwtDecoded';
import { type Response401 } from 'src/types/api/Response401';
import { type Response400 } from 'src/types/api/Response400';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL;

const api = {
  logIn: async (user: UserLoginDTO): Promise<User> => {
    const response = await post(`${BASE_URL}/users/auth/login`, user);
    if (response.status !== 201) {
      const res: Response401 = await response.json();
      throw new Error(res.message);
    }
    const jwt: Login201 = await response.json();

    const connectedUser: JwtDecoded = jwtDecode(jwt.access_token);

    return {
      id: connectedUser.id,
      username: connectedUser.username,
      access_token: jwt.access_token
    };
  },

  register: async (user: UserRegisterDTO): Promise<UserRegistered> => {
    const response = await post(`${BASE_URL}/users/auth/sign-up`, user);
    if (response.status !== 201) {
      if (response.status === 400) {
        const res: Response400 = await response.json();
        throw new Error(res.message.map((m) => m).join(', '));
      } else if (response.status === 409) {
        const res: Response401 = await response.json();
        throw new Error(res.message);
      }
    }
    return await response.json() as UserRegistered;
  }
};

export default api;
