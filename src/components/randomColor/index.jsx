import { useState } from "react"
import './styles.css'

export default function RandomColor() {

    // True = HEX , False = RGB
    const [mode, setMode] = useState(false)
    const [color, setColor] = useState(0xD2691E)  

    function isHex() {
        return mode
    }

    function getHex(val=color) {
        return `0x${val.toString(16).toUpperCase().padStart(6, "0")}`
    }

    function getRGB(val=color) {
        const [r, g, b] = [val >> 16, (val & 0x00FFFF) >> 8, val & 255]
        // return `rgb(${r}, ${g}, ${b})`
        return `rgb(${[r, g, b].join(',')})`
    }

    function randomize() {
        setColor(Math.floor(Math.random() * 0xFFFFFF))
    }

    function calculateFontColor() {
        const [r, g, b] = [color >> 16, (color & 0x00FFFF) >> 8, color & 255]
        console.log(`calculateFontColor() : R = ${r} ; G = ${g} ; B = ${b}`)
        // console.log(`   font will be: ${(r + b - g < 255) ? 0 : 0xFFFFFF - color}`)
        console.log(`   background is: ${getHex(color)}`)
        console.log(`   font will be : ${getHex(0xFFFFFF - color)}`)
        // console.log(`(r + b - g) == ${(r + b - g)}`)
        // console.log(`(r + b - g < 255) == ${(r + b - g< 255)}`)
        // console.log(`((255-r) << 16) == ${((255-r) << 16)}`)
        // console.log(`(g << 8) == ${(g << 8)}`)
        // console.log(`(255-b) == ${(255-b)}`)
        // console.log(`((255-r) << 16) + (g << 8) + (255-b) == ${((255-r) << 16) + (g << 8) + (255-b)}`)
        // console.log(`As HEX: ${(((255-r) << 16) + (g << 8) + (255-b)).toString(16).toUpperCase()}`)
        // return (r + b - g < 255) ? 0 : ((255-r) << 16) + (g << 8) + (255-b)
        // return (r + b - g < 255) ? 0 : 0xFFFFFF - color
        return 0xFFFFFF - color
    }

    return <div className="wrapper" style={{ 'backgroundColor': isHex() ? color : getRGB() }}>
        <div className="controls">
            <button onClick={ () => setMode(true) }>HEX Color</button>
            <button onClick={ () => setMode(false) }>RGB Color</button>
            <button onClick={ () => randomize() }>Generate Random Color</button>
        </div>
        <h2 className="mode" style={{ 'color': getRGB(calculateFontColor()) }} >
            { isHex() ? "HEX Color" : "RGB Color" }
        </h2>
        <h2 className="color" style={{ 'color': getRGB(calculateFontColor()) }} >{ isHex() ? getHex() : getRGB() }</h2>
        {console.log(calculateFontColor())}
    </div>
}
