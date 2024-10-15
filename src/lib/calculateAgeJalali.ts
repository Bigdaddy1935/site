import * as jalaali from "jalaali-js"
export default function calculateAgeJalali(jalaliBirthday : string) {
    // Split the input string to extract year, month, and day
    const [jy, jm, jd] = jalaliBirthday.split('/').map(Number);
    
    // Convert Jalali date to Gregorian date using jalaali-js
    const gregorianDate = jalaali.toGregorian(jy, jm, jd);
    
    // Create a Date object for the Gregorian date
    const birthDate = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
    
    // Get today's date
    const today = new Date();
    
    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust if the birthday hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}