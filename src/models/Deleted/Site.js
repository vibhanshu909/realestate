import { mongoose } from '../../config/main';
import { SchemaObject } from '../Site';

var Schema = mongoose.Schema;

const SiteSchema = Schema(SchemaObject, {
  timestamps: true
});

const Site = mongoose.model("DeletedSite", SiteSchema);
export default Site;
