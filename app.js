const occupation = document.querySelector(".occupation-drop-down");
const state = document.querySelector(".state-drop-down");
const submit = document.querySelector(".form-btn");
const fullname = document.querySelector(".inputName");
const email = document.querySelector(".inputEmail");
const password = document.querySelector(".inputPassword");
const message = document.querySelector(".submit-message");
const p = document.querySelector(".fill-message");

const data = {
  name: [],
  email: [],
  password: [],
  occupation: [],
  state: [],
};

// console.log(fullname.value);
const getFormElements = function () {
  fetch(
    "https://guarded-taiga-80079.herokuapp.com/https://frontend-take-home.fetchrewards.com/form"
  )
    .then((response) => response.json())
    .then((data) => {
      const occupations = data.occupations;
      const states = data.states;

      occupations.forEach((occ) => {
        occupation.innerHTML += `<option value="${occ}">${occ}</option>`;
      });

      states.forEach((st) => {
        // console.log(states);
        state.innerHTML += `<option value="${st.name}">${st.name}, ${st.abbreviation}</option>`;
      });
    });
};

//Event Handler

submit.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    fullname.value &&
    email.value &&
    password.value &&
    occupation.value &&
    state.value
  ) {
    data.name.push(fullname.value);
    data.email.push(email.value);
    data.password.push(password.value);
    data.occupation.push(occupation.value);
    data.state.push(state.value);

    fullname.value =
      email.value =
      password.value =
      occupation.value =
      state.value =
        "";
    p.style.opacity = 0;
    message.style.opacity = 1;

    setTimeout(function () {
      message.style.opacity = 0;
      p.style.opacity = 1;
    }, 3000);
  }
});

getFormElements();

let post = new XMLHttpRequest();
post.open("POST", "https://reqbin.com/echo/post/json");
post.setRequestHeader("Accept", "application/json");
post.setRequestHeader("Content-Type", "application/json");

post.onreadystatechange = function () {
  if (post.readyState === 4) {
    console.log(post.status);
    console.log(post.responseText);
  }
};

post.send(data);
