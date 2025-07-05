import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen } from "lucide-react"
import { ElementType, ReactNode } from "react"

interface SectionCardProps { 
    title: string
    icon: ElementType
    description: string
    children: ReactNode
}

const SectionCard = ( {title, icon: Icon, description, children}: SectionCardProps) => { 
    return ( 
         <Card className="glass-card border-2 border-primary/20 shadow-lg m-3">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-12 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
              <div>
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Icon className="w-6 h-6 text-primary" />
                   {title}
                </CardTitle>
                <CardDescription className="text-base">
                    {description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center">
                {children}
          </CardContent>
        </Card>
    )
}

export default SectionCard 