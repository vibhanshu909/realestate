import faker from 'faker';
import login, { request } from './login';
import {  
  CREATE_USER,
  UPDATE_USER_CONTACT,
  UPDATE_USER_PASSWORD,
  CREDIT
} from './graphql/mutation/remote'

describe("testing", async () => {
  login();
  describe('user', () => {
    let user = {};
    test('createUser', async () => {
      const inputData = {
        username: faker.internet.userName().toLowerCase(),
        password: faker.internet.password(),
        totalReceivedAmount: Number(faker.finance.amount())
      };
      // console.log(inputData);
      const { data: { data: { createUser }, error } } = await request({
        query: CREATE_USER,
        variables: {
          data: inputData
        }
      });
      expect(error).toBeUndefined();
      const { id, count, createdAt, updatedAt, ...rest } = createUser;

      expect(rest).toMatchObject({
        username: inputData.username,
        totalReceivedAmount: inputData.totalReceivedAmount,
        spent: 0,
        balance: inputData.totalReceivedAmount,
        siteCount: 0,
        totalSitesCost: 0
      });
      user = { ...createUser, password: inputData.password }
    });
    test("credit", async () => {
      const inputData = {
        id: user.id,
        amount: Number(faker.finance.amount())
      };
      // console.log(inputData);
      const { data: { data: { credit }, error } } = await request({
        query: CREDIT,
        variables: {
          ...inputData
        }
      });
      expect(error).toBeUndefined();
      const { amount } = credit;
      expect({ amount }).toMatchObject({ amount: inputData.amount });
    });

    test("updateUserContact", async () => {
      const inputData = {
        id: user.id,
        contact: Number(faker.phone.phoneNumberFormat().split("-").join(""))
      };
      const { data: { data: { updateUserContact }, error } } = await request({
        query: UPDATE_USER_CONTACT,
        variables: {
          ...inputData
        }
      });
      expect(error).toBeUndefined();
      const { contact } = updateUserContact;
      expect({ contact }).toMatchObject({ contact: inputData.contact });
    });
    test("updateUserPassword", async () => {
      const inputData = {
        id: user.id,
        data: {
          currentPassword: user.password,
          newPassword: faker.internet.password()
        }
      };
      const { data: { data: { updateUserPassword }, error } } = await request({
        query: UPDATE_USER_PASSWORD,
        variables: {
          ...inputData
        }
      });
      expect(error).toBeUndefined();
      const { status } = updateUserPassword;
      expect({ status }).toMatchObject({ status: true });
      user.password = inputData.data.password;
    });
  });
})