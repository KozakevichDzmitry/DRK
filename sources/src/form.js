import imgloading from './image/icon/loading.gif'


export class Form {
    constructor(form, body) {
        this.form = document.querySelector(form);
        this.formBody = document.querySelector(body);
        this.profile = "private";
        if (this.form) {
            this.btnProfiles = this.form.querySelectorAll('[data-profile]');
            this.btnDelivery = this.form.querySelectorAll('[data-delivery]');
            this.form.addEventListener('submit', this.checkForm.bind(this))
            if (this.btnProfiles.length > 0) {
                this.btnProfiles.forEach((item) => {
                    if (item.tagName === 'SELECT') {
                        item.addEventListener('change', this.changeProfile.bind(this))
                    } else {
                        item.addEventListener('click', this.changeProfile.bind(this))
                    }
                })
            }
            if (this.btnDelivery) {
                this.btnDelivery.forEach((item) => {
                    item.addEventListener('change', this.changeDelivery.bind(this))
                })
            }
        }
    }

    changeProfile(e) {
        let inputFirm = this.form.querySelectorAll('[data-firm]')
        this.btnProfiles.forEach((item) => {
            item.classList.remove('active');
            if (item.parentElement.dataset.hidden) {
                item.parentElement.classList.remove('hidden')
            }
        })
        e.currentTarget.classList.add('active')
        if (e.currentTarget.dataset.profile === "private" || e.target.value === "private") {
            this.profile = "private";
            inputFirm.forEach(item => {
                item.classList.add('hidden')
                item.setAttribute('disabled', 'true')
                if (item.parentElement.dataset.hidden) {
                    item.parentElement.classList.add('hidden')
                }
            })
        } else if (e.currentTarget.dataset.profile === "firma" || e.target.value === "firma") {
            this.profile = "firma";
            inputFirm.forEach(item => {
                item.classList.remove('hidden');
                item.removeAttribute('disabled')
                if (item.parentElement.dataset.hidden) {
                    item.parentElement.classList.remove('hidden')
                }
            })
        }
    }

    changeDelivery(e) {
        let deliveryItems = this.form.querySelectorAll(`[data-delivery-item]`)
        let deliveryExtraItems = this.form.querySelectorAll(`[data-delivery-item=${e.target.value}]`)
        if (e.target.tagName === 'SELECT') {
            deliveryItems.forEach(item => {
                item.checked = false;
                item.setAttribute('disabled', 'true')
                if (item.tagName === "TEXTAREA") item.placeholder = "Укажите что*"
            })
            deliveryExtraItems.forEach(item => {
                item.removeAttribute('disabled')
            })
        } else if (e.target.type === "checkbox") {
            if (e.target.checked) {
                deliveryExtraItems.forEach(item => {
                    item.removeAttribute('disabled')
                })
            } else {
                deliveryExtraItems.forEach(item => {
                    item.checked = false;
                    item.setAttribute('disabled', 'true')
                    if (item.tagName === "TEXTAREA") item.placeholder = "Укажите что*"
                })
            }
        }
    }

    checkForm(e) {
        e.preventDefault()
        let elementsForm = this.form.querySelectorAll('[data-type]');
        elementsForm = [...elementsForm].filter(item => !item.getAttribute('disabled'));
        let isValid = true;
        let invalidElems = [];

        function flagInvalid(elem) {
            invalidElems.push(elem)
            elem.classList.add('form__input--invalid')
            isValid = false
        }

        elementsForm.forEach(elem => {
            let type = elem.dataset.type;
            let value = elem.value ? elem.value.trim() : '';
            elem.value = value;
            elem.classList.remove('form__input--invalid')
            if (type === "selected") {
                if (value === 'none') {
                    flagInvalid(elem)
                }
            } else if (type === "name") {
                let replace = value.replace(/^[A-Za-zа-яёА-ЯЁ\s]{1,}[-]{0,1}[A-Za-zа-яёА-ЯЁ\s]{0,}$/gi, "");
                if (replace.length > 0 || value.length === 0 || value.length > 200) {
                    flagInvalid(elem)
                }
            } else if (type === "text") {
                if (value.length === 0 || value.length > 1000) {
                    flagInvalid(elem)
                }
            } else if (type === "phone") {
                let replaceNumber = value.replace(/[0-9]/g, "");
                let number = value.length - replaceNumber.length;
                if (value.length === 0 || number < 12) {
                    flagInvalid(elem)
                }
            } else if (type === "email") {
                let arr = value.split('@');
                let mailbox = arr[0];
                let hostname = arr[1] || "";
                let replaceMailbox = mailbox.replace(/[0-9a-z-_.]/gi, "");
                let replaceHostname = hostname.replace(/[0-9a-z-.]/g, "");
                if (mailbox.length > 31 || mailbox.length < 5) {//в mailbox должно быть от 5 до 31 символа
                    flagInvalid(elem)
                } else if (replaceMailbox.length > 0) {
                    flagInvalid(elem)
                } else if (replaceHostname.length > 0) {
                    flagInvalid(elem)
                } else if (hostname.length > 12 || hostname.length < 5) { //в hostname должно быть от 5 до 12 символов
                    flagInvalid(elem)
                } else if (value.search(/-{2,}/) > 0) {//проверка есть ли более одного дефиса подряд
                    flagInvalid(elem)
                } else if (value.search(/\.{2,}/) > 0) {//проверка есть ли более одного дефиса подряд
                    flagInvalid(elem)
                } else if (value.search(/\.([a-z]{2,4})$/) < 0) {// проверка заканчивается ли строка точкой и от 2 до 4 букв
                    flagInvalid(elem)
                }
            } else if (type === "marked") {
                if (!elem.checked) {
                    flagInvalid(elem)
                }
            } else if (type === "groupMarked") {
                let items = elem.querySelectorAll('input');
                let availableItems = [...items].filter(item => item.disabled === false)
                items.forEach(item => item.classList.remove('form__input--invalid'))
                if (availableItems.length > 0) {
                    let elemChecked = availableItems.filter(item => item.checked === true)
                    if (elemChecked.length === 0) {
                        availableItems.forEach(item => flagInvalid(item))
                    }
                }
            }
        })
        if (!isValid) {
            invalidElems[0].scrollIntoView({block: "center", behavior: "smooth"})
            invalidElems[0].focus({preventScroll: true})
        } else {
            const data = this.serializeForm()
            fetch('/email', {
                "method": 'POST',
                "body": data,
                // "headers": {'Content-Type': 'multipart/form-data'},
            }).then(response => {
                if (response.ok) {
                    this.showMessage('Форма успешно отправлена. Мы ответим вам в ближайшее время.')
                    this.formBody.reset()
                } else {
                    return response.json().then(error => {
                        const e = new Error('Возникла непредвиденная ошибка. Попробуйте отправить форму еще раз.')
                        e.data = error
                        throw e
                    })
                }
            }).catch(error => {
                this.showMessage(`${error.name}: Возникла проблема. Обратитесь в службу поддержки.`)
            }).finally(() => this.spinnerEffectLoading(false))
            this.spinnerEffectLoading(true)
        }
    }

    serializeForm() {
        return new FormData(this.formBody)
    }

    spinnerEffectLoading(isShow) {
        if (isShow) {
            let spinner = document.createElement('div')
            spinner.classList.add('loading');
            let img = new Image()
            img.src = imgloading;
            spinner.appendChild(img)
            document.body.appendChild(spinner);
        } else {
            document.querySelector('.loading img').remove()
        }
    }

    showMessage(message) {
        let element = document.createElement('div')
        let btn = document.createElement('div')
        element.classList.add("form-message")
        btn.classList.add("form-message__btn-close")
        element.innerHTML =
            ` <p class="form-message__text">${message}</p>
              <div class="form-message__footer">
                <p class="form-message-postscript">Спасибо за проявленный интерес! </br> Следите за нашими новостями</p>
                <div class="footer__social">
                 <a href="https://www.facebook.com/" title="сайт: facebook.com" class="footer__social-link">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
                             fill="#020202"/>
                       <path d="M10.001 0.00200009C4.479 0.00200009 0.00200009 4.479 0.00200009 10.001C0.00200009 14.991 3.658 19.127 8.439 19.88V12.892H5.899V10.001H8.439V7.798C8.439 5.29 9.932 3.907 12.215 3.907C13.309 3.907 14.455 4.102 14.455 4.102V6.561H13.191C11.951 6.561 11.563 7.333 11.563 8.124V9.999H14.334L13.891 12.89H11.563V19.878C16.344 19.129 20 14.992 20 10.001C20 4.479 15.523 0.00200009 10.001 0.00200009Z"
                             fill="white"/>
                    </svg>
                 </a>
                 <a href="https://www.instagram.com/" title="сайт: instagram.com" class="footer__social-link">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
                             fill="white"/>
                       <path d="M10 5C11.3585 5 11.528 5.005 12.061 5.03C12.5935 5.055 12.956 5.1385 13.275 5.2625C13.605 5.3895 13.883 5.5615 14.161 5.839C14.4152 6.08895 14.612 6.39129 14.7375 6.725C14.861 7.0435 14.945 7.4065 14.97 7.939C14.9935 8.472 15 8.6415 15 10C15 11.3585 14.995 11.528 14.97 12.061C14.945 12.5935 14.861 12.956 14.7375 13.275C14.6123 13.6089 14.4156 13.9113 14.161 14.161C13.911 14.4152 13.6087 14.6119 13.275 14.7375C12.9565 14.861 12.5935 14.945 12.061 14.97C11.528 14.9935 11.3585 15 10 15C8.6415 15 8.472 14.995 7.939 14.97C7.4065 14.945 7.044 14.861 6.725 14.7375C6.39116 14.6122 6.08876 14.4155 5.839 14.161C5.5847 13.9111 5.38797 13.6087 5.2625 13.275C5.1385 12.9565 5.055 12.5935 5.03 12.061C5.0065 11.528 5 11.3585 5 10C5 8.6415 5.005 8.472 5.03 7.939C5.055 7.406 5.1385 7.044 5.2625 6.725C5.38762 6.39109 5.5844 6.08866 5.839 5.839C6.08884 5.58462 6.39121 5.38786 6.725 5.2625C7.044 5.1385 7.406 5.055 7.939 5.03C8.472 5.0065 8.6415 5 10 5ZM10 7.5C9.33696 7.5 8.70107 7.76339 8.23223 8.23223C7.76339 8.70107 7.5 9.33696 7.5 10C7.5 10.663 7.76339 11.2989 8.23223 11.7678C8.70107 12.2366 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.2366 11.7678 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7678 8.23223C11.2989 7.76339 10.663 7.5 10 7.5ZM13.25 7.375C13.25 7.20924 13.1842 7.05027 13.0669 6.93306C12.9497 6.81585 12.7908 6.75 12.625 6.75C12.4592 6.75 12.3003 6.81585 12.1831 6.93306C12.0658 7.05027 12 7.20924 12 7.375C12 7.54076 12.0658 7.69973 12.1831 7.81694C12.3003 7.93415 12.4592 8 12.625 8C12.7908 8 12.9497 7.93415 13.0669 7.81694C13.1842 7.69973 13.25 7.54076 13.25 7.375ZM10 8.5C10.3978 8.5 10.7794 8.65804 11.0607 8.93934C11.342 9.22064 11.5 9.60217 11.5 10C11.5 10.3978 11.342 10.7794 11.0607 11.0607C10.7794 11.342 10.3978 11.5 10 11.5C9.60217 11.5 9.22064 11.342 8.93934 11.0607C8.65804 10.7794 8.5 10.3978 8.5 10C8.5 9.60217 8.65804 9.22064 8.93934 8.93934C9.22064 8.65804 9.60217 8.5 10 8.5Z"
                             fill="black"/>
                    </svg>
                 </a>
                 <a href="https://www.linkedin.com/" title="сайт: linkedin.com" class="footer__social-link">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                       <path d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z"
                             fill="white"/>
                       <path d="M15 11.13V14.827H12.857V11.377C12.857 10.511 12.547 9.92 11.771 9.92C11.179 9.92 10.826 10.318 10.671 10.704C10.615 10.842 10.6 11.034 10.6 11.226V14.827H8.456C8.456 14.827 8.485 8.985 8.456 8.38H10.6V9.293L10.586 9.314H10.6V9.293C10.885 8.853 11.393 8.228 12.532 8.228C13.942 8.228 15 9.15 15 11.13ZM6.213 5.271C5.48 5.271 5 5.753 5 6.385C5 7.005 5.466 7.5 6.185 7.5H6.199C6.947 7.5 7.412 7.004 7.412 6.385C7.398 5.753 6.947 5.271 6.213 5.271ZM5.127 14.827H7.271V8.38H5.127V14.827Z"
                             fill="black"/>
                    </svg>
                 </a>
            </div>
              </div>`;
        btn.addEventListener('click', function close() {
            this.removeEventListener('click', close);
            document.querySelector('.form-message').remove()
            document.querySelector('.loading').remove()
        })
        element.appendChild(btn)
        document.body.appendChild(element)

    }
}


