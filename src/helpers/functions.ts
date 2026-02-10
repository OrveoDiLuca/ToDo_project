//Obtener la fecha actual. 
const today = new Date();
export const getToday = () => {
    const formattedDate = today.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return formattedDate;
}