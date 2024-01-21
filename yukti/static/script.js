
var feverCheckbox = document.querySelector('input[name="fever"]');
var coughCheckbox = document.querySelector('input[name="cough"]');
var fatigueCheckbox = document.querySelector('input[name="fatigue"]');
var Age = document.querySelector('input[name="Age"]');
var breathingDifficultyCheckbox = document.querySelector('input[name="breathingDifficulty"]');
var genderSelect = document.getElementById('gender');
var bloodPressureSelect = document.getElementById('bloodPressure');
var cholesterolLevelSelect = document.getElementById('cholesterolLevel');

function checkHealth() {
    var data = [[
        feverCheckbox.checked ? 'Yes' : 'No',
        coughCheckbox.checked ? 'Yes' : 'No',
        fatigueCheckbox.checked ? 'Yes' : 'No',
        breathingDifficultyCheckbox.checked ? 'Yes' : 'No',
        Age.value,
        genderSelect.value,
        bloodPressureSelect.value,
        cholesterolLevelSelect.value
    ]];
    console.log(data);
    console.log("Btn clicked");
    if (!feverCheckbox.checked && !coughCheckbox.checked && !fatigueCheckbox.checked && !breathingDifficultyCheckbox.checked) {
        console.log("You are free from diseases");
        diseasepred.innerText = `You are free from diseases`;
    }
    else if (Age.value > 100 || Age.value < 2) {
        diseasepred.innerText = `The age entered should be greater than 2 and less than 100.`;
    }
    else {
        $.ajax({
            type: "POST",
            url: "/",
            data: {
                data: JSON.stringify(data),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function (response) {
                if (response.result != "None") {
                    if (bloodPressureSelect.value=="Normal" && cholesterolLevelSelect.value=="Normal"){
                        diseasepred.innerText = `There can be a chance of ` + response.result;
                    }
                    else{
                        diseasepred.innerText = `It feels like you may have a risk of `+ response.result + ' in you future';

                    }
                }
                else {
                    diseasepred.innerText = `You are free from any serious illnesses.`;
                }
                animateParagraph("diseasepred",100)

                console.log(`Ans:` + response.result);
            },
            error: function (error) {
                console.error("Error:", error);
            }
        });
    }
}


function animateParagraph(paragraphId, delay = 100) {
    const paragraph = document.getElementById(paragraphId);
    const words = paragraph.textContent.split(" ");

    let index = 0;
    const animateWord = () => {
        paragraph.textContent = words.slice(0, index + 1).join(" ");
        index++;
        if (index < words.length) {
            setTimeout(animateWord, delay);
        }
    };

    animateWord();
}
