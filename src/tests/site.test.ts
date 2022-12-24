// @ts-expect-error TS(7016): Could not find a declaration file for module 'fake... Remove this comment to see the full error message
import faker from 'faker';
import login, { request } from './login';
import { USERS_USERNAME } from './graphql/query/remote';
import {
  CREATE_SITE,
  UPDATE_SITE,
} from './graphql/mutation/remote'


// @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('site', () => {
  login();
  let users = {};
  // @ts-expect-error TS(2582): Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
  describe('query', () => {
    // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test('users', async () => {
      const { data: { data: { users: us } } } = await request({
        query: USERS_USERNAME
      });
      // @ts-expect-error TS(2304): Cannot find name 'expect'.
      expect(us).toBeInstanceOf(Array);
      users = us;
    });
  });
  let site = {};
  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('createSite', async () => {
    // @ts-expect-error TS(2339): Property 'length' does not exist on type '{}'.
    const uIndex = Math.ceil((Math.random() * 100)) % users.length;
    const inputData = {
      name: faker.commerce.productName(),
      location: faker.address.streetName(),
      // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      manager: users[uIndex].id,
      createdAt: new Date()
    };
    const { data: { data: { createSite }, error } } = await request({
      query: CREATE_SITE,
      variables: {
        data: inputData
      }
    });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(error).toBeUndefined();
    const { id, count, createdAt, updatedAt, ...rest } = createSite;
    const siteTotalRepeater = {
      quantity: 0,
      cost: 0
    };
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(rest).toMatchObject({
      name: inputData.name,
      location: inputData.location,
      entries: [],
      entryCount: 0,
      manager: {
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        id: users[uIndex].id,
        // @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        name: users[uIndex].username
      },
      managerSpentAmount: 0,
      cost: 0,
      total: {
        mistri: siteTotalRepeater,
        labour: siteTotalRepeater,
        eit: siteTotalRepeater,
        morang: siteTotalRepeater,
        baalu: siteTotalRepeater,
        githi: siteTotalRepeater,
        cement: siteTotalRepeater,
        saria: siteTotalRepeater,
        dust: siteTotalRepeater,
        other: 0,
        other2: 0
      },
      // createdAt: inputData.createdAt,
      // updatedAt: inputData.createdAt,
    });
    site = createSite;
  });
  // @ts-expect-error TS(2582): Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
  test('updateSite', async () => {
    // @ts-expect-error TS(2339): Property 'length' does not exist on type '{}'.
    const uIndex = Math.ceil((Math.random() * 100)) % users.length;
    const inputData = {
      name: faker.commerce.productName(),
      location: faker.address.streetName(),      
    };
    const { data: { data: { updateSite }, error } } = await request({
      query: UPDATE_SITE,
      variables: {
        // @ts-expect-error TS(2339): Property 'id' does not exist on type '{}'.
        id: site.id,
        data: inputData
      }
    });
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(error).toBeUndefined();
    const { id, count, createdAt, updatedAt, ...rest } = updateSite;
    const siteTotalRepeater = {
      quantity: 0,
      cost: 0
    };
    // @ts-expect-error TS(2304): Cannot find name 'expect'.
    expect(rest).toMatchObject({
      name: inputData.name,
      location: inputData.location,
      entries: [],
      entryCount: 0,
      manager: {
        // @ts-expect-error TS(2339): Property 'manager' does not exist on type '{}'.
        id: site.manager.id,
        // @ts-expect-error TS(2339): Property 'manager' does not exist on type '{}'.
        name: site.manager.name
      },
      managerSpentAmount: 0,
      cost: 0,
      total: {
        mistri: siteTotalRepeater,
        labour: siteTotalRepeater,
        eit: siteTotalRepeater,
        morang: siteTotalRepeater,
        baalu: siteTotalRepeater,
        githi: siteTotalRepeater,
        cement: siteTotalRepeater,
        saria: siteTotalRepeater,
        dust: siteTotalRepeater,
        other: 0,
        other2: 0
      },
      // createdAt: inputData.createdAt,
      // updatedAt: inputData.createdAt,
    });
  })
});