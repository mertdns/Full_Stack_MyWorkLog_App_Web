import { months } from "../pages/WorkList";

const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

export const useConvertDateToText = (text: string) => {
    return {
        convert: () : string => {
            const seperator = text.split("-");
            if (seperator.length !== 4)
                return "";

            const [dayOfMonth, month, year, dayOfWeek] = seperator;
            const parsedDayOfWeek = parseInt(dayOfWeek);
            
            const textOfMonth = months[parseInt(month) - 1];
            if (parsedDayOfWeek < 0 || parsedDayOfWeek > 6)
                return `${dayOfMonth} ${textOfMonth[0].toUpperCase() + textOfMonth.slice(1)} ${year}`;

            const result = `${dayOfMonth} ${textOfMonth[0].toUpperCase() + textOfMonth.slice(1)} ${year} ${days[parsedDayOfWeek]}`;

            return result;
        }
    }
}
