document.addEventListener('DOMContentLoaded', () => {
	const modal = document.getElementById('modal')
	const closeModal = document.querySelector('.close')
	const serviceTab = document.getElementById('serviceTab')
	const consultationTab = document.getElementById('consultationTab')

	const appointmentTimeGroup = document.getElementById('appointmentTimeGroup')
	const serviceSelectGroup = document.getElementById('serviceSelectGroup')
	const otherDescriptionGroup = document.getElementById('otherDescription')

	const modalTitle = document.getElementById('modalTitle')
	const modalBody = document.getElementById('modalBody')

	let currentTab = 'service' // Хранить текущий активный таб

	// Функция для открытия модального окна
	function openModal({ content, tab }) {
		const selectElement = document.getElementById('serviceSelect')

		if (content === '-') {
			clearFormFields()
		}

		// Если передан контент, устанавливаем его в поле выбора
		if (content) {
			for (let option of selectElement.options) {
				if (option.textContent.trim() === content) {
					selectElement.value = content
					option.selected = true
					break
				}
			}
		}

		// Переключаемся на указанный таб
		switchTab(tab || 'service')

		// Показываем модальное окно
		modal.style.display = 'flex'
		document.body.classList.add('no-scroll')
	}

	// Функция для закрытия модального окна
	function closeModalHandler() {
		modal.style.display = 'none'
		document.body.classList.remove('no-scroll')
	}

	// Функция для переключения между табами
	function switchTab(tab) {
		const isServiceTab = tab === 'service'

		// Очистка данных при переключении таба, если это не первый раз
		if (currentTab !== tab) {
			clearFormFields() // Очищаем только при переключении
		}

		// Обновляем заголовок и текст
		modalTitle.textContent = isServiceTab
			? 'Запись на услугу'
			: 'Получить консультацию'
		modalBody.textContent = isServiceTab
			? 'Заполните данные для записи:'
			: 'Заполните данные для консультации:'

		// Отображение/скрытие полей
		appointmentTimeGroup.style.display = isServiceTab ? 'block' : 'none'
		serviceSelectGroup.style.display = isServiceTab ? 'block' : 'none'
		otherDescriptionGroup.style.display = 'none' // Скрываем описание для других услуг

		// Установка или удаление атрибута required
		const appointmentTime = document.getElementById('appointmentTime')
		const serviceSelect = document.getElementById('serviceSelect')

		if (isServiceTab) {
			appointmentTime.setAttribute('required', 'true')
			serviceSelect.setAttribute('required', 'true')
		} else {
			appointmentTime.removeAttribute('required')
			serviceSelect.removeAttribute('required')
		}

		// Переключение активных классов
		serviceTab.classList.toggle('active', isServiceTab)
		consultationTab.classList.toggle('active', !isServiceTab)

		// Обновляем текущий активный таб
		currentTab = tab
	}

	// Очистка данных в полях формы
	function clearFormFields() {
		// Очистить поля выбора даты
		const appointmentTime = document.getElementById('appointmentTime')
		appointmentTime.value = ''

		// Очистить поле выбора услуги
		const serviceSelect = document.getElementById('serviceSelect')
		serviceSelect.value = ''

		const otherProblem = document.getElementById('otherProblem')
		otherProblem.value = ''

		// Скрыть описание для других услуг
		otherDescriptionGroup.style.display = 'none'
	}

	// Навешиваем обработчик на все кнопки для открытия модального окна
	document
		.querySelectorAll('.openModalBtn, div.openModalBtn')
		.forEach(element => {
			element.addEventListener('click', () => {
				const content = element.getAttribute('data-content') // Получаем значение из data-content
				const tab = element.getAttribute('data-tab') // Получаем нужный таб
				openModal({ content, tab }) // Передаем в openModal
			})
		})

	// Закрытие модального окна при клике на крестик
	closeModal.addEventListener('click', closeModalHandler)

	// Закрытие модального окна при клике на темную область
	window.addEventListener('click', event => {
		if (event.target === modal) {
			closeModalHandler()
		}
	})

	// Переключение табов
	serviceTab.addEventListener('click', () => switchTab('service'))
	consultationTab.addEventListener('click', () => switchTab('consultation'))

	// Отслеживание изменения выбора в выпадающем списке
	const serviceSelect = document.getElementById('serviceSelect')
	serviceSelect.addEventListener('change', () => {
		// Показываем или скрываем поле в зависимости от выбранной опции
		if (serviceSelect.value === 'other') {
			otherDescriptionGroup.style.display = 'block'
		} else {
			otherDescriptionGroup.style.display = 'none'
		}
	})
})
