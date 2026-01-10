import mongoose from "mongoose";
import slugify from "slugify";

const brandSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      unique: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 500,
    },
    logo: {
      type: String,
      default: null,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
  }, { timestamps: true }
);

brandSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

const Brand = mongoose.model("Brand", brandSchema);

export default Brand;