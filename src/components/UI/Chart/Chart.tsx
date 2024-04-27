import { useContext, useEffect, useRef } from 'react'
import { TodoContext } from '../../../Context/TodoProvider'
import { TodoContextType } from '../../../utils/Todos'
import Chart from 'chart.js/auto'
import { findDoneTasksToWeek } from '../../../utils/findDoneTasks'
import { formatTimeToChart } from '../../../utils/convertTime'

const MyChart = () => {
    const todoContext = useContext<TodoContextType>(TodoContext)
    const todosDone = findDoneTasksToWeek(
        todoContext.todos,
        todoContext.selectedOptionsWeek
    )

    const activeDay = todoContext.barNumber;
    const chartRef = useRef<HTMLCanvasElement | null>(null)
    const chartInstanceRef = useRef<Chart<'bar'> | null>(null) // Ссылка на экземпляр графика
    useEffect(() => {

         const label = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
         const colorsXlabelLight = ['#333','#333','#333','#333','#333','#333','#333'];
         const colorsXlabelDark = ['#F4F4F4','#F4F4F4','#F4F4F4','#F4F4F4','#F4F4F4','#F4F4F4','#F4F4F4']
         const barColor = ['#EA8979','#EA8979','#EA8979','#EA8979','#EA8979','#EA8979','#EA8979']

        if (todosDone && chartRef.current) {
            const ctx = chartRef.current.getContext('2d')
            if (ctx) {
                // Группируем задачи по дням недели и вычисляем сумму времени для каждого дня
                const dailySum = Array(7).fill(0) // Массив для хранения сумм времени для каждого дня
                todosDone.forEach((todo) => {
                    if (todo.dateEnd) {
                        const dt = new Date(todo.dateEnd)
                        const dayIndex = dt.getDay() // Получаем индекс дня недели (0 - воскресенье, 1 - понедельник, и т.д.)
                        dailySum[dayIndex === 0 ? 6 : dayIndex - 1] +=
                            todo.timeToWork // Учитываем, что неделя начинается с понедельника
                    }
                })

                const zeroIndexes = dailySum
                    .map((value, index) => (value === 0 ? index : null))
                    .filter((index) => index !== null)

                    zeroIndexes.forEach((index) => {
                        if (index !== null) {
                            barColor[index] = '#C4C4C4'
                        }
                    })

                const dailySumSort = [...dailySum].sort((a, b) => a - b)
                // Создать массив с равномерным уменьшением и округлением до целого числа
                const avgStep = Array.from({ length: 4 }, (_, i) =>
                    Math.round(dailySumSort[6] - dailySumSort[6] / 3 * i)
                )
                const labelsY = avgStep.sort((a,b) => a - b);
                const dailyFormattedSum = labelsY.map(formatTimeToChart)
                const uniqueSortedValues = dailyFormattedSum.filter(
                    (value, index, self) => index === self.indexOf(value)
                )

                if (todoContext.mode ) {
                    colorsXlabelDark[activeDay] = '#DC3E22'
                } else {
                    colorsXlabelLight[activeDay] = '#DC3E22'
                }

                barColor[activeDay] = '#DC3E22'
                // Если у нас уже есть экземпляр графика, уничтожаем его
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy()
                }
                // Создаем новый экземпляр графика и сохраняем его в chartInstanceRef
                chartInstanceRef.current = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: label,
                        datasets: [
                            {
                                data: dailySum,
                                backgroundColor: barColor,
                                borderColor: barColor,
                                borderWidth: 1,
                                hoverBackgroundColor: '#EE735D',
                                minBarLength: 5,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                ticks: {
                                    color: todoContext.mode ? '#F4F4F4' : '#333',
                                    callback: function (_value, index) {
                                        return uniqueSortedValues[index] // Используем значения из dailyFormattedSum
                                    },
                                    stepSize: dailySumSort[6] / 3,
                                },
                                max: dailyFormattedSum[6],
                                min: 0,
                                position: 'right', // Размещаем ось y справа
                                beginAtZero: true,
                            },
                            x: {
                                ticks: {
                                    color: todoContext.mode
                                        ? colorsXlabelDark
                                        : colorsXlabelLight,
                                },
                                grid: {
                                    display: false,
                                },
                            },
                        },
                        plugins: {
                            legend: {
                                display: false,
                            },
                            tooltip: {
                                enabled: false, // Скрыть данные при наведении
                            },
                        },
                        onClick: function (_event, elements) {
                            const chartInstance = chartInstanceRef.current
                            // Проверяем, есть ли элементы, на которые было произведено нажатие
                            if (elements.length > 0 && chartInstance) {
                                // Получаем индекс первого элемента, на который было произведено нажатие
                                const index = elements[0].index
                                chartInstance.update()
                                // Выполняем нужное действие, например, выводим данные в консоль
                                todoContext.setDayNumber(index)
                            }
                        },
                    },
                })
            }
        }
    }, [todosDone, todoContext, activeDay])

    return <canvas ref={chartRef} />
}

export default MyChart