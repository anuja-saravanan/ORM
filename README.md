# ORM
**BASIC ORM**
✅ 1. Project Setup

mkdir sequelize-mysql-tutorial
cd sequelize-mysql-tutorial
npm init -y

**Install Required Packages:
**
npm install express sequelize mysql2
npm install --save-dev sequelize-cli

✅ 2. Initialize Sequelize Project

npx sequelize-cli init
This creates:
config/config.json
models/
migrations/
seeders/

✅ 3. Configure MySQL Connection
Edit config/config.json for development:

json
Copy
Edit
"development": {
  "username": "root",
  "password": "your_mysql_password",
  "database": "sequelize_demo",
  "host": "127.0.0.1",
  "dialect": "mysql"
}
✅ 4. Create the Database
In MySQL:

sql
Copy
Edit
CREATE DATABASE sequelize_demo;
✅ 5. Create a Model + Migration
Create a User model:

npx sequelize-cli model:generate --name User --attributes name:string,email:string


Then run migration:
npx sequelize-cli db:migrate

✅ 6. Express App Setup
Create index.js:

const express = require('express');
const { User } = require('./models');
const app = express();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

✅ 7. Run the App

node index.js
Test endpoints using Postman or curl:

GET:
http://localhost:3000/users
POST:
http://localhost:3000/users
{
  "name": "Anuja",
  "email": "anuja@gmail.com"
}

Add another model Post:

npx sequelize-cli model:generate --name Post --attributes title:string,content:text,userId:integer
Edit models: add foreignkey

// models/user.js
User.associate = models => {
  User.hasMany(models.Post, { foreignKey: 'userId' });
};

// models/post.js
Post.associate = models => {
  Post.belongsTo(models.User, { foreignKey: 'userId' });
};
Then:
npx sequelize-cli db:migrate
✅ 9. Folder Structure Summary
pgsql
Copy
Edit
sequelize-mysql-tutorial/
├── config/
│   └── config.json
├── models/
│   ├── index.js
│   ├── user.js
│   └── post.js
├── migrations/
├── seeders/
└── index.js


User.associate = models => {
  User.hasMany(models.Post, { foreignKey: 'user_id' });
};
In models/post.js:
Post.associate = models => {
  Post.belongsTo(models.User, { foreignKey: 'user_id' });
};


Example:
Let’s say you want to add a phone column to the Users table.


npx sequelize-cli migration:generate --name add-phone-to-users
Update your model (models/user.js):
phone: {
  type: DataTypes.STRING,
  allowNull: true,
}

Then run:
npx sequelize-cli db:migrate








