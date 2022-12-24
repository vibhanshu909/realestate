import axios from 'axios';
import { LOGIN } from './graphql/mutation/remote';

const headers = {
  authorization: ''
};

export async function request(params, header = headers) {
  return await axios.post('http://localhost:5000/graphql', params, { headers: header })
}

export default () => describe("login", () => {
  test('login', async () => {
    const { data: { data } } = await request({
      query: LOGIN,
      variables: {
        data: {
          username: 'testing',
          password: 'testing@123',
        }
      }
    });
    expect(typeof (data.login.token)).toBe("string");
    headers.authorization = data.login.token;
  });
});