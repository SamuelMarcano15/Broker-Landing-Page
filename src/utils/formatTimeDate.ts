export const formatTimestamp = (timestamp:number) => {
    // Convert seconds to milliseconds
    const date = new Date(timestamp * 1000);

    // Extract components
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Format the date as YYYY-MM-DD hh:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatTime = (timestamp:string) => {
    // Convert seconds to milliseconds
    const date = new Date(timestamp);

    // Extract components
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    // Format the date as YYYY-MM-DD hh:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};


export const formatTimeLeft = (seconds:number) => {
    // Ensure the input is a non-negative integer
    if (seconds < 0) {
        return "Invalid input: time cannot be negative.";
    }

    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format the output
    if (minutes > 0) {
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')} minutos`;
    } else {
        return `${remainingSeconds} segundos`;
    }
}
