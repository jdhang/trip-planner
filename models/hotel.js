'use strict'

module.exports = function (db, Sequelize) {
  let Hotel = db.define('hotel', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    num_stars: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        betweenRange: function (value) {
          if (value < 1 || value > 5)
            throw new Error('Value must be between 1 and 5')
        }
      }
    },
    amenities: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      get: function () {
        let amenities = this.getDataValue('amenities')
        if (amenities === 'undefined') return []
        else return amenities.join(', ')
      },
      set: function (amenities) {
        amenities = amenities.split(/\s+,\s+/g)
        console.log(amenities)
        this.setDataValue('amenities', amenities)
      }
    }
  })

  return Hotel
}
