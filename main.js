const students = [
  {
    id: 1,
    name: 'Harry Potter',
    house: 'Gryffindor',
    type: 'student'
  },
  {
    id: 2,
    name: 'Draco Malfoy',
    house: 'Slytherin',
    type: 'student'
  },
  {
    id: 3,
    name: 'Luna Lovegood',
    house: 'Ravenclaw',
    type: 'student'
  },
  {
    id: 4,
    name: 'Cedric Digory',
    house: 'Hufflepuff',
    type: 'student'
  }
];

const expelled = [
  {
    id: 1,
    name: 'Peter Pettigrew',
    reason: 'For naming He Who Must Not Be Named',
    type: 'expelled'
  },
  {
    id: 2,
    name: 'Tom Riddle',
    reason: 'For being the mf Dark Lord!',
    type: 'expelled'
  }
]

//**** Query Selectors
const page = document.querySelector('#page');
const welcomeDiv = document.querySelector('#welcome');
const welcomeBtn = document.querySelector('#welcomeBtn');
const cards = document.querySelector('#cards');
const studentCards = document.querySelector('#student-cards');
const expelledCards = document.querySelector('#expelled-cards');

//**** Functions
const renderToDom = (divId, html) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = html;
}

// Card on Welcome Screen
const welcomeCard = () => {
  let domString = `<div class="card" style="width: 18rem;">
  <img src="https://www.pngkey.com/png/full/106-1067907_sorting-hat-png-harry-potter-sorting-hat-png.png" class="card-img-top" alt="Hogwarts Sorting Hat">
  <div class="card-body">
    <h5 class="card-title">Welcome to Hogwarts!</h5>
    <p class="card-text">Before classes begin, all young Witches and Wizards must be sorted into a House!</p>
    <a href="#"  id='welcomeBtn' class="btn btn-dark">Get Started</a>
  </div>
</div>
`;
  renderToDom('#welcome', domString);
}
// Populate DOM with HTML when button on welcome card is pressed
const populate = () => {
  const domString = `<h1>Welcome to Hogwarts</h1>
  <form id="form">
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Witch/Wizard Name:" aria-label="Recipient's username" aria-describedby="basic-addon2" id="name" required>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="submit">Sort!</button>
      </div>
    </div>
  <div class="btn-group" role="group" aria-label="Basic mixed styles example">
    <button type="button" class="btn btn-secondary" id="all">All</button>
    <button type="button" class="btn btn-danger" id="gryffindor">Gryffindor</button>
    <button type="button" class="btn btn-warning" id="hufflepuff">Hufflepuff</button>
    <button type="button" class="btn btn-primary" id="ravenclaw">Ravenclaw</button>
    <button type="button" class="btn btn-success" id="slytherin">Slytherin</button>
  </div>`;
  welcomeDiv.style.display = 'none';
  renderToDom('#page', domString);
  cardsOnDom(students, '#student-cards');
  cardsOnDom(expelled, '#expelled-cards');
};
// Puts the cards in the different Divs
const cardsOnDom = (array, div) => {
  let domString = '';
  for (obj of array) {
    if (obj.type === 'student') {
      domString += `<div class="card" style="width: 18rem;">
    <img class="card-img-top ${obj.house}" src="./Media/${obj.house}.png" alt="${obj.house} Crest">
    <div class="card-body ${obj.house}-card">
      <h5 class="card-title">${obj.name}</h5>
      <p class="card-text">${obj.house}</p>
      <a href="#" class="btn ${obj.house} ${obj.house}-btn" id="expel--${obj.id}">Expelliarmus!</a>
    </div>
  </div>`
    } else if (obj.type === 'expelled') {
      domString += `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${obj.name}</h5>
      <p class="card-text">${obj.reason}</p>
      <a href="#" class="btn btn-dark" id="become--${obj.id}">Expelliarmus!</a>
    </div>
  </div>`
    }
  }
  renderToDom(div, domString);
}
// Creates new student when the Sort button is pressed
const newStudent = (event) => {
  event.preventDefault;
  const randomHouse = () => {
    const randNum = Math.floor(Math.random() * 4 + 1);
    switch (randNum) {
      case 1:
        return 'Gryffindor'
        break;
      case 2:
        return 'Ravenclaw'
        break;
      case 3:
        return 'Slytherin'
        break;
      case 4:
        return 'Hufflepuff'
        break;
    }
  }
  const student =
  {
    id: students.length + 1,
    name: document.querySelector('#name').value,
    house: randomHouse(),
    type: 'student'
  }
  students.push(student);
  cardsOnDom(students, '#student-cards');
  form.reset();
}
// Filters for the House Buttons
const houseFilter = (event) => {
  if (event.target.id === 'gryffindor') {
    const gryff = students.filter(obj => obj.house === "Gryffindor")
    cardsOnDom(gryff, '#student-cards');
  } else if (event.target.id === 'hufflepuff') {
    const puff = students.filter(obj => obj.house === "Hufflepuff")
    cardsOnDom(puff, '#student-cards');
  } else if (event.target.id === 'ravenclaw') {
    const raven = students.filter(obj => obj.house === "Ravenclaw")
    cardsOnDom(raven, '#student-cards');
  } else if (event.target.id === 'slytherin') {
    const slither = students.filter(obj => obj.house === "Slytherin")
    cardsOnDom(slither, '#student-cards');
  } else if (event.target.id === 'all') {
    cardsOnDom(students, '#student-cards');
  }
}

//**** Event Listeners

// Runs populate() when Welcome Card button is pressed
welcome.addEventListener('click', e => {
  if (e.target.id === 'welcomeBtn') {
    populate();
  }
});
// Moves cards from Students to Expelled, and removes cards from Expelled.
cards.addEventListener('click', e => {
  if (e.target.id.includes('expel')) {
    [, taco] = e.target.id.split('--');
    const indexOfObj = students.findIndex(obj => obj.id === Number(taco));
    const expelledStudent = students.splice(indexOfObj, 1);
    const randReason = () => {
      const randNum = Math.floor(Math.random() * 4 + 1);
      switch (randNum) {
        case 1:
          return 'Being a turd'
          break;
        case 2:
          return 'Unspeakable Curse'
          break;
        case 3:
          return 'Some Death Eater Shit'
          break;
        case 4:
          return 'Being a total dick'
          break;
      }
    }
    const newExpelled = {
      id: expelled.length + 1,
      name: expelledStudent[0].name,
      reason: randReason(),
      type: 'expelled'
    }
    expelled.push(newExpelled);
  } else if (e.target.id.includes('become')) {
    [, taco] = e.target.id.split('--');
    const indexOfObj = expelled.findIndex(obj => obj.id === Number(taco));
    expelled.splice(indexOfObj, 1);
  }
  cardsOnDom(students, '#student-cards');
  cardsOnDom(expelled, '#expelled-cards');
})
// Creates a new Student Card
page.addEventListener('submit', newStudent)
// Filters for the House Buttons
page.addEventListener('click', houseFilter)

// Initial Page Load
const startApp = () => {
  welcomeCard();
}
startApp();
