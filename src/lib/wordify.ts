export function toEnglishDigits(num: string | number): string {

    if (num === null || num === undefined) {
        return '';
    }

    if (typeof num !== 'string' || num.length === 0)
        return num.toString();

    const faDigits = '۰۱۲۳۴۵۶۷۸۹';
    const arDigits = '٠١٢٣٤٥٦٧٨٩';
    let output = "";
    for (let ipos = 0; ipos < num.length; ipos++) {

        let faIndex = faDigits.indexOf(num[ipos]!);
        if (faIndex >= 0) {
            output += faIndex.toString();
            continue;
        }
        let arIndex = arDigits.indexOf(num[ipos]!);
        if (arIndex >= 0) {
            output += arIndex.toString();
            continue;
        }
        output += num[ipos];
    }
    return output.replace(/,/g, "");
}

export function wordifyfa(input: string | number, level: number = 0, digits: ('num' | 'word') = "word"): string {

    if (input === null) {
        return "";
    }

    let num: number = parseInt(toEnglishDigits(input));


    // convert negative number to positive and get wordify value
    if (num < 0) {
        num = num * -1;
        return "منفی " + wordifyfa(num, level);
    }
    if (num === 0) {
        if (level === 0) {
            return "صفر";
        } else {
            return "";
        }
    }
    let result = "";
    const yekan = ["یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
        dahgan = ["بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
        sadgan = ["یکصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"],
        dah = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هیجده", "نوزده"];

    if (level > 0) {
        result += " و ";
        level -= 1;
    }

    if (num < 10) {
        result += digits === 'word' ? yekan[num - 1] : String(num);
    } else if (num < 20) {
        result += digits === 'word' ? dah[num - 10] : String(num);
    } else if (num < 100) {
        result += (digits === 'word' ? dahgan[Math.floor(num / 10) - 2] : String(Math.floor(num))) + wordifyfa(num % 10, level + 1 , digits);
    } else if (num < 1000) {
        result += (digits === 'word' ? sadgan[Math.floor(num / 100) - 1] : String(num)) + wordifyfa(num % 100, level + 1 , digits);
    } else if (num < 1000000) {
        result += wordifyfa(Math.floor(num / 1000), level , digits) + " هزار" + wordifyfa(num % 1000, level + 1 , digits);
    } else if (num < 1000000000) {
        result += wordifyfa(Math.floor(num / 1000000), level , digits) + " میلیون" + wordifyfa(num % 1000000, level + 1 , digits);
    } else if (num < 1000000000000) {
        result += wordifyfa(Math.floor(num / 1000000000), level , digits) + " میلیارد" + wordifyfa(num % 1000000000, level + 1 , digits);
    } else if (num < 1000000000000000) {
        result += wordifyfa(Math.floor(num / 1000000000000), level , digits) + " تریلیارد" + wordifyfa(num % 1000000000000, level + 1 , digits);
    }

    return result;
}

export function wordifyTomans(num: string | number, digits: ('word' | 'num') = 'word'): string {
    if (num === null || num === undefined || num === "") {
        return "";
    }
    return wordifyfa(num, 0, digits) + " تومان"; 
}

export function wordifyRialsInTomans(num: string | number): string {
    if (num === null || num === undefined || num === "") {
        return "";
    }
    if (typeof num == "string") {
        var cleanNumber = toEnglishDigits(num);
        num = parseInt(cleanNumber);
    }

    const originalAmount = num;
    if (num >= 10 || num <= -10) {
        num = Math.floor(num / 10);
    } else {
        num = 0;
    }
    const haveRial = (originalAmount / 10).toString().split(".")[1];
    return (num ? wordifyfa(num, 0) + " تومان" : "") +
        (num && haveRial ? " و " : "") +
        (haveRial ? `${wordifyfa(haveRial, 0)} ریال` : "");
}