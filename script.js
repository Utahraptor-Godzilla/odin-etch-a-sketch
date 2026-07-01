const canvas = document.getElementById("canvas")
const changeResolutionButton = document.getElementById("resolution")
const clearButton = document.getElementById("clear")
const rainbowButton = document.getElementById("rainbow")
const eraseButton = document.getElementById("eraser")
let rainbowMode = false
let eraseMode = false
let resolution = 16
const randomColorPicker = () => {
    const a = Math.floor(Math.random()*256)
    const b = Math.floor(Math.random()*256)
    const c = Math.floor(Math.random()*256)
    return `rgb(${a}, ${b}, ${c})`
}
const createGrid = () => {
    for (let i=0; i<resolution; i++) {
        const gridRow = document.createElement("div")
        gridRow.classList.add("grid-row")
        gridRow.style.height = 100/resolution+"%"
        for (let i=0; i<resolution; i++) {
            const gridUnit = document.createElement("div")
            gridUnit.classList.add("grid-unit")
            gridUnit.style.width = 100/resolution + "%"
            gridUnit.style.height = "100%"
            gridUnit.opacity = 0
            gridUnit.addEventListener("mouseenter", () => {
                gridUnit.opacity += 0.25
                gridUnit.style.backgroundColor = eraseMode ? "white"
                                               : rainbowMode ? randomColorPicker()
                                               : `rgb(0 0 0 / ${gridUnit.opacity})`
            })
            gridRow.appendChild(gridUnit)
        }
        canvas.appendChild(gridRow)
    }
}
createGrid()
changeResolutionButton.addEventListener("click", () => {
    canvas.replaceChildren()
    resolution = Number(prompt("Resolution: "))
    createGrid()
})
clearButton.addEventListener("click", () => {
    [...canvas.children].forEach(row => [...row.children].forEach(unit => {
        unit.style.backgroundColor = "white"
        unit.opacity = 0
    }))
})
rainbowButton.addEventListener("click", () => {
    rainbowMode = !rainbowMode
})
eraseButton.addEventListener("click", () => [
    eraseMode = !eraseMode
])
