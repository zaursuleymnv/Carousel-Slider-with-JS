let items = [...document.querySelectorAll("[data-fancybox='gallery']")]  // FindIndex ilə indexini tapmaq üçün array olmalıdı
let modal = document.querySelector('.my-modal')




// events
items.forEach(e => {
    e.addEventListener('click', function(e) {
        e.preventDefault()    // linklərdə href məntiqinin işləməməyi üçün yazmışam yoxsa JS işləməz

        this.classList.add('active-item')    // next və prev buttonları üçün lazım olacaq

        setSlideImage(this.getAttribute('href'))    // Şəklin yolunu götürüb aşağıdakı setSlideImage(imgPath) funksiyasına təyin edtim

        openModal()

        setCaption(findImagePosition(this), this.getAttribute('title'))
    })
})

modal.addEventListener('click', function(e) {
    if (e.target == this) {
        closeModal()
    }
})

// Close button
let closeBtn = modal.querySelector('.btn-close')
closeBtn.addEventListener('click', closeModal)

// Prev button
let prevBtn = modal.querySelector('.prev-btn')
prevBtn.addEventListener('click', prev)

// Next button
let nextBtn = modal.querySelector('.next-btn')
nextBtn.addEventListener('click', next)




//functions 
function openModal() {
    modal.style.display = 'flex'

    window.addEventListener('keyup', ketBoardAction)
    window.addEventListener('mousewheel', mouseAction)
}

function closeModal() {
    modal.style.display = null

    modal.querySelector('.inner img').src = ''   // Şəkli bağlayanda məlumatları resetləsin (silsin)
    modal.querySelector('.inner .caption span:first-child').innerHTML = ''
    modal.querySelector('.inner .caption span:last-child').innerText = ''

    window.removeEventListener('keyup', ketBoardAction)
    window.removeEventListener('mousewheel', mouseAction)

}

function setSlideImage(imgPath) {
    modal.querySelector('.inner img').src = imgPath      // Click Etdiyimiz şəklin yolunu təyin edirik

    checkActionButtons()
}

function setCaption(index, title) {   // Caption hissəsini düzəltmək üçündü
    modal.querySelector('.inner .caption span:first-child').innerHTML = `Image ${index}/${items.length}`
    modal.querySelector('.inner .caption span:last-child').innerText = title
}

function findImagePosition(item) {
    return items.findIndex(i => {     // return yazmalıyıq
        return i == item
    }) + 1
}

function prev() {
    let activeItem = document.querySelector('.active-item')
    console.log(activeItem);

    if (activeItem.previousElementSibling == null) {
        return
    }

    activeItem.classList.remove('active-item')

    activeItem.previousElementSibling.classList.add('active-item')

    setSlideImage(activeItem.previousElementSibling.getAttribute('href'))  // Şəkli tapmaq üçün yolunu qeyd etdim
    
    setCaption(findImagePosition(activeItem.previousElementSibling), activeItem.previousElementSibling.getAttribute('title'))   // Caption hissəsini dəyişmək üçün
    
}

function next() {
    let activeItem = document.querySelector('.active-item')
    // console.log(activeItem);

    if (activeItem.nextElementSibling == null) {
        return
    }

    activeItem.classList.remove('active-item')

    activeItem.nextElementSibling.classList.add('active-item')

    setSlideImage(activeItem.nextElementSibling.getAttribute('href'))  // Şəkli tapmaq üçün yolunu qeyd etdim

    setCaption(findImagePosition(activeItem.nextElementSibling), activeItem.nextElementSibling.getAttribute('title'))   // Caption hissəsini dəyişmək üçün
}

function checkActionButtons() {   // Funksiyanı setSlideImage(imgPath) funksiyasında çağırdım. Çümki slayt orda dəyişir
    let activeItem = document.querySelector('.active-item')

    // For next button
    if (activeItem.nextElementSibling == null) {
        nextBtn.style.display = 'none'
    }
    else {
        nextBtn.style.display = 'flex'
    }

    // For prev button
    if (activeItem.previousElementSibling == null) {
        prevBtn.style.display = 'none'
    }
    else {
        prevBtn.style.display = 'flex'
    }
}

function ketBoardAction(e) {
    // console.log(e);

    if (e.code == 'ArrowRight') {
        next()
        return
    }
    else if (e.code == 'ArrowLeft') {
        prev()
        return
    }
    else if (e.code == 'Space') {
        closeModal()
        return
    }
}

function mouseAction(e) {

    if (e.deltaY > 0) {
        next()
    }
    else {
        prev()
    }

}

