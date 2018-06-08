const express = require('express')
const mysql = require('mysql')
const config = require('../../config')
var Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
var db = new Sequelize(config.local.database, config.local.username, config.local.password, {

    host: 'localhost',
    port: '3307',
    dialect: 'mysql',
    charset: 'utf8',
    collate: 'utf8_general_ci',
    operatorsAliases: false,
    timestamps: false,
    // To create a pool of connections
    pool: {
        max: 5,
        min: 0,
        idle: 10000

    },
});

const Account = db.define('account', {
    id: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(50),
        primaryKey: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

const Category = db.define('category', {
    categoryid: {
        type: Sequelize.STRING,
        allowNull: false
    },
    categoryname: {
        type: Sequelize.STRING(80),
        primaryKey: true
    }

})
const Product = db.define('product', {
    productid: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    productname: {
        type: Sequelize.STRING(80),
    },
    price: {
        type: Sequelize.FLOAT()
    },
    detail: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.CHAR(3)
    },
    typeproduct: {
        type: Sequelize.CHAR(1)
    },
    statusid: {
        type: Sequelize.STRING(1)
    },
})
const Order = db.define('order', {
    orderid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    ordername: {
        type: Sequelize.STRING
    },
    totalprice: {
        type: Sequelize.FLOAT
    },
    discount: {
        type: Sequelize.FLOAT
    },
    remark: {
        type: Sequelize.STRING
    }
})
const OrderDetail = db.define('orderdetail', {
    orderdetailid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    unitprice: {
        type: Sequelize.FLOAT
    }
})
const Seller = db.define('seller', {
    sellerid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    sellername: {
        type: Sequelize.STRING
    }

})
const ProductImage = db.define('productimage', {
    productimgid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    productimgname: {
        type: Sequelize.BLOB
    },
    typeimage: {
        type: Sequelize.STRING
    }
})
const Transaction = db.define('transaction', {
    tranid: {
        type: Sequelize.STRING
    },
    tranname: {
        type: Sequelize.STRING,
        primaryKey: true
    }
})
const loginAdmin = db.define('loginadmin', {
    adminid: {
        type: Sequelize.STRING,
    },
    adminusername: {
        type: Sequelize.STRING(20),
        primaryKey: true
    },
    adminpassword: {
        type: Sequelize.STRING(20)
    }
})
/*const Status = db.require('status',{
    statusid
})*/


Category.hasMany(Product, { foreignKey: 'categoryid' })
Product.hasMany(ProductImage, { foreignKey: 'productid' })
Order.belongsTo(Account, { foreignKey: 'email' })
OrderDetail.belongsTo(Product, { foreignKey: 'productid' })
Order.hasMany(OrderDetail, { foreignKey: 'orderid' })
Seller.hasMany(Product, { foreignKey: 'sellerid' })
//Transaction.hasOne(Account, { foreignKey: 'tranname' })
Transaction.belongsTo(Account, { foreignKey: 'email' })


Account.prototype.isValidPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}
/*db.sync({ force: true })
    .then(() => console.log("Database to connect"))
    .catch((err) => console.error(err))*/
module.exports = {
    Account, Category, Product, Seller, ProductImage, loginAdmin,Transaction
}
