// jQuery Chosen plugin function
$(".chosen-select").chosen({
    no_results_text: "Oops, nothing found!"
})

// navbar functionalities
navBar = document.querySelector('nav')
menuBtns = document.querySelectorAll('.menu-icon')
overlay = document.querySelector('.overlay')

menuBtns.forEach((elem) => {
    elem.addEventListener("click", () => {
        navBar.classList.toggle("open")
    })
})

overlay.addEventListener("click", () => {
    navBar.classList.toggle("open")
})

// navbar image input selection functionality
function displayImgInputField() {
    if (document.getElementById('img-select1-input').checked) {
        document.getElementById('img-url-input').classList.remove('hidden')
        document.getElementById('img-upload-input').classList.add('hidden')
    }
    else if (document.getElementById('img-select2-input').checked) {
        document.getElementById('img-url-input').classList.add('hidden')
        document.getElementById('img-upload-input').classList.remove('hidden')
    }
}

var imgSelectionInputs = [
    document.getElementById('img-select1-input'),
    document.getElementById('img-select2-input')
]

imgSelectionInputs.forEach((elem) => {
    if (elem)
        elem.addEventListener("click", displayImgInputField)
})


// modal functionalities
function openModal() {
    var backdrop = document.getElementById('modal-backdrop')
    var modal = document.getElementById('add-bday-modal')
    var modalContainer = document.getElementById('modal-container')
    var interestsInput = document.getElementsByClassName('chosen-container') // note: must manually set width of jQuery's chosen plugin field to avoid issues

    backdrop.classList.remove('hidden')
    modal.classList.remove('hidden')
    modalContainer.classList.add('on')
    interestsInput[0].style.width = "100%"
}

var addBdayBtn = document.getElementById('add-bday-btn')
if (addBdayBtn) {
    addBdayBtn.addEventListener('click', openModal)
}

function clearModalInputs() {
    var valueInputs = [
        document.getElementById('name-input'),
        document.getElementById('date-input'),
        document.getElementById('img-url-input'),
        document.getElementById('img-upload-input')
    ]
    valueInputs.forEach((elem) => {
        elem.value = ''
    })

    var radioInputs = [
        document.getElementById('img-select1-input'),
        document.getElementById('img-select2-input'),
    ]
    radioInputs.forEach((elem) => {
        elem.checked = false
    })

    var hiddenInputs = [
        document.getElementById('img-url-input'),
        document.getElementById('img-upload-input')
    ]
    hiddenInputs.forEach((elem) => {
        elem.classList.add('hidden')
    })

    // clear interests field
}

function closeModal() {
    var backdrop = document.getElementById('modal-backdrop')
    var modal = document.getElementById('add-bday-modal')
    var modalContainer = document.getElementById('modal-container')

    backdrop.classList.add('hidden')
    modal.classList.add('hidden')
    modalContainer.classList.remove('on')

    clearModalInputs()
}

var backdrop = document.getElementById('modal-backdrop')
var addModalCancelBtn = document.getElementById('cancel-btn')

if (addModalCancelBtn) {
    addModalCancelBtn.addEventListener('click', closeModal)
}
if (backdrop) {
    backdrop.addEventListener('click', closeModal)
}


// modal submit functionality
// create birthday obj from user input and store on server's database
var addCardSubmit = document.getElementById('submit-btn')
if (addCardSubmit) {
    addCardSubmit.addEventListener("click", (event) => {
        event.preventDefault()
    
        var name = document.getElementById('name-input').value.trim()
        var bday = document.getElementById('date-input').value
        var imgUrl
        var interests = []

        if (document.getElementById('img-select1-input').checked) 
            imgUrl = document.getElementById('img-url-input').value.trim()
        else if (document.getElementById('img-select2-input').checked && document.getElementById('img-upload-input').files.length > 0)
            imgUrl = URL.createObjectURL(document.getElementById('img-upload-input').files[0])

        var interestsForm = document.getElementById('interests-input')
        var chosenInterests = interestsForm.options
        for (var i = 0; i < chosenInterests.length; i++) {
            if (chosenInterests[i].selected) {
                interests.push(chosenInterests[i].value)
            }
        }

        if (!name || !bday) {
            alert("Please enter a name and birthday")
        }
        else {
            fetch("/addBirthday", {
                method: "POST",
                body: JSON.stringify({
                    name: name,
                    date: bday,
                    imgUrl: imgUrl,
                    interests: interests,
                }), 
                headers: {
                    "Content-Type": "application/json"
                }

            }).then(function(res) {
                if (res.status == 200) {
                    closeModal()
                    window.location.href = '/birthdays'

                    // Add object to client DOM
                    // console.log(bday[1])
                    // var birthdayCardHtml = Handlebars.templates.birthdayCard({
                    //     name: name,
                    //     age: 0,
                    //     date: bday,
                    //     img_url: imgUrl
                    // })
                    // var birthdaysContainer = document.getElementById('birthday-cards-box')
                    // birthdaysContainer.insertAdjacentHTML('beforeend', birthdayCardHtml)
                }
            })
        }
    })
}


// generate gift functionalities
var generateGiftBtns = document.getElementsByClassName('bday-card-gift');
if (generateGiftBtns) {
    for (var i = 0; i < generateGiftBtns.length; i++) {
        generateGiftBtns[i].addEventListener('click', function(event) {
            // whenever gift button is clicked, use event obj to locate corresponding record ID of bday card
            var btnClicked = event.currentTarget
            var recordId = btnClicked.parentElement.parentElement.parentElement.parentElement.getAttribute("data-value")

            fetch("/generateGift", {
                method: "POST",
                body: JSON.stringify({recordId}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {

                // pre-fill popup with generated gift idea
                var popupName = document.querySelector("#gift-popup .name")
                popupName.textContent = data.name

                var popupDesc = document.querySelector("#gift-popup .desc")
                popupDesc.textContent = data.description

                var giftBackdrop = document.getElementById("gift-popup-backdrop")
                giftBackdrop.classList.remove("hidden")

                var popup = document.getElementById("gift-popup")
                popup.classList.add("active")
            })
        })
    }
}

var giftPopupClose = [
    document.getElementById("gift-popup-backdrop"),
    document.getElementById("gift-popup-close")
]

giftPopupClose.forEach((elem) => {
    if (elem) {
        elem.addEventListener("click", () => {
            var popup = document.getElementById("gift-popup")
            popup.classList.remove("active")

            var giftBackdrop = document.getElementById("gift-popup-backdrop")
            giftBackdrop.classList.add("hidden")
        })
    }
})