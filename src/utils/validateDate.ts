export const validateDate = ( date : Date) => {
    const now : Date = new Date();

    if (date < now) return false

    return true
};