// Функция для форматирования времени в формат mm:ss
export const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    const formattedMinutes = String(minutes).padStart(2, '0') // Добавляем ведущий ноль, если минуты < 10
    const formattedSeconds = String(remainingSeconds).padStart(2, '0') // Добавляем ведущий ноль, если секунды < 10
    return `${formattedMinutes}:${formattedSeconds}`
}

//Функция перевода секунд в минуты и часы
export const convertSecondsToHoursMinutesSeconds = (
    seconds: number
): string => {
    const hours = Math.floor(seconds / 3600)
    const remainingSecondsAfterHours = seconds % 3600
    const minutes = Math.floor(remainingSecondsAfterHours / 60)
    const remainingSeconds = remainingSecondsAfterHours % 60

    if (hours > 0 && minutes > 0 && remainingSeconds > 0) {
        return `${hours} ч ${minutes} м `
    } else if (hours > 0 && minutes > 0 && remainingSeconds === 0) {
        return `${hours} ч ${minutes} м`
    } else if (hours > 0 && minutes === 0 && remainingSeconds > 0) {
        return `${hours} ч ${remainingSeconds} с`
    } else if (hours === 0 && minutes > 0 && remainingSeconds > 0) {
        return `${minutes} м ${remainingSeconds} с`
    } else if (hours > 0 && minutes === 0 && remainingSeconds === 0) {
        return `${hours} ч`
    } else if (hours === 0 && minutes > 0 && remainingSeconds === 0) {
        return `${minutes} м`
    } else if (hours === 0 && minutes === 0 && remainingSeconds > 0) {
        return `${remainingSeconds} с`
    } else {
        return '0'
    }
}

export function formatTimeToChart(seconds: number) {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = seconds % 60

    let formattedTime = ''
    if (hours > 0) {
        formattedTime += `${hours} ч `
    }
    if (minutes > 0) {
        formattedTime += `${minutes} мин `
    }
    if (remainingSeconds > 0 || formattedTime === '') {
        formattedTime += `${remainingSeconds} сек`
    }

    return formattedTime
}
