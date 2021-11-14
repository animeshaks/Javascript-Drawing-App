const canvas = document.getElementById("canvas")
canvas.height = window.innerHeight
canvas.width = window.innerWidth

// ctx is the context of our canvas
// we use ctx to draw on the canvas
const ctx = canvas.getContext("2d")

// previous mouse positions
// They will be null initially
let prevX = null
let prevY = null

// How thick the lines should be
ctx.lineWidth = 3

let draw = false

// Selecting all the div that has a class of clr
let clrs = document.querySelectorAll(".clr")
// Converting NodeList to Array
clrs = Array.from(clrs)

clrs.forEach(clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr
    })
})

let clearBtn = document.querySelector(".clear")
clearBtn.addEventListener("click", () => {
    // Clearning the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
})

// Saving drawing as image
let saveBtn = document.querySelector(".save")
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("imag/png")
    let a = document.createElement("a")
    a.href = data
    // what ever name you specify here
    // the image will be saved as that name
    a.download = "sketch.png"
    a.click()
})

// Set draw to true when mouse is pressed
window.addEventListener("mousedown", (e) => draw = true)
// Set draw to false when mouse is released
window.addEventListener("mouseup", (e) => draw = false)



window.addEventListener("mousemove", (e) => {
    // initially previous mouse positions are null
    // so we can't draw a line
    // if draw is false then we won't draw




    if (e.type == 'touchmove'){
      ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
	     if(prevX == null || prevY == null || !draw){
	        // Set the previous mouse positions to the current mouse positions
	        prevX = e.clientX
	        prevY = e.clientY
	        return
	    } 

	    // Current mouse position
	    let currentX = e.touches[0].clientX
	    let currentY = e.touches[0].clientY

    } else if (e.type == 'mousemove'){
	    if(prevX == null || prevY == null || !draw){
	        // Set the previous mouse positions to the current mouse positions
	        prevX = e.clientX
	        prevY = e.clientY
	        return
	    } 

	    // Current mouse position
	    let currentX = e.clientX
	    let currentY = e.clientY
    }




    if(prevX == null || prevY == null || !draw){
        // Set the previous mouse positions to the current mouse positions
        prevX = e.clientX
        prevY = e.clientY
        return
    } 

    // Current mouse position
    let currentX = e.clientX
    let currentY = e.clientY

    // Drawing a line from the previous mouse position to the current mouse position
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    // Update previous mouse position
    prevX = currentX
    prevY = currentY
})
