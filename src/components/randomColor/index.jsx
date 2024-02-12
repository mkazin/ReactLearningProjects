import { useState } from "react"
import './styles.css'

export default function RandomColor() {

    // Note: There's no need to use a string to represent a binary 
    // value. This makes toggling so much simpler.
    const [mode, setMode] = useState(false)
    const [color, setColor] = useState(0xD2691E)  

    // True = HEX , False = RGB.
    function isHex() {
        return mode
    }

    // Note: There's no need to loop and randomize individual hex digits.
    // The hex representation of colors is a 3-byte unsigned value which 
    // by definition has a max value of 0xFFFFFF, so we can simply generate 
    // a single random value to represent it.
    // Remember: text representation of values is ONLY necessary when
    // presenting information to the user. Until then it is and should be
    // treated as data. It's not only more efficient, but is critical to I18N.
    function randomize() {
        setColor(Math.floor(Math.random() * 0xFFFFFF))
    }

    // Note: JS can format numbers as Hex by passing the base (16) to toString()
    // Padding is necessary when < 0x100000
    function getHex(val=color) {
        return `0x${val.toString(16).toUpperCase().padStart(6, "0")}`
    }

    // Note: When handling the spliting of a hex value into constituents, 
    // the correct approach is bit masking and shifting. 
    // If you're not familiar yet read up on these concepts.
    function getRGB(val=color) {
        const [r, g, b] = [(val >> 16) && 0xFF, (val & 0x00FFFF) >> 8, val & 0xFF]
        return `rgb(${[r, g, b].join(',')})`
    }

    // This is another approach I read about, but I don't like the results
    // See: https://stackoverflow.com/questions/35969656/how-can-i-generate-the-opposite-color-according-to-current-color
    // function invertHex(hex) {
    //     console.log(`${getHex(hex)} ==> ${getHex(((0x1 << 20) | hex))}`)
    //     return ((0x1 << 20) | hex) ^ 0xFFFFFF
    // }

    function calculateFontColor() {
        const [r, g, b] = [color >> 16, (color & 0x00FFFF) >> 8, color & 0xFF]
        return (r*0.299 + g*0.587 + b*0.114) > 186 ? 'white' : 'black'
        // return getRGB(invertHex(color))
    }

    return <div className="wrapper" style={{ 'backgroundColor': getRGB() }}>
        <div className="controls">
            <button onClick={ () => setMode(true) }>HEX Color</button>
            <button onClick={ () => setMode(false) }>RGB Color</button>
            <button onClick={ () => randomize() }>Generate Random Color</button>
        </div>
        <h2 className="mode" style={{ 'color': calculateFontColor() }} >
            { isHex() ? "HEX Color" : "RGB Color" }
        </h2>
        <h2 className="color" style={{ 'color': calculateFontColor() }} >{ isHex() ? getHex() : getRGB() }</h2>
    </div>
}
