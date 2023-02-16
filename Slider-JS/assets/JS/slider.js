let slider = document.querySelector('.slider')
let prevBtn = slider.querySelector('.prev-btn')
let nextBtn = slider.querySelector('.next-btn')


// Events
window.addEventListener('load', () => {
    generateDots()
})

prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    slidertoPrev();        // Funksiyalar ilə işləməliyik
})

nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    sliderToNext();       // Funksiyalar ilə işləməliyik
})

// Functions
function slidertoPrev() {
    let activeItem = slider.querySelector('.inner .item.active')
    activeItem.classList.remove('active')

    if (activeItem.previousElementSibling != null) {
        activeItem.previousElementSibling.classList.add('active')
    }
    else {
        slider.querySelector('.inner .item:last-child').classList.add('active')
    }

    changeDotToPrev()
}

function sliderToNext() {
    let activeItem = slider.querySelector('.inner .item.active')  // Ilk olaraq active classı olan itemı tapmalıyam
    activeItem.classList.remove('active')  // Burda isə next'ə click edəndə həmin activi olan item'i silməliyəm

    if (activeItem.nextElementSibling != null) {  // if'dən ona görə istifadə etdimki item bitdikdən sonra error olaraq bizə null verir. Yəni sonrakı item nulla bərabər olmasın
        activeItem.nextElementSibling.classList.add('active') // nextElementSibling metodundan istifadə edərək active classın'ı itemın özündən sonra gələn qardaşına əlavə etmiş oluruq classList.add() ilə
    }
    else {
        // slider.querySelector('.inner').children[0].classList.add('active')
        slider.querySelector('.inner .item:first-child').classList.add('active') // Yuxarıdakı kodla eynidi
    }

    changeDotToNext()
    
}

function slideToIndex(index) {
    // For Item (image)
    let activeItem = slider.querySelector('.inner .item.active')
    activeItem.classList.remove('active')
    slider.querySelectorAll('.inner .item')[index].classList.add('active')

    // For dot (span)
    let activeDot = slider.querySelector('.dots span.active')
    activeDot.classList.remove('active')
    slider.querySelectorAll('.dots span')[index].classList.add('active')
    
}

function generateDots() {
    let item = [...slider.querySelectorAll('.inner .item')]
    // let item = slider.querySelectorAll('.inner .item')   // The same with above code line
    let dotDiv = document.createElement('div')
    dotDiv.className = 'dots'
    // dotDiv.classList.add('dots')  // The same with above code line
    item.forEach((item, index) => {
        let span = document.createElement('span')
        if (index == 0) {    // Yəni dostun activi ilk spandan başlasın
            span.className = 'active'
        }

        span.dataset.slideIndex = index    // slideIndex adını özümüz vermişik. İstədiyimiz adı verə bilərik

        span.addEventListener('click', function() {
            if (this.classList.contains('active')) {   // Əgər user hazır activdə olan spana click edirsə slide dəyişməsin. Ona görədə return qaytarmalııdı
                return
            }
            slideToIndex(this.dataset.slideIndex)  // Funksiyanı yuxarıda yaratmışam. İndexi qaytarır. 52 line
        })

        dotDiv.append(span)

    })
    slider.append(dotDiv)
    // console.log(slider);
}

function changeDotToPrev() {
    let activeDot = slider.querySelector('.dots span.active')
    activeDot.classList.remove('active')

    if (activeDot.previousElementSibling != null) {
        activeDot.previousElementSibling.classList.add('active')
    }
    else {
        slider.querySelector('.dots span:last-child').classList.add('active')
    }
}

function changeDotToNext() {
    let activeDot = slider.querySelector('.dots span.active')
    activeDot.classList.remove('active')

    if (activeDot.nextElementSibling != null) {
        activeDot.nextElementSibling.classList.add('active')
    }
    else {
        slider.querySelector('.dots span:first-child').classList.add('active')
    }
}

// setInterval(() => {     // setInterval() vasitəsiylə öz-özünə slide etməsi üçün vaxt təyin edə bilərik
//     sliderToNext()
// }, 3000);

