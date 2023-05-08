const User = require("./user")
const Game = require("./game")
function createAssociations() {
     // User.belongsTo(Game, {onDelete:'CASCADE'});
     // Game.hasMany(User, {foreignKey: 'userId', constraints:});
     User.hasMany(Game, { foreignKey: 'userId', onDelete: 'CASCADE' });
     Game.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
}

module.exports = createAssociations