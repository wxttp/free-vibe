import React from 'react'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const InfoCard = (props) => {
  return (
    <Card className="text-center">
        <CardHeader>
            <div className="flex items-center justify-center">
              <div className="w-fit bg-[var(--primary-color)] rounded-full p-3">
                <props.icons className="text-white" />
              </div>
            </div>
        </CardHeader>
        <CardContent>
            <CardTitle className="pb-2">{props.title}</CardTitle>
            <CardDescription>
                {props.description}
            </CardDescription>
        </CardContent>
    </Card>
  )
}

export default InfoCard