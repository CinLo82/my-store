const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }

  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
      });
    }
  }

  find(correct = true) {
    return new Promise((resolve, reject) => {
      if(!correct) reject(boom.internal('Error interno'));
      setTimeout(() => {
        resolve(this.users);
      }, 2000);
    })
  }

  async create(data) {
    const {name, lastname, email} = data;
    const newUser = {
      id: faker.datatype.uuid(),
      name,
      lastname,
      email
    }
    this.users.push(newUser);
    return newUser;
  }

  async findOne(id) {
    const user = this.users.find(item => item.id === id);
    if (!user) {
     throw boom.notFound('user not found');
    }
    return user;
  }

  async update(id, changes) {
    const index = this.users.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes
    };
    return this.users[index];
  }

  async delete(id) {
  const index = this.users.findIndex(item => item.id === id);
  if (index === -1) {
    throw boom.notFound('user not found');
  }
  this.users.splice(index, 1);
  return { id };
  }
};


module.exports = UsersService;
