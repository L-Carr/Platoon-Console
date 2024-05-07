import React, { useLayoutEffect, useState } from 'react'
import rough from 'roughjs'

const generator = rough.generator()

const CanvasPage = () => {
    const [element, setElement] = useState([])
    const [drawing, setDrawing] = useState(false)




    //perform layout measurements before browser repaints screen
    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas")
        const context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height)
        const roughCanvas = rough.canvas(canvas)
        const rect = generator.rectangle(10, 10, 100, 100, {roughness: 0})
        const line = generator.line(10, 10, 110, 110, {roughness: 0})
        const circle = generator.circle(480, 50, 80, {roughness: 0});
        roughCanvas.draw(rect)
        roughCanvas.draw(line)
        roughCanvas.draw(circle)
    }, [])
    
    const handleMouseDown = (event) => {
        setDrawing(true)
    }

    const handleMouseMove = (event) => {
        if(!drawing) return
        //clientX and clientY are the mouse movements
        const {clientX, clientY} = event
        console.log(clientX, clientY)
    }

    const handleMouseUp = () => {
        setDrawing(false)
    }

  return (
    <>
    <div>CanvasPage</div>
        <canvas 
        id="canvas" 
        style={{backgroundColor: '#fefae0'}} 
        height={window.innerHeight-250} 
        width={window.innerWidth-250}
        onMouseDown = {handleMouseDown}
        onMouseMove = {handleMouseMove}
        onMouseUp = {handleMouseUp}
        
        
        >
        Canvas
        </canvas>
    </>
  )
}

export default CanvasPage