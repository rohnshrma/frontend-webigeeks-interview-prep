// Sources: MongoDB docs, Mongoose docs, GeeksForGeeks, auth0.com

export const mongodbQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'mdb-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is MongoDB and how does it differ from SQL databases?',
    answer:'MongoDB is a NoSQL document database that stores data as BSON (Binary JSON) documents in collections. Key differences from SQL: (1) No fixed schema — each document can have different fields, (2) No JOINs — related data is embedded or looked up with $lookup aggregation, (3) Horizontal scaling (sharding) built-in, (4) Flexible for rapidly evolving data models. SQL excels for relational data with complex JOINs; MongoDB for flexible, hierarchical, or high-volume data.' },

  { id:'mdb-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What is a Document in MongoDB and what is a Collection?',
    answer:'A Document is a BSON record — similar to a JSON object with key-value pairs. It can contain nested objects and arrays. Every document gets an auto-generated _id (ObjectId) as a unique identifier. A Collection is a group of documents — analogous to a SQL table, but without an enforced schema. A Database contains multiple collections.' },

  { id:'mdb-f3', experienceLevel:'fresher', type:'practical',
    question:'How do you perform a basic CRUD operation in MongoDB shell or a Node.js driver?',
    code:"// Create:\ndb.users.insertOne({ name: 'Priya', age: 25, city: 'Mumbai' });\n\n// Read:\ndb.users.find({ age: { $gt: 20 } });\ndb.users.findOne({ name: 'Priya' });\n\n// Update:\ndb.users.updateOne(\n  { name: 'Priya' },\n  { $set: { city: 'Pune' } }\n);\n\n// Delete:\ndb.users.deleteOne({ name: 'Priya' });",
    answer:'The four basic MongoDB operations — insertOne, find/findOne, updateOne ($set), deleteOne.' },

  { id:'mdb-f4', experienceLevel:'fresher', type:'output',
    question:'Guess what the _id field contains in a newly inserted document',
    code:"db.users.insertOne({ name: 'Arjun' });",
    output:'{ _id: ObjectId("507f1f77bcf86cd799439011"), name: "Arjun" }',
    explanation:'MongoDB auto-generates a 12-byte ObjectId encoding: 4-byte timestamp, 5-byte random, 3-byte counter. It encodes insertion time so documents are naturally chronologically sortable.',
    choices:[
      { label:'An ObjectId (12-byte BSON type with timestamp)', correct:true },
      { label:'An auto-incrementing integer like SQL', correct:false },
      { label:'A UUID v4 string', correct:false },
      { label:'The operation fails — _id is required', correct:false }] },

  { id:'mdb-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What are MongoDB comparison query operators? Give examples.',
    answer:'Comparison operators filter documents in find()/updateOne(): $eq (equal), $ne (not equal), $gt (greater than), $gte (≥), $lt (less than), $lte (≤), $in (value in array), $nin (not in array). These are placed inside the field value object: { age: { $gte: 18, $lte: 65 } }.',
    code:'// Age between 18 and 65:\ndb.users.find({ age: { $gte: 18, $lte: 65 } });\n// Status is "active" or "pending":\ndb.orders.find({ status: { $in: ["active", "pending"] } });' },

  { id:'mdb-f6', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between find() and findOne()?',
    answer:'find() returns a cursor (lazy iterable) of ALL matching documents — you iterate it or call .toArray(). findOne() returns the first matching document directly or null if not found. Use findOne() when you know there is at most one result (e.g., lookup by _id or unique email). find() is for lists that need pagination or sorting.' },

  { id:'mdb-f7', experienceLevel:'fresher', type:'practical',
    question:'How do you sort and limit results in MongoDB?',
    code:'// Sort by age descending, return first 10:\ndb.users.find().sort({ age: -1 }).limit(10);\n\n// Pagination: skip first 20, get next 10:\ndb.users\n  .find({ active: true })\n  .sort({ createdAt: -1 })\n  .skip(20)\n  .limit(10);',
    answer:'Chain .sort(), .skip(), .limit() on the cursor. Note: skip() is inefficient on large collections — use cursor-based pagination (_id > lastSeenId) for production.' },

  { id:'mdb-f8', experienceLevel:'fresher', type:'conceptual',
    question:'What are the MongoDB update operators $set, $unset, $push, $pull, $inc?',
    answer:'$set: sets field value (or creates if missing). $unset: removes a field. $push: appends to an array. $pull: removes matching elements from an array. $inc: increments a numeric field by a given amount. $addToSet: adds to array only if value not already present. Always use these operators in update — without them, updateOne replaces the ENTIRE document.' },

  { id:'mdb-f9', experienceLevel:'fresher', type:'output',
    question:'Guess the result of this update without an operator',
    code:"db.users.updateOne(\n  { name: 'Ali' },\n  { age: 30 }  // ← no $set!\n);",
    output:'The document becomes { _id: ObjectId(...), age: 30 } — the name field is DELETED',
    explanation:'Without $set, updateOne replaces the entire document content with the new object (except _id). Use $set: { age: 30 } to update only the age field.',
    choices:[
      { label:'Document becomes { _id:..., age:30 } — name deleted', correct:true },
      { label:'Only age is updated, name is preserved', correct:false },
      { label:'Error — update requires an operator', correct:false },
      { label:'No change — bare objects are ignored', correct:false }] },

  { id:'mdb-f10', experienceLevel:'fresher', type:'conceptual',
    question:'What does the upsert option do in MongoDB?',
    answer:'upsert: true in updateOne/updateMany means: if a matching document is found, update it; if NOT found, create a new document with the filter criteria plus the update. It\'s atomic — no race condition between check and insert.',
    code:"db.products.updateOne(\n  { sku: 'CABLE-001' },\n  { $set: { price: 499, stock: 50 } },\n  { upsert: true }\n);\n// If sku CABLE-001 doesn't exist, it's created with price+stock" },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'mdb-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is the MongoDB aggregation pipeline and what are the most common stages?',
    answer:'The aggregation pipeline processes documents through sequential stages, each transforming the data. Common stages: $match (filter documents — put early for performance), $group (group by field, compute accumulators like $sum, $avg, $count), $project (include/exclude/compute fields), $sort, $limit, $skip, $lookup (left outer join to another collection), $unwind (deconstruct array field into separate documents), $addFields.' },

  { id:'mdb-j2', experienceLevel:'junior', type:'practical',
    question:'Write an aggregation to get total revenue per product category.',
    code:"db.orders.aggregate([\n  { $match: { status: 'completed' } },\n  { $group: {\n    _id: '$category',\n    totalRevenue: { $sum: { $multiply: ['$price', '$quantity'] } },\n    orderCount: { $sum: 1 },\n    avgOrderValue: { $avg: '$price' }\n  }},\n  { $sort: { totalRevenue: -1 } },\n  { $project: {\n    category: '$_id',\n    totalRevenue: 1,\n    orderCount: 1,\n    _id: 0\n  }}\n]);",
    answer:'Use $match early to filter, $group for aggregation, $sort for ordering, $project to reshape output.' },

  { id:'mdb-j3', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between embedding and referencing in MongoDB schema design?',
    answer:'Embedding: store related data inside the parent document — one query gets everything. Best for data read together often, one-to-few, not shared elsewhere. Referencing: store the related document\'s _id, use $lookup or populate to join. Best for: many-to-many, large sub-documents, data updated independently, data shared by many parents. Rule: embed for read performance; reference for write flexibility.' },

  { id:'mdb-j4', experienceLevel:'junior', type:'practical',
    question:'How do you use $lookup to join two collections?',
    code:'// Get all orders with full user details:\ndb.orders.aggregate([\n  { $lookup: {\n    from: "users",       // collection to join\n    localField: "userId", // order field\n    foreignField: "_id",  // user field\n    as: "user"           // output array field\n  }},\n  { $unwind: "$user" }, // convert array to object\n  { $project: {\n    orderId: 1, amount: 1,\n    "user.name": 1, "user.email": 1\n  }}\n]);',
    answer:'$lookup is MongoDB\'s LEFT OUTER JOIN. $unwind flattens the joined array for one-to-one relationships.' },

  { id:'mdb-j5', experienceLevel:'junior', type:'conceptual',
    question:'What are MongoDB indexes and how do you decide which fields to index?',
    answer:'Indexes are data structures that enable fast query lookups without full collection scans. Creating an index: createIndex({ field: 1 }) (1=ascending, -1=descending). Index when a field appears in: WHERE-equivalent conditions, sort clauses, $lookup foreign keys. ESR Rule for compound indexes: Equality fields first, Sort fields second, Range fields last. Over-indexing hurts write performance — each write must update every index.' },

  { id:'mdb-j6', experienceLevel:'junior', type:'output',
    question:'Guess what explain() shows for this query on a collection without an index on age',
    code:"db.users.find({ age: { $gt: 25 } }).explain('executionStats');",
    output:'"COLLSCAN" (Collection Scan) — scans every document in the collection. totalDocsExamined equals total collection size. Very slow for large collections.',
    explanation:'Without an index on age, MongoDB must examine every single document. After adding createIndex({age:1}), it becomes IXSCAN.',
    choices:[
      { label:'COLLSCAN — full collection scan (slow)', correct:true },
      { label:'IXSCAN — index scan (fast)', correct:false },
      { label:'The query is cached automatically', correct:false },
      { label:'Error — explain() not supported', correct:false }] },

  // ── MID ─────────────────────────────────────────
  { id:'mdb-m1', experienceLevel:'mid', type:'conceptual',
    question:'What are MongoDB transactions and when do you need them?',
    answer:'Multi-document transactions provide ACID properties across multiple operations in the same or different collections. Needed when: performing multiple writes that must succeed or fail together (e.g., deducting inventory AND creating an order record). Before transactions (MongoDB < 4.0), the schema design philosophy was to embed related data to keep operations on single documents atomic. Transactions are slower than single-document operations — design schema to minimise their need.' },

  { id:'mdb-m2', experienceLevel:'mid', type:'practice',
    question:'How do you implement multi-document transactions with Mongoose?',
    code:"const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await Product.updateOne(\n    { _id: productId, stock: { $gte: quantity } },\n    { $inc: { stock: -quantity } },\n    { session }\n  );\n  await Order.create([{ userId, productId, quantity }], { session });\n  await session.commitTransaction();\n} catch (err) {\n  await session.abortTransaction();\n  throw err;\n} finally {\n  session.endSession();\n}",
    answer:'Pass the session to every operation. Abort on any error to roll back all changes.' },

  { id:'mdb-m3', experienceLevel:'mid', type:'conceptual',
    question:'What is the difference between sharding and replication in MongoDB?',
    answer:'Replication: multiple copies of the same data across a replica set (primary + secondaries). Provides high availability — automatic failover if primary goes down. Reads can be distributed to secondaries. Sharding: partitions data across multiple servers (shards) by a shard key. Provides horizontal scaling for write throughput and storage beyond a single node. Production MongoDB: always use replication (replica sets). Use sharding when a single replica set exceeds capacity.' },

  { id:'mdb-m4', experienceLevel:'mid', type:'conceptual',
    question:'What is a MongoDB partial index and when would you use it?',
    answer:'A partial index only indexes documents that match a filter expression — smaller index, faster writes, lower memory usage. Example: create a unique index on email but only for active users (inactive users may have same placeholder). Or index only documents where a field exists.',
    code:"db.users.createIndex(\n  { email: 1 },\n  {\n    unique: true,\n    partialFilterExpression: { status: 'active' }\n  }\n);\n// Only active users are in the index — unique constraint applies only to them" },
];

export const mongooseQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'mong-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is Mongoose and what problem does it solve?',
    answer:'Mongoose is an ODM (Object Data Modeling) library for MongoDB in Node.js. It adds: (1) Schema definition with type validation, default values, required fields, (2) Model layer with CRUD methods, (3) Middleware hooks (pre-save, post-save, pre-find), (4) Query helpers and plugins, (5) Virtuals (computed fields not stored in DB), (6) Population (reference resolution). MongoDB is schema-less; Mongoose adds structure at the application layer.' },

  { id:'mong-f2', experienceLevel:'fresher', type:'practical',
    question:'How do you define a Mongoose schema and model?',
    code:"import mongoose from 'mongoose';\n\nconst userSchema = new mongoose.Schema({\n  name:      { type: String, required: true, trim: true },\n  email:     { type: String, required: true, unique: true, lowercase: true },\n  password:  { type: String, required: true, minlength: 8 },\n  role:      { type: String, enum: ['user', 'admin'], default: 'user' },\n  createdAt: { type: Date, default: Date.now },\n}, {\n  timestamps: true, // auto-manages createdAt and updatedAt\n});\n\nexport const User = mongoose.model('User', userSchema);",
    answer:'Schema defines structure; mongoose.model() compiles it into a model class that maps to a MongoDB collection.' },

  { id:'mong-f3', experienceLevel:'fresher', type:'output',
    question:'Guess what happens when you create a user without the required email',
    code:"await User.create({ name: 'Rahul', password: 'abc12345' });",
    output:'Throws ValidationError: Path `email` is required.',
    explanation:'Mongoose validates documents before sending to MongoDB. The create() call never reaches the database.',
    choices:[
      { label:'Throws ValidationError: email is required', correct:true },
      { label:'Document saves with null email', correct:false },
      { label:'MongoDB rejects it at DB level', correct:false },
      { label:'No error — email is optional after validation', correct:false }] },

  { id:'mong-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between Model.save() and Model.create()?',
    answer:'Model.create({...}) is a shortcut that instantiates a document and calls .save() on it. new Model({...}).save() gives you a chance to modify the instance before saving, and triggers all pre/post save middleware. create() also accepts an array for bulk insertion. Use create() for simple inserts; use new Model + save() when you need to conditionally modify the document before saving (e.g., password hashing hook).' },

  { id:'mong-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between findById() and findOne()?',
    answer:'findById(id) is shorthand for findOne({ _id: id }). It accepts both ObjectId and string (auto-converts). findOne(filter) accepts any query object. Use findById() when you have the document\'s _id; use findOne() for lookups by other unique fields like email. Both return null if not found.' },

  { id:'mong-f6', experienceLevel:'fresher', type:'practical',
    question:'How do you connect Mongoose to MongoDB?',
    code:"import mongoose from 'mongoose';\n\nasync function connectDB() {\n  try {\n    await mongoose.connect(process.env.MONGO_URI);\n    console.log('MongoDB connected');\n  } catch (err) {\n    console.error('MongoDB connection error:', err);\n    process.exit(1);\n  }\n}\n\n// Listen for connection events:\nmongoose.connection.on('disconnected', connectDB); // auto-reconnect\n\nconnectDB();",
    answer:'Use async/await with process.exit(1) on failure so the server doesn\'t start without a DB. Mongoose handles connection pooling internally.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'mong-j1', experienceLevel:'junior', type:'practical',
    question:'How do you implement a pre-save hook to hash a password before storing it?',
    code:"import bcrypt from 'bcrypt';\n\nuserSchema.pre('save', async function (next) {\n  // Only hash if password was modified (not on other updates)\n  if (!this.isModified('password')) return next();\n  try {\n    const salt = await bcrypt.genSalt(10);\n    this.password = await bcrypt.hash(this.password, salt);\n    next();\n  } catch (err) {\n    next(err);\n  }\n});\n\n// Instance method to compare password:\nuserSchema.methods.comparePassword = async function (plain) {\n  return bcrypt.compare(plain, this.password);\n};",
    answer:'Always check isModified() in pre-save to avoid re-hashing an already-hashed password on unrelated updates.' },

  { id:'mong-j2', experienceLevel:'junior', type:'conceptual',
    question:'What is Mongoose populate and how does it work?',
    answer:'populate() replaces a reference ID (ObjectId) with the actual document from another collection. It works when a schema field uses ref: "ModelName". Under the hood, Mongoose runs a second find() query on the referenced collection. Populate is NOT a JOIN — it is a separate round-trip. For performance-critical paths, use $lookup in aggregation or consider embedding.',
    code:"const postSchema = new mongoose.Schema({\n  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },\n  title:  String,\n});\n\n// Usage:\nconst post = await Post.findById(id).populate('author', 'name email');\n// post.author is now the full User document (only name & email fields)" },

  { id:'mong-j3', experienceLevel:'junior', type:'conceptual',
    question:'What are Mongoose virtuals and when would you use them?',
    answer:'Virtuals are computed properties that are NOT stored in MongoDB but are available as model instance properties. Common uses: fullName (combining firstName + lastName), age (computed from birthDate), profileUrl (combining base URL with userId). Enable virtuals in JSON output with { toJSON: { virtuals: true } } in the schema options.',
    code:"userSchema.virtual('fullName').get(function () {\n  return `${this.firstName} ${this.lastName}`;\n});\n\nconst user = await User.findById(id);\nconsole.log(user.fullName); // 'Priya Sharma'\n// Not in MongoDB — computed on the fly" },

  { id:'mong-j4', experienceLevel:'junior', type:'output',
    question:'Guess what findByIdAndUpdate returns by default',
    code:"const user = await User.findByIdAndUpdate(\n  id,\n  { $set: { name: 'New Name' } }\n);",
    output:'The OLD document (before the update) — { name: "Old Name", ... }',
    explanation:'By default, findByIdAndUpdate returns the document as it was BEFORE the update. Add { new: true } option to get the updated document.',
    choices:[
      { label:'The old document (before update)', correct:true },
      { label:'The new updated document', correct:false },
      { label:'null', correct:false },
      { label:'The update result object { acknowledged: true, ... }', correct:false }] },

  { id:'mong-j5', experienceLevel:'junior', type:'practical',
    question:'How do you perform pagination with Mongoose?',
    code:"// Offset-based pagination (simple but slow on large collections):\nasync function getPaginatedUsers(page = 1, limit = 10) {\n  const skip = (page - 1) * limit;\n  const [users, total] = await Promise.all([\n    User.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),\n    User.countDocuments(),\n  ]);\n  return {\n    users,\n    total,\n    page,\n    pages: Math.ceil(total / limit),\n    hasNext: page * limit < total,\n  };\n}",
    answer:'Promise.all() runs the data query and count query in parallel. .lean() returns plain JS objects instead of Mongoose documents — faster for read-only operations.' },

  // ── MID ─────────────────────────────────────────
  { id:'mong-m1', experienceLevel:'mid', type:'conceptual',
    question:'What are Mongoose plugins and how do you create one?',
    answer:'Plugins are reusable schema extensions — add them to multiple schemas without repeating code. Common use cases: soft-delete (add deletedAt field), audit trail (track who changed what), paginate (add static paginate() method), toJSON transformations.',
    code:"// Soft-delete plugin:\nfunction softDeletePlugin(schema) {\n  schema.add({ deletedAt: { type: Date, default: null } });\n  schema.methods.softDelete = function () {\n    this.deletedAt = new Date();\n    return this.save();\n  };\n  schema.statics.findActive = function (filter = {}) {\n    return this.find({ ...filter, deletedAt: null });\n  };\n}\n\nuserSchema.plugin(softDeletePlugin);\npostSchema.plugin(softDeletePlugin);" },

  { id:'mong-m2', experienceLevel:'mid', type:'practical',
    question:'How do you use Mongoose discriminators for a polymorphic schema?',
    code:"const baseSchema = new mongoose.Schema(\n  { title: String, createdBy: mongoose.Schema.Types.ObjectId },\n  { discriminatorKey: 'kind' }\n);\nconst Event = mongoose.model('Event', baseSchema);\n\nconst Webinar = Event.discriminator('Webinar',\n  new mongoose.Schema({ meetingUrl: String })\n);\nconst Conference = Event.discriminator('Conference',\n  new mongoose.Schema({ venue: String, capacity: Number })\n);\n\n// All stored in 'events' collection with kind field for discrimination\nawait Webinar.create({ title: 'React Deep Dive', meetingUrl: 'https://...' });",
    answer:'Discriminators let multiple types share one collection, with a kind field for type identification.' },

  { id:'mong-m3', experienceLevel:'mid', type:'conceptual',
    question:'How do you optimize a Mongoose application that\'s making too many database queries?',
    answer:'Strategies: (1) Use .lean() for read-only queries — skips Mongoose document hydration, 2-3× faster. (2) Select only needed fields: .select("name email"). (3) Populate only when needed — prefer $lookup in aggregation for complex joins. (4) Use indexes on query fields (explain() for verification). (5) Batch queries with $in instead of N individual queries. (6) Use countDocuments() for counts, not .find().length. (7) Cache frequent queries with Redis.' },
];
