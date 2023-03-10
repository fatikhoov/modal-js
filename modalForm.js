//Лоадер нажатой кнопки формы
function toggleLoader() {
  const btnSendModal = document.getElementById('btn-send-modal')
  const loader = document.getElementById('loader-modal')
  btnSendModal.classList.toggle('hidden')
  loader.classList.toggle('hidden')
}

//отправка на сервер
async function sendData(data) {
  const TOKEN = '5982848535:AAHG_jfr5wVA9lTRAxhSxYnuzdBT5pGB3JM'
  const CHATID = '459797765'
  return await fetch(
    `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHATID}&parse_mode=html&text=${data}`,
    {
      method: 'POST',
    }
  )
    .then((res) => res.json())
    .then((response) => {
      if (!response.ok)
        return console.log('ошибка', response.ok, response.result)
      return console.log('Успешно', response.ok, response.result)
    })
    .catch((error) => {
      console.error(error)
    })
}
//сбор данных формы
function serializeForm(formNode) {
  const data = new FormData(formNode)
  console.log('22/', JSON.stringify(Array.from(data.entries())))
  return JSON.stringify(Array.from(data.entries()))
}
//кнопка нажата, вызываем функции: сбор данных формы и отправка на сервер
async function handleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)

  toggleLoader()

  const response = await sendData(data)

  setTimeout(() => {
    toggleLoader()
    //нужно закрыть модалку и показать модалку с результатом
  }, 3000)
}

//слушаем клик по кнопке формы
const applicantForm = document.getElementById('modal-form')
applicantForm.addEventListener('submit', handleFormSubmit)
