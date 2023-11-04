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