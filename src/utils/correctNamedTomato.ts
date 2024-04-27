export const correctName = (count: number): string => {
    // Создаем массив с правильными склонениями слова "помидор" для разных чисел
    const cases = [2, 0, 1, 1, 1, 2]
    const titles = ['помидор', 'помидора', 'помидоров']

    // Определяем индекс правильного склонения в зависимости от числа count
    let index
    if (count % 100 > 4 && count % 100 < 20) {
        index = 2
    } else {
        index = cases[Math.min(count % 10, 5)]
    }

    // Возвращаем правильное склонение слова "помидор" в соответствии с числом count
    return titles[index]
}
