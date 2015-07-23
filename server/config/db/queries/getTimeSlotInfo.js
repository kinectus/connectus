var Slot = require('../../../reservations/timeSlot.model');

module.exports = getTimeSlotInfo = function(next){
  return Slot.forge()
    .fetchAll()
};
