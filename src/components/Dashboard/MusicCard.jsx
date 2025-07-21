import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MusicCard = () => {
  return (
    <Card className='Grid' style={{ gridTemplateColumns: '10% 70% 20%' }}>
        <div>Play</div>
        <div>
            <CardTitle>Music Title</CardTitle>
            <CardDescription>Artist</CardDescription>
            
        </div>
    </Card>
  )
}

export default MusicCard