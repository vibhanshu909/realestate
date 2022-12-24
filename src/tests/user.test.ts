// @ts-expect-error TS(7016): Could not find a declaration file for module 'fake... Remove this comment to see the full error message
import faker from 'faker';
import login, { request } from './login';
import {  
  CREATE_USER,
  UPDATE_USER_CONTACT,
  UPDATE_USER_PASSWORD,
  CREDIT
} from './graphql/mutation/remote'

// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe("testing", async () => {
  login();
  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('user', () => {
    let user = {};
    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(error).toBeUndefined();
      const { id, count, createdAt, updatedAt, ...rest } = createUser;

      // @ts-expect-error TS(2304): Cannot find name 'expect'.
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
    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("credit", async () => {
      const inputData = {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
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
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(error).toBeUndefined();
      const { amount } = credit;
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect({ amount }).toMatchObject({ amount: inputData.amount });
    });

    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("updateUserContact", async () => {
      const inputData = {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
        id: user.id,
        contact: Number(faker.phone.phoneNumberFormat().split("-").join(""))
      };
      const { data: { data: { updateUserContact }, error } } = await request({
        query: UPDATE_USER_CONTACT,
        variables: {
          ...inputData
        }
      });
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(error).toBeUndefined();
      const { contact } = updateUserContact;
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect({ contact }).toMatchObject({ contact: inputData.contact });
    });
    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test("updateUserPassword", async () => {
      const inputData = {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
        id: user.id,
        data: {
          // @ts-expect-error TS(2339): Property 'password' does not exist on type '{}'.
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
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(error).toBeUndefined();
      const { status } = updateUserPassword;
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect({ status }).toMatchObject({ status: true });
      // @ts-expect-error TS(2339): Property 'password' does not exist on type '{}'.
      user.password = inputData.data.password;
    });
  });
})