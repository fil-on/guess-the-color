const c = document.getElementById('canv')
const cells = document.querySelectorAll('.cell')
const rgbText = document.querySelector('.rgb-text')
const resultImg = document.querySelector('.result-image')
const result = document.querySelector('.result')
const scoreText = document.querySelector('.score')
const reset = document.querySelector('.restart')

function startCanva() {
  var $ = c.getContext('2d');
  
  
  var col = function(x, y, r, g, b) {
    $.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
    $.fillRect(x, y, 1,1);
  }
  var R = function(x, y, t) {
    return( Math.floor(192 + 64*Math.cos( (x*x-y*y)/300 + t )) );
  }
  
  var G = function(x, y, t) {
    return( Math.floor(192 + 64*Math.sin( (x*x*Math.cos(t/4)+y*y*Math.sin(t/3))/300 ) ) );
  }
  
  var B = function(x, y, t) {
    return( Math.floor(192 + 64*Math.sin( 5*Math.sin(t/9) + ((x-100)*(x-100)+(y-100)*(y-100))/1100) ));
  }
  
  var t = 0;
  
  var run = function() {
    for(x=0;x<=35;x++) {
      for(y=0;y<=35;y++) {
        col(x, y, R(x,y,t), G(x,y,t), B(x,y,t));
      }
    }
    t = t + 0.03;
    window.requestAnimationFrame(run);
  }
  
  run();
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let colorArr = []
let correctColor = ''
let isCorrect = false
let isAccepting = true
let score = 0

function restartGame() {
  colorArr = []
  correctColor =  ''
  isAccepting = true
  isCorrect = false
  result.style.display = 'none'
  reset.style.visibility = 'visible'
}

function updateScore() {
  scoreText.innerText = `Score: ${score}`
}


function startGame() {
  restartGame()
  updateScore()
  correctColor = getColor()
  rgbText.innerText = correctColor.toUpperCase()
  colorArr.push(correctColor)
  for (let i=1; i<=8; i++) {
    colorArr.push(getColor())
  }

  putColor()
}


function getColor() {
  let red = Math.floor(Math.random() * (256 - 0) + 0)
  let green = Math.floor(Math.random() * (256 - 0) + 0)
  let blue = Math.floor(Math.random() * (256 - 0) + 0)
  return `rgb(${red}, ${green}, ${blue})`
}

function putColor() {
  colorArr = shuffle(colorArr)
  for (let i=0; i<colorArr.length; i++) {
    cells[i].style.background = colorArr[i]
  }
}
startCanva()
startGame()


cells.forEach(cell => cell.addEventListener('click', () => {
  if (isAccepting) {
    if (cell.style.background == correctColor) {
      console.log(`hey that's the correct color`)
      isCorrect = true
      score += 1
    } else {
      isCorrect = false
      console.log('try next time')
    }
    isAccepting = false
  }
  if (isCorrect) {
    resultImg.src = 'correct.png'
  } else {
    resultImg.src = 'wrong.png'
  }
  updateScore()
  result.style.display = 'block'
  cells.forEach(c => c.style.background = '')
  isCorrect = false
  reset.style.visibility = 'hidden'

  setTimeout(() => {
    startGame()
  }, 1000)
}))

reset.addEventListener('click', () => {
  score = 0
  updateScore()
})




