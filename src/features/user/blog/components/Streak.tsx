"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Activity, ActivityCalendar, ThemeInput } from 'react-activity-calendar'

interface StreakProps {
  activityData: { [date: string]: number }
}

const toDateString = (date: Date) => date.toISOString().split("T")[0]

export const Streak = ({ activityData }: StreakProps) => {

    const getLevel = (count: number): number => {
        if (count === 0) return 0
        if (count <= 2) return 1
        if (count <= 4) return 2
        if (count <= 6) return 3
        return 4
    }

    const today = new Date()

    const currentWeekStart = new Date(today)
    currentWeekStart.setDate(today.getDate() - currentWeekStart.getDay())

    const start = new Date(currentWeekStart)
    start.setDate(start.getDate() - 365)

    const data: Activity[] = []
    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = toDateString(d)
      const count = activityData[dateStr] ?? 0
      data.push({
        date: dateStr,
        count,
        level: getLevel(count),
      })
    }

    const minimalTheme: ThemeInput = {
        light: ['hsl(0, 0%, 92%)', 'green'],
    }
    
    return (
        <Card className="w-fit"> 
            <CardContent>
                <ActivityCalendar
                    data={data}
                    blockSize={14}
                    blockMargin={4}
                    blockRadius={3}
                    colorScheme="light"
                    theme={minimalTheme}
                    weekStart={0}
                    labels={{
                        months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                        weekdays: ['일', '월', '화', '수', '목', '금', '토'],
                        totalCount: '{{count}}개 활동',
                        legend: { less: '적음', more: '많음' },
                    }}
                    renderBlock={(block, activity) => (
                        <Tooltip key={activity.date}>
                        <TooltipTrigger asChild>
                            {block}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                            {activity.date} - {activity.count}개 활동
                            </p>
                        </TooltipContent>
                        </Tooltip>
                    )}
                />
            </CardContent>
        </Card>
    )
}