import { mongoose } from '../../config/main';
import { SchemaObject } from '../SiteEntry';

var Schema = mongoose.Schema;

const SiteEntrySchema = Schema(SchemaObject, {
  timestamps: true
});

const SiteEntry = mongoose.model("DeletedSiteEntry", SiteEntrySchema);
export default SiteEntry;
