const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL);

//Models
const Product = conn.define('product', {
  name : {
    type: Sequelize.STRING,
    allowNull : false,
    validate : {
      notEmpty : true 
    }
  },
  sku : {
    type : Sequelize.INTEGER,
    allowNull : false
  }
});

const Order = conn.define('order', {
  number : {
    type : Sequelize.STRING,
    allowNull : false
  }
});

const Customer = conn.define('customer', {
  name : {
    type : Sequelize.STRING,
    allowNull : false
  }
});

//Associations
Order.hasMany(Product);
Order.belongsTo(Customer);
Customer.hasMany(Order);

//sync and seed your data

const syncAndSeed = () => {
  let plant, soil, water, jessica, A001;
  return conn.sync({ force:true })
    .then(() => Promise.all([
      Product.create({ name : 'plant', sku : 001 }),
      Product.create({ name : 'soil', sku : 002 }),
      Product.create({ name : 'water', sku : 003 }),
    ]))
    .then(products => {
      [ plant, soil, water ] = products;
      return Promise.all([
        Customer.create({ name : 'Jessica Munoz' })
      ]);
    })
    .then(customer => {
      [ jessica ] = customer;
      return Promise.all([
        Order.create({ number : 1 })
      ]);
    })
    .then(order => {
      [ A001 ] = order;
      return Promise.all([
        A001.setCustomer(jessica)
        /*
        plant.setOrder(A001),
        soil.setOrder(A001),
        water.setOrder(A001)
        */
      ]);
    });
};

syncAndSeed()

module.exports = { 
  conn,
  Product,
  Order,
  Customer,
  syncAndSeed
}