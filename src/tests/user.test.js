import axios from 'axios';

const headers = {
  authorization: ''
};

async function request(params, header = headers) {
  return await axios.post('http://localhost:5000/graphql', params, { headers: header })
}

describe("testing", async () => {
  test('login', async () => {
    const { data: { data } } = await request({
      query: `
          mutation login($data: LoginInput!){
            login(data: $data){
                token
            }
        }
      `,
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
  describe('user', () => {
    test('createUser', async () => {
      const { data: { data: { createUser } } } = await request({
        query: `
          mutation createUser($data: UserInput!){
            createUser(data: $data){
              id,
              username,            
              siteCount,
              totalSitesCost,
              totalReceivedAmount,
              spent,
              balance,
              createdAt,
              updatedAt,
              count,
            }
          }
        `,
        variables: {
          data: {
            username: "test_user",
            password: "test_user@123",
            totalReceivedAmount: 0
          }
        }
      });
      expect(createUser.username).toBe('test_user')
    });
  });
})