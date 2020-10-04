
export const NAME = 'name';
export const DATE = 'date';
export const LOCATION = 'location';
export const LOCATION_POLL = 'locationPoll';
export const TYPE = 'type';
export const PARTICIPANTS = 'participants';
export const EQUIP_GROUP = 'equipGroup';
export const EQUIP_PERSONAL = 'equipPersonal';
export const RESPONSIBILITIES = 'responsibilities';
export const ICON = 'icon';
export const COMING = 'coming';

class Event {
  constructor(id, ownerId, name, date, location, locationPoll, type, participants, equipGroup, equipPersonal, responsibilities, icon) {
    this.id = id;
    this.ownerId = ownerId;
    this.name = name;
    this.date = date; // {from = x, to = y}
    this.location = location;
    this.locationPoll = locationPoll;
    this.type = type // {name = typeName, icon = icon}
    this.participants = participants; // array
    this.equipGroup = equipGroup;
    this.equipPersonal = equipPersonal;
    this.responsibilities = responsibilities;
    this.icon = icon;
  }
};

export function copyEvent (otherEvent) {
  return new Event(
    otherEvent.id,
    otherEvent.ownerId,
    otherEvent.name,
    otherEvent.date, // {from = x, to = y}
    otherEvent.location,
    otherEvent.locationPoll,
    otherEvent.type, // {name = typeName, icon = icon}
    otherEvent.participants, // array
    otherEvent.equipGroup,
    otherEvent.equipPersonal,
    otherEvent.responsibilities,
    otherEvent.icon
  )
}

export default Event;