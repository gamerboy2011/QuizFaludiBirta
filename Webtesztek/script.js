document.addEventListener("DOMContentLoaded", () => {
    console.log("start")
    const form = document.getElementById("quiz-form");
    console.log("űrlap", form)
    const submitBtn = document.getElementById("submit-btn");
    const progressBar = document.getElementById("progress-bar")
    const resultDiv = document.getElementById("result")
    const scoreDisplay = document.getElementById("score")

    //helyes válaszok, bővítés esetén ide kell a helyes válaszaokat tenni
    const correctAnswers = [2, 2, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2, 1, 2,];


    //progress bar módosítása
    form.addEventListener("input", () => {
        const totalQuestions = correctAnswers.length;
        console.log("összes kérdés száma", totalQuestions)
        //tömb
        let createArray = Array.from(form.elements)
        console.log("Tömb", createArray)

        let answeredQuestions = createArray.filter((input) => input.type === "radio" && input.checked).length
        console.log("asd", answeredQuestions)

        const progress = Math.round((answeredQuestions / totalQuestions) * 100)
        console.log(progress)
        progressBar.style.width = `${progress}%`
        progressBar.setAttribute("aria-valuenow", progress);

        //küldés enegdéylezése
        submitBtn.disabled = answeredQuestions !== totalQuestions;
    })

    //kiértékelés
    form.addEventListener("submit", (event) => {
        event.preventDefault()

        let score = 0;
        correctAnswers.forEach((correctIndex, questionIndex) => {
            const questionName = `q${questionIndex + 1}`;
            console.log("kérdéesek nevei", questionName)
            const options = form.elements[questionName]
            console.log("Adott k", options)

            let userAnswer = null;
            //opciók leellenőrzése 
            Array.from(options).forEach((option, optionIndex) => {
                //bejelölteket mentjük
                if (option.checked) {
                    userAnswer = optionIndex;
                    console.log("felhasznalo valaszai", userAnswer)
                }
                //szinező
                if (optionIndex === correctIndex) {
                    option.parentElement.style.color = "green";
                    option.parentElement.style.fontWeight = "bold";
                } else if (option.checked && optionIndex !== correctIndex) {
                    option.parentElement.style.color = "red";
                } else {
                    option.parentElement.style.color = "black";
                    option.parentElement.style.fontWeight = "normal";
                }

                if (userAnswer === correctIndex){
                    score++
                }
            });
            // pontszám növelése
            resultDiv.style.display = "block"
            scoreDisplay.innerHTML = `A helyes válaszok száma:${score} /${correctAnswers.length}`


        })
    })
})