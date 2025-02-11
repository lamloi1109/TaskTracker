export function getCurrentTime() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    return `${currentYear}/${currentMonth}/${currentDay} ${currentHour}:${currentMinute}`;
}