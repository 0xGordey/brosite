const url_api = 'http://localhost:3000/messages'
document
	.getElementById('submitButton')
	.addEventListener('click', function (event) {
		event.preventDefault() // Отменить стандартное поведение формы

		// Блок сообщения
		const formMessage = document.getElementById('formMessage')

		const serviceTab = document.getElementById('serviceTab')

		// Собираем данные из формы
		const userName = document.getElementById('userName').value
		const userPhone = document.getElementById('userPhone').value
		const appointmentTime = document.getElementById('appointmentTime')
			? document.getElementById('appointmentTime').value
			: null
		const serviceSelect = document.getElementById('serviceSelect').value
		const otherProblem = document.getElementById('otherProblem')
			? document.getElementById('otherProblem').value
			: null

		// Проверяем текущий активный таб
		const isServiceTabActive = serviceTab.classList.contains('active')

		// Очищаем сообщение перед новой отправкой
		formMessage.textContent = ''
		formMessage.className = ''

		// Валидация обязательных полей
		if (
			!userName ||
			!userPhone ||
			(serviceSelect === 'other' && !otherProblem) ||
			(isServiceTabActive && (!appointmentTime || !serviceSelect))
		) {
			formMessage.textContent = 'Пожалуйста, заполните все обязательные поля!'
			formMessage.className = 'form-message error'
			return
		}

		const phoneRegex = /^\+7\d{10}$/
		if (!phoneRegex.test(userPhone)) {
			formMessage.textContent = 'Номер телефона некорректный!'
			formMessage.className = 'form-message error'
			return
		}

		// Если дата и время записи выбраны, преобразуем в timestamp
		let appointmentTimestamp = null
		if (appointmentTime) {
			appointmentTimestamp = new Date(appointmentTime).getTime() // Преобразуем в timestamp
		}

		// Формируем объект данных
		const formData = {
			userName,
			userPhone,
			appointmentTime: appointmentTimestamp, // Добавляем timestamp
			serviceSelect,
			otherProblem,
			tab: isServiceTabActive,
		}

		// Отправляем данные на сервер через fetch
		fetch(url_api, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData), // Преобразуем данные в формат JSON
		})
			.then(response => response.json()) // Обрабатываем ответ от сервера
			.then(data => {
				// Выводим успех
				if (data.message == 'send ok') {
					formMessage.textContent = 'Данные успешно отправлены!'
					formMessage.className = 'form-message success'
				} else {
					throw 'error'
				}
			})
			.catch(error => {
				// Выводим ошибку
				console.error('Ошибка при отправке данных:', error)
				formMessage.textContent = 'Произошла ошибка при отправке данных.'
				formMessage.className = 'form-message error'
			})
	})
