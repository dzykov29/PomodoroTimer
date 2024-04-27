export const getDateOnWeek = (weekCount: number) => {
    const today = new Date()
    const day = today.getDay() // Получаем номер дня недели (0 - воскресенье, 1 - понедельник, ..., 6 - суббота)

    // Вычитаем из текущей даты день недели (day) и прибавляем 1, чтобы получить понедельник текущей недели
    const monday = new Date(today)
    monday.setDate(today.getDate() - day + 1 + weekCount * 7) // Учитываем неделю

    // Если текущий день недели - воскресенье (day === 0), то понедельник уже следующей недели, поэтому не нужно добавлять weekCount * 7
    if (day === 0) {
        monday.setDate(today.getDate() - 6 + weekCount * 7) // Учитываем неделю
    }

    // Добавляем к понедельнику 6 дней, чтобы получить воскресенье текущей недели
    const sunday = new Date(monday)
    sunday.setDate(monday.getDate() + 6)

    return { monday, sunday }
}
