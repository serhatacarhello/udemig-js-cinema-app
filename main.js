const container = document.querySelector('.seats-container')
// console.log(container)
const count = document.getElementById('count')
// console.log('🚀 ~ file: main.js:4 ~ count:', count)
const total = document.getElementById('total')
// console.log('🚀 ~ file: main.js:6 ~ total:', total)
const movieList = document.querySelector('#movie-select')
// console.log('🚀 ~ file: main.js:8 ~ movieList:', movieList)
const infoText = document.querySelector('.info-text')
// console.log('🚀 ~ file: main.js:10 ~ infoText:', infoText)
//NodeList
const seats = document.querySelectorAll('.seat:not(.reserved')
// console.log('🚀 ~ file: main.js:12 ~ seats:', seats)

//Database functions start
function saveSeatsToDatabase(seatIndex) {
  // console.log(seatIndex)

  localStorage.setItem('seatsIndex', JSON.stringify(seatIndex))
}

function saveMovieIndexToDataBase(selectedIndex) {
  localStorage.setItem('movieIndex', JSON.stringify(selectedIndex))
}

function getSeatsFromDataBase() {
  const dbSelectedSeats = JSON.parse(localStorage.getItem('seatsIndex'))
  // console.log(
  // '🚀 ~ file: main.js:23 ~ getSeatsFromDataBase ~ dbSelectedSeats:',
  // dbSelectedSeats
  // )
  if (dbSelectedSeats !== null && dbSelectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (dbSelectedSeats.includes(index)) {
        seat.classList.add('selected')
      }
    })
  }
}
getSeatsFromDataBase()

function getSelectedMovieIndexFromDatabase() {
  const dbSelectedMovie = JSON.parse(localStorage.getItem('movieIndex'))
  movieList.selectedIndex = dbSelectedMovie
}
getSelectedMovieIndexFromDatabase()

//Database functions finish

function createSeatIndex() {
  const allSeatsArray = []
  //Convert nodeList to an array
  seats.forEach((seat) => {
    allSeatsArray.push(seat)
  })
  // console.log(
  // '🚀 ~ file: main.js:27 ~ createSeatIndex ~ allSeatsArray:',
  // allSeatsArray
  // )
  //Create an selected seats array
  const allSelectedSeatsArray = []
  const allSelectedSeats = container.querySelectorAll('.seat.selected')
  allSelectedSeats.forEach((selectedSeat) => {
    allSelectedSeatsArray.push(selectedSeat)
  })
  // console.log(
  // '🚀 ~ file: main.js:38 ~ createSeatIndex ~ allSelectedSeatsArray:',
  // allSelectedSeatsArray
  // )
  // Get selected seat index
  const selectedSeatIndex = allSelectedSeatsArray.map((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat)
  })
  // console.log(
  // '🚀 ~ file: main.js:50 ~ selectedSeatsIndexes ~ selectedSeatsIndexes:',
  // selectedSeatIndex
  // )

  saveSeatsToDatabase(selectedSeatIndex)
  // console.log('saved', selectedSeatIndex)
}

const showTotalText = (selectedSeatsCount) => {
  if (!selectedSeatsCount) {
    infoText.classList.remove('open')
  } else {
    infoText.classList.add('open')
  }
}
const calculateTotal = () => {
  let selectedSeatsCount = container.querySelectorAll('.seat.selected').length
  // console.log(
  // '🚀 ~ file: main.js:69 ~ calculateTotal ~ selectedSeatsCount:',
  // selectedSeatsCount
  // )

  count.textContent = selectedSeatsCount
  total.textContent = selectedSeatsCount * movieList.value

  //show total text
  showTotalText(selectedSeatsCount)
}

calculateTotal()

//Toggle selected seat
container.addEventListener('click', (e) => {
  const clickedSeat = e.target.parentElement
  // console.log('🚀 ~ file: main.js:18 ~ clickedSeat:', clickedSeat)
  if (
    clickedSeat.classList.contains('seat') &&
    !clickedSeat.classList.contains('reserved')
  ) {
    clickedSeat.classList.toggle('selected')
    createSeatIndex()
    calculateTotal()
  }
})

//calculate total on movie change and save selected option index
movieList.addEventListener('change', (e) => {
  let selectedIndex = movieList.selectedIndex
  // console.log(
  // '🚀 ~ file: main.js:110 ~ movieList.addEventListener ~ selectedIndex:',
  // selectedIndex
  // )
  saveMovieIndexToDataBase(selectedIndex)
  calculateTotal()
})
