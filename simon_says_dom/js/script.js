/* 
📌Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi. Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.
Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

📌NOTA:
non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.

📌BONUS:
Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.
Se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.
*/
/*
📌SUMMARY:
- create var linked to html elements
- create functions needed
- submit form
- give results
*/
//*VAR*//
const countdownEl = document.getElementById("countdown")
const instructionsEl = document.getElementById("instructions")
const numberListEl = document.getElementById("numbers-list")
const formEl = document.getElementById("answers-form")
const inputGroupEl = document.getElementById("input-group")
const formControlEl = document.getElementsByClassName("form-control")
const submitBtnEl = document.querySelector(".btn")
const messageEl = document.getElementById("message")
let rightNumbers = 0
let randomlist = []
//*FUNCTIONS*//
function numbersGenerator() {
    for (let i = 0; i < 5; i++) {
        randomNumber = Math.floor(Math.random() * 50 + 1)
        numberListEl.insertAdjacentHTML("beforeend", `<li>${randomNumber}</li>`)
        randomlist.push(randomNumber)
    }
}
function countdownTimer(timer) {
    clock = setInterval(() => {
        countdownEl.innerText = timer--
        if (timer == -1) {
            clearInterval(clock)
            instructionsEl.innerText = "Inserisci i numeri che hai visto precedentemente, nell'ordine che preferisci."
            countdownEl.classList.add("d-none")
            numberListEl.classList.add("d-none")
            formEl.classList.remove("d-none")
        }
    }, 1000)
}
//*TIMEOUTS*//
setTimeout(numbersGenerator(), 5000)
setTimeout(countdownTimer(30), 5000)
//*FORM SUBMIT*//
formEl.addEventListener('submit', function numbersValidator() {
    event.preventDefault()
    for (let i = 0; i < randomlist.length; i++) {
        const thisNumber = randomlist[i];
        for (let i = 0; i < formEl.length; i++) {
            const thisInput = formEl[i];
            if (Number(thisInput.value) === thisNumber) {
                rightNumbers += 1
                messageEl.insertAdjacentHTML("beforeend", `<div>Hai azzeccato il numero: ${thisInput.value}</div>`);
            } else {
                rightNumbers += 0
            }
        }
    }
    submitBtnEl.disabled = true
    messageEl.insertAdjacentHTML("beforeend", `<div>In totale hai azzeccato ${rightNumbers} numeri!`)
}
)



