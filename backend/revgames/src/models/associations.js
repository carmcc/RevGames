const User = require("./user")
const Game = require("./game")
const Review = require("./review")
function createAssociations() {

    User.hasMany(Review, { foreignKey: 'userId' });
    Review.belongsTo(User, { foreignKey: 'userId' });

    Game.hasMany(Review, { foreignKey: 'gameId'});
    Review.belongsTo(Game, { foreignKey: 'gameId'});
}

module.exports = createAssociations