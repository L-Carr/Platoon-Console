import React, { useLayoutEffect, useState, useRef } from 'react'
import rough from 'roughjs'
import './CanvasPage.css'

const generator = rough.generator()

function createElement(x1, y1, x2, y2, type) {
    const roughElement = type === "line" ? generator.line(x1, y1, x2, y2) : generator.rectangle(x1, y1, x2 - x1, y2 - y1, {roughness: 0})
    return { x1, y1, x2, y2, roughElement}
}


const CanvasPage = () => {
    const [elements, setElements] = useState([])
    const [drawing, setDrawing] = useState(false)
    const [elementType, setElementType] = useState("line")


    //perform layout measurements before browser repaints screen
    useLayoutEffect(() => {
        const canvas = document.getElementById("canvas")
        const context = canvas.getContext("2d")
        context.clearRect(0, 0, canvas.width, canvas.height)
        const roughCanvas = rough.canvas(canvas)
        elements.forEach(element => roughCanvas.draw(element.roughElement))

    }, [elements])
    
    const handleMouseDown = (event) => {
        setDrawing(true)
        const {clientX, clientY} = event
        const element = createElement(clientX, clientY, clientX, clientY, elementType)
        //add each element into array
        setElements((prevState) => [...prevState, element])
    }

    const handleMouseMove = (event) => {
        if(!drawing) return
        const {clientX, clientY} = event
        const index = elements.length - 1
        const {x1, y1} = elements[index]
        const updatedElement = createElement(x1, y1, clientX, clientY, elementType)
        console.log(clientX, clientY)
        const elementsCopy = [...elements]
        elementsCopy[index] = updatedElement
        setElements(elementsCopy)

    }

    const handleMouseUp = () => {
        setDrawing(false)
    }

  return (
    <>
    <div>
        <div style={{ position: "fixed" }}>
            <input 
                type="radio" 
                id="line" 
                checked={elementType === "line"} 
                onChange={() => setElementType("line")} />
            <label htmlFor="line">Line</label>
            <input
                type="radio"
                id="rectangle"
                checked={elementType === "rectangle"}
                onChange={() => setElementType("rectangle")}
            />
            <label htmlFor="rectangle">Rectangle</label>
        </div>
        <canvas 
        id="canvas" 
        style={{backgroundColor: '#fefae0'}} 
        height={window.innerHeight-50} 
        width={window.innerWidth-200}
        onMouseDown = {handleMouseDown}
        onMouseMove = {handleMouseMove}
        onMouseUp = {handleMouseUp}
        >
        Canvas
        </canvas>
    </div>
    </>
  )
}

export default CanvasPage