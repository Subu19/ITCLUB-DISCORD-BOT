export const dateFormatter = (date: Date) => {
    // Day of the week
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];

    // Month
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = months[date.getMonth()];

    // Day
    const day = date.getDate();

    // Year
    const year = date.getFullYear();

    // Form a string in the desired format
    const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;

    return formattedDate;
};
