const mongoose = require("mongoose");
const slugify = require("slugify");

const marked = require("marked");
const createDOMPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const DOMPurify = createDOMPurify(new JSDOM("").window);

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdown: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});
//click edit xem link use slug use-link, now use params.id
articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  if (this.markdown) {
    this.sanitizedHtml = DOMPurify.sanitize(marked(this.markdown));
  }
  next();
});
// thao tac lưu tren db ten Article
module.exports = mongoose.model("Article", articleSchema);
