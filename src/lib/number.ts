
export function formatPhoneNumber(phoneNumber: string = '') {
  // Remove all non-numeric characters from the input string
  const numericOnly = phoneNumber.replace(/\D/g, '');

  // Split the numeric string into groups using regex and insert spaces between them
  const formatted = numericOnly.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');

  return formatted;
}

export function toLocalString(num: string | number) {
  return !isNaN(Number(num)) ? new Intl.NumberFormat('fa-IR').format(Number(num)) : 'نا مشخص';
}

export function darkenHexColor(hex: string, percent: number) {
  // Ensure hex code starts with "#"
  if (hex[0] !== '#') {
    hex = '#' + hex;
  }

  // Parse the red, green, and blue values
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);

  // Calculate the new values, clamping to 0-255 range
  r = Math.max(0, Math.min(255, Math.round(r * (1 - percent / 100))));
  g = Math.max(0, Math.min(255, Math.round(g * (1 - percent / 100))));
  b = Math.max(0, Math.min(255, Math.round(b * (1 - percent / 100))));

  // Convert the new values back to hex and pad with zeroes if needed
  let newHex =
    '#' +
    r.toString(16).padStart(2, '0') +
    g.toString(16).padStart(2, '0') +
    b.toString(16).padStart(2, '0');

  return newHex;
}

export function conv2EnNum(str: string) {
  return str
    .replace(/[٠١٢٣٤٥٦٧٨٩]/g, function (d: string) {
      return (d.charCodeAt(0) - 1632).toString();
    }) // Convert Arabic numbers
    .replace(/[۰۱۲۳۴۵۶۷۸۹]/g, function (d: string) {
      return (d.charCodeAt(0) - 1776).toString();
    }); // Convert Persian numbers
}

export const mobilePattern = /^(\+98|0)?9\d{9}$/g

export const dispayUserName = (username: string) => {
  const regex = new RegExp(mobilePattern);
  var result = regex.test(conv2EnNum(username)?.replaceAll(' ', ''));

  return result ? 'شماره همراه' : username;
};