let types = [
  'Pubing',
  'Baring',
  'Partying',
  'Picnincing',
  'Bacheloretting',
  'Beaching',
  'Pooling',
  'BBQing',
  'Skiing',
  'Snowboarding',
  'Running',
  'Sporting',
  'Walking',
  'Tripping',
  'Trekking',
  'Celebrating',
  'Birthdaying',
  'Restauranting',
  'Meeting',
  'Mealing',
  'Laking',
  'Baking',
  'Movie-watching',
  'Serie-watching',
  'Show-watching',
  'Camping',
  'Abroading',
  'Flying',
  'Pizzaing',
  'Newborning',
  'Bar-Mitzvaing',
  'Bat-Mitzvaing',
  'Jeeping',
  'Pijamaing',
  'Biking',
  'Cycling',
  'Quading',
  'Trancing',
  'Technoing',
  'Dancing',
  'Gyming',
  'Balling',
  'Hiking',
  'Rivering',
  'Drinking',
  'Binging',
  'Road-Tirpping',
  'Bowling',
  'Swimming',
  'Riding',
  'Learning',
  'Painting',
  'Gaming',
];

class Types {
  constructor() {
    this.types = types.sort();
  }
}
const typeInstance = new Types();

export function getTypes() {
  return typeInstance.types;
}

export function addType(type) {
  if (types.indexOf(type) > -1) {
    types = [...type, type];
    typeInstance.types = types.sort;
  }
}