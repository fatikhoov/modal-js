const successSendModal = document.getElementById('success-send-modal')
const validSendModal = document.getElementById('valid-send-modal')
const btnSendModal = document.getElementById('btn-send-modal')
const loader = document.getElementById('loader-modal')
const onSuccessModal = document.getElementById('onSuccess__modal')
const btnSend = document.querySelector('.btn-send')

const TOKEN = '5982848535:AAHG_jfr5wVA9lTRAxhSxYnuzdBT5pGB3JM'
const CHATID = '459797765'

let s = 'Заявка из формы'

//блокируем кнопку после отправки
function checkValidity(event) {
  const formNode = event.target.form
  const isValid = formNode.checkValidity()
  btnSend.disabled = !isValid
  if (!btnSend.disabled && btnSendModal.classList.contains('hidden')) {
    return (
      validSendModal.classList.toggle('hidden'),
      btnSendModal.classList.toggle('hidden')
    )
  } else if (btnSend.disabled && validSendModal.classList.contains('hidden')) {
    return (
      validSendModal.classList.toggle('hidden'),
      btnSendModal.classList.toggle('hidden')
    )
  }
}

//обработка ошибки
function onError(error) {
  alert(error.message)
}

//обрабатываем успешную отправку
function onSuccess(formNode) {
  formNode.classList.toggle('hidden')
  onSuccessModal.classList.toggle('hidden')
  btnSendModal.classList.toggle('hidden')
  successSendModal.classList.toggle('hidden')
  btnSend.disabled = 'disabled'
}

//Лоадер нажатой кнопки формы
function toggleLoader() {
  btnSendModal.classList.toggle('hidden')
  loader.classList.toggle('hidden')
}

//отправка на сервер
async function sendData(data) {
  return await fetch(
    `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHATID}&parse_mode=HTML&text=${data}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
    }
  )
}
//сбор данных формы
function serializeForm(formNode) {
  const data = new FormData(formNode)
  Array.from(data.entries()).filter((e) => {
    s += `  |---|  ${e[0]}: ${e[1]}`
  })
  return s
}
//кнопка нажата, вызываем функции: сбор данных формы и отправка на сервер
// Вызовем её вот так:
async function handleFormSubmit(event) {
  event.preventDefault()
  const data = serializeForm(event.target)

  toggleLoader()

  const { status } = await sendData(data)

  toggleLoader()

  if (status === 200) {
    onSuccess(event.target)
  } else {
    onError(error)
  }
}

const applicantForm = document.getElementById('modal-form')
//пока форма не заполнена, кнопка недоступна
applicantForm.addEventListener('input', checkValidity)
//слушаем клик по кнопке формы
applicantForm.addEventListener('submit', handleFormSubmit)
