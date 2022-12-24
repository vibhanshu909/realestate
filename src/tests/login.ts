import axios from 'axios';
import { LOGIN } from './graphql/mutation/remote';

const headers = {
  authorization: ''
};

export async function request(params: $TSFixMe, header = headers) {
  return await axios.post('http://localhost:5000/graphql', params, { headers: header })
}

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
export default () => describe("login", () => {
  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
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
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(typeof (data.login.token)).toBe("string");
    headers.authorization = data.login.token;
  });
});