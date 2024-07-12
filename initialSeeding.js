const User = require("./models/User");
const { getHashedString } = require("./helpers/bcrypt");
const Category = require("./models/Category");

const createIfNotExists = async (Model, query, data) => {
  const existingItem = await Model.findOne(query);
  if (!existingItem) {
    await Model.create(data);
  }
};

const initialSeeding = async () => {
  await createIfNotExists(
    User,
    { username: "superadmin" },
    {
      username: "superadmin",
      password: getHashedString("123"),
      role: "admin",
    }
  );

  await createIfNotExists(
    User,
    { username: "officer" },
    {
      username: "officer",
      password: getHashedString("123"),
      role: "officer",
    }
  );

  await createIfNotExists(
    User,
    { username: "publisher" },
    {
      username: "publisher",
      password: getHashedString("123"),
      role: "publisher",
    }
  );

  await createIfNotExists(
    Category,
    { name: "others" },
    {
      name: "others",
    }
  );

  await createIfNotExists(
    Category,
    { name: "Potholes" },
    {
      name: "Potholes",
    }
  );

  await createIfNotExists(
    Category,
    { name: "Unclean Location" },
    {
      name: "Unclean Location",
    }
  );
};

module.exports = initialSeeding;
