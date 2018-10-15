import { mongoose } from '../../config/main';
import { SchemaObject } from '../Property';

var Schema = mongoose.Schema;

const PropertySchema = Schema(SchemaObject, {
  timestamps: true
});

const Property = mongoose.model("DeletedProperty", PropertySchema);
export default Property;
