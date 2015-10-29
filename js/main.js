
// configurables
var inactivityPeriod = 15
var fadeInterval = 2000
var slideRotation = 7
var slides = [
  "slides/01.jpg" ,
  "slides/02.jpg" ,
  "slides/03.jpg" ,
  "slides/04.jpg" ,
  "slides/05.jpg" ,
  "slides/06.jpg" ,
  "slides/07.jpg" ,
  "slides/08.jpg" ,
  "slides/09.jpg" ,
  "slides/10.jpg" ,
  "slides/11.jpg" ,
  "slides/12.jpg" ,
  "slides/13.jpg" ,
  "slides/14.jpg" ,
  "slides/15.jpg" ,
  "slides/16.jpg" ,
  "slides/17.jpg" ,
  "slides/18.jpg" ,
  "slides/19.jpg" ,
  "slides/20.jpg" ,
  "slides/21.jpg" ,
]

// not configurable
var bgImages= new Array()
var screenSaverActive = false

//preload images
var slideCache = new Array()
var i_idle = null
var i_slide = null

for (i=0; i < slides.length; i++) {
  slideCache[i] = new Image()
  slideCache[i].src = slides[i]
}

// start a random slide
var index = Math.floor((Math.random() * slides.length))
debug("index=" + index)

// stateful vars
var idle = 0  // how idle is the system?
var delay = 0 // used to slow down killing screensaver on mouse move
var slideA = false
$(document).ready(function () {
  debug("document.ready(" + slideRotation + ")")

  // on start, run screen saver "stop" to prime everything properly
  screenSaverActive = true
  stopScreenSaver()

  i_idle = setInterval(idleInterval, 1000)

  //Zero the idle timer on mouse movement.
  $(this).mousemove(function (e) {
    idle = 0
    delay++
    if (delay > 10) { // arbitrary # of events
      stopScreenSaver()
    }
  })
  $(this).keypress(function (e) {
    idle = 0
    stopScreenSaver()
  })
})

function debug(s) {
  console.log(s)
}

// hooked from setInterval above
function idleInterval() {
  idle++
  debug("idle " + idle)
  if (idle > inactivityPeriod && !screenSaverActive) {
      startScreenSaver()
  }
}

// startup the screensaver
function startScreenSaver() {
  debug("startScreenSaver()")
  clearInterval(i_slide)
  delay = 0 // slow down an accidental re-trigger
  screenSaverActive = true
  $('#slideBg').css('display','block')
  rotateSlide()
  i_slide = setInterval(rotateSlide, slideRotation * 1000)
}

// stop the screensaver
function stopScreenSaver() {
  if (screenSaverActive) {
      debug("stopScreenSaver()")
	  screenSaverActive = false
      $('#slideA').fadeOut(0)
      $('#slideB').fadeOut(0)
      $('#slideBg').css('display','none')
      clearInterval(i_slide)
  }
}

function rotateSlide() {
  if (screenSaverActive == false) {
    return
  }

  if (index < slides.length-1) {
    index++
  } else {
    index = 0
  }
  debug("rotate() index=" + index)

  if (slideA) {
    debug("Picking B")
    slideA = false
    s = document.getElementById("slideB")
    s.src = slideCache[index].src
    $('#slideA').fadeOut(fadeInterval)
    $('#slideB').fadeIn(fadeInterval)
  } else {
    debug("Picking A")
    slideA = true
    s = document.getElementById("slideA")
    s.src = slideCache[index].src
    $('#slideA').fadeIn(fadeInterval)
    $('#slideB').fadeOut(fadeInterval)
  }
}

