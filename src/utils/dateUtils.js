const dateOptions = { 
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Kolkata' 
};

const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12:true,
    timeZone: 'Asia/Kolkata',
};

export const getDateAndTime = (date) => {
    var cdate = new Date(date).toLocaleString('en-us', dateOptions);
    const today = new Date().toLocaleString('en-us', dateOptions);
    const time = new Date(date).toLocaleString('en-us', timeOptions);

    if (cdate === today) {
        date = "today"
    }

    return [cdate, time];
}