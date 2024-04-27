export function determineTimeSize(time: number): string {
    if (time < 60) {
        return `${time} секунд${time !== 1 ? '' : 'ы'}`
    } else if (time < 3600) {
        const minutes = Math.floor(time / 60)
        const remainingSeconds = time % 60
        if (remainingSeconds === 0) {
            return `${minutes} минут${minutes !== 1 ? '' : 'ы'}`
        } else {
            return `${minutes} минут${
                minutes !== 1 ? '' : 'ы'
            } ${remainingSeconds} секунд${remainingSeconds !== 1 ? '' : 'ы'}`
        }
    } else {
        const hours = Math.floor(time / 3600)
        const remainingMinutes = Math.floor((time % 3600) / 60)
        if (remainingMinutes === 0) {
            return `${hours} час${hours !== 1 ? 'а' : ''}`
        } else {
            return `${hours} час${
                hours !== 1 ? 'а' : ''
            } ${remainingMinutes} минут${remainingMinutes !== 1 ? '' : 'ы'}`
        }
    }
}
