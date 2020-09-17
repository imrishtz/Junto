class Event {
  constructor(id, ownerId, name, date, location, locationPoll, type, participants, equipGroup, equipPersonal, responsibilities, icon) {
    this.id = id;
    this.ownerId = ownerId;
    this.name = name;
    this.date = date; // {from: x, to: y}
    this.location = location;
    this.locationPoll = locationPoll;
    this.type = type // {name: typeName, icon: icon}
    this.participants = participants; // array
    this.equipGroup = equipGroup;
    this.equipPersonal = equipPersonal;
    this.responsibilities = responsibilities;
    this.icon = icon;
  }
};

export default Event;