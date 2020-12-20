module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: Sequelize.STRING(128),
            allowNull: false,
            primaryKey: false
        },
        password: {
            type: Sequelize.STRING(128),
            allowNull: false,
            primaryKey: false
        },
        name: {
            type: Sequelize.STRING(45),
            allowNull: false,
            primaryKey: false
        },
        email: {
            type: Sequelize.STRING(128),
            allowNull: false,
            primaryKey: false,
            validate: {
                isEmail:true
            }
        },
        lastOnline: { 
            type: Sequelize.DATE,
            allowNull: false,
            primaryKey: false,
        },
        registrDate: { 
            type: Sequelize.DATE,
            allowNull: false,
            primaryKey: false,
        },
        blocked: { 
            type: Sequelize.BOOLEAN,
            allowNull: false,
            primaryKey: false,
            defaultValue: 0
        },
        checked: { 
            type: Sequelize.BOOLEAN,
            allownNull: false,
            primaryKey: false,
            defaultValue: false,
        }, 
        online: { 
            type: Sequelize.BOOLEAN,
            allownNull: false,
            primaryKey: false,
            defaultValue: false,
        },
    }, {
        timestamps: false,
    });

    return User;

}