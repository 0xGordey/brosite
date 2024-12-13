// Находим элементы
const menuToggle = document.querySelector('.menu-toggle')
const navbar = document.querySelector('.navbar')
const navbarLinks = document.querySelectorAll('.navbar a')
const header = document.querySelector('header')

// Обработчик клика по кнопке меню
menuToggle.addEventListener('click', () => {
	navbar.classList.toggle('active')
})

// Обработчик клика по пунктам меню
navbarLinks.forEach(link => {
	link.addEventListener('click', () => {
		navbar.classList.remove('active') // Закрыть меню при клике на пункт
	})
})

// Обработчик клика вне меню для его закрытия
document.addEventListener('click', event => {
	if (!navbar.contains(event.target) && !menuToggle.contains(event.target)) {
		navbar.classList.remove('active') // Закрыть меню, если клик был вне его области
	}
})

window.addEventListener('scroll', function () {
	const header = document.querySelector('header')
	const scrollPosition = window.scrollY // положение прокрутки

	// Скорректировать прозрачность в зависимости от прокрутки
	const opacity = Math.min(0.6 + scrollPosition / 1000, 0.9) // увеличиваем темность с прокруткой
	header.style.setProperty('--header-darkness', opacity)
})
