export function calculateFocus(timeToWork: number, timeToPaused: number) {
    const result = Math.trunc((timeToWork / (timeToWork + timeToPaused)) * 100)
    return result
}
