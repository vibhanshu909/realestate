import faker from 'faker';
import login, { request } from './login';
import { USERS_USERNAME } from './graphql/query/remote';
import {
  CREATE_SITE,
  UPDATE_SITE,
} from './graphql/mutation/remote'


describe('site', () => {
  login();
  let users = {};
  describe('query', () => {
    test('users', async () => {
      const { data: { data: { users: us } } } = await request({
        query: USERS_USERNAME
      });
      expect(us).toBeInstanceOf(Array);
      users = us;
    });
  });
  let site = {};
  test('createSite', async () => {
    const uIndex = Math.ceil((Math.random() * 100)) % users.length;
    const inputData = {
      name: faker.commerce.productName(),
      location: faker.address.streetName(),
      manager: users[uIndex].id,
      createdAt: new Date()
    };
    const { data: { data: { createSite }, error } } = await request({
      query: CREATE_SITE,
      variables: {
        data: inputData
      }
    });
    expect(error).toBeUndefined();
    const { id, count, createdAt, updatedAt, ...rest } = createSite;
    const siteTotalRepeater = {
      quantity: 0,
      cost: 0
    };
    expect(rest).toMatchObject({
      name: inputData.name,
      location: inputData.location,
      entries: [],
      entryCount: 0,
      manager: {
        id: users[uIndex].id,
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
  test('updateSite', async () => {
    const uIndex = Math.ceil((Math.random() * 100)) % users.length;
    const inputData = {
      name: faker.commerce.productName(),
      location: faker.address.streetName(),      
    };
    const { data: { data: { updateSite }, error } } = await request({
      query: UPDATE_SITE,
      variables: {
        id: site.id,
        data: inputData
      }
    });
    expect(error).toBeUndefined();
    const { id, count, createdAt, updatedAt, ...rest } = updateSite;
    const siteTotalRepeater = {
      quantity: 0,
      cost: 0
    };
    expect(rest).toMatchObject({
      name: inputData.name,
      location: inputData.location,
      entries: [],
      entryCount: 0,
      manager: {
        id: site.manager.id,
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