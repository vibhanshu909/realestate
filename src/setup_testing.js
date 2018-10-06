import seed from './models/seeds/test_user';
import { Users } from './connectors/users';
import { mongoose } from './config/main';

(async function init() {
    console.log('resetting collections');
    await Users.model.remove({});
    console.log('database reset done!');
    await seed();
    mongoose.disconnect();
})();