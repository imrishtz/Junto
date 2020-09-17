const ISRAEL_FULL_PREFIX = "+972";
const GLOBAL_PREFIX = '+';
const ISRAEL_SHORT_CELLULAR_PREFIX = "05";
const ISRAEL_SHORT_DIGIT_NUMBER = 10;

// returns undefiend on unwanted numbers
export default transformPhoneNumber = (number) => {

  let newString = number.replace(/[^0-9+]/ig, "");
  // remove phones that are not cellular or global (with +)
  if (!newString.startsWith(ISRAEL_SHORT_CELLULAR_PREFIX) &&
      !newString.startsWith(GLOBAL_PREFIX)) {
    return;
  }
  if (newString.length === ISRAEL_SHORT_DIGIT_NUMBER &&
      newString.startsWith(ISRAEL_SHORT_CELLULAR_PREFIX)) {
    newString = newString.replace('0', ISRAEL_FULL_PREFIX);
  }
  return newString;
}