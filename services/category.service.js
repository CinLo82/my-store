const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const pool = require('./../libs/postgrest.pool');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err));
  }

  generate() {
    const limit = 10;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
        clas: faker.commerce.productAdjective(),
      });
    }
  }


  create(data) {
    const { name, clas } = data;
    const newCategory = {
      categoryId: faker.datatype.uuid(),
      name,
      clas
    }
    this.categories.push(newCategory);
    return newCategory;

  }

  async find() {
    const query = 'SELECT * FROM tasks';
    const rta = await this.pool.query(query);
    return rta.rows;
  }

   async findOne(id) {
    const category = this.categories.find(item => item.id === id);
    if (!category) {
     throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
    }
    const category = this.categories[index];
    this.categories[index] = {
      ...category,
      ...changes
    };
    return this.categories[index];
  }

  async delete(id) {
    const index = this.categories.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('category not found');
  }
  this.categories.splice(index, 1);
  return { id };
  }


};

module.exports = CategoriesService;
