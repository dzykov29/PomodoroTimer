export const getNameDayOfWeek = (barNumber: number) => {
    const dayOfWeek = barNumber
    const nameDay = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
    ]
    return nameDay[dayOfWeek]
}
