/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./blogMarks.js":
/*!**********************!*\
  !*** ./blogMarks.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BlogMarks": function() { return /* binding */ BlogMarks; }
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var BlogMarks = /*#__PURE__*/function () {
  function BlogMarks(blogName) {
    var _this = this;

    _classCallCheck(this, BlogMarks);

    this.blog = document.querySelector(blogName);

    if (this.blog) {
      this.btnsMark = this.blog.querySelectorAll(".btn__mark");
      this.blogList = this.blog.querySelectorAll("".concat(blogName, "__item"));
      this.btnsMark.forEach(function (elem) {
        return elem.addEventListener('click', _this.showSelectBlogs.bind(_this));
      });
    }
  }

  _createClass(BlogMarks, [{
    key: "showSelectBlogs",
    value: function showSelectBlogs(e) {
      var _this2 = this;

      e.target.classList.toggle('active');
      e.target.disabled = 'disabled';
      var showElements = [];
      var hiddenElements = [];
      var btnsActive = Array.from(this.btnsMark).filter(function (btn) {
        return btn.classList.contains('active');
      }).map(function (btn) {
        return btn.textContent;
      });
      this.blogList.forEach(function (elem) {
        var elemMarks = elem.querySelectorAll('.mark');

        for (var i = 0; i < elemMarks.length; i++) {
          if (btnsActive.length) {
            if (btnsActive.includes(elemMarks[i].textContent)) {
              showElements.push(elem);
              break;
            } else if (i === elemMarks.length - 1) {
              hiddenElements.push(elem);
            }
          } else {
            showElements.push(elem);
          }
        }
      });
      var arrPromise = [];

      var _loop = function _loop(i) {
        arrPromise.push(new Promise(function (resolve) {
          setTimeout(function () {
            _this2.blogList[i].classList.remove('active');

            resolve();
          }, i * 10);
        }));
      };

      for (var i = 0; i < this.blogList.length; i++) {
        _loop(i);
      }

      Promise.all(arrPromise).then(function () {
        return new Promise(function (resolve) {
          setTimeout(function () {
            var arr = showElements.concat(hiddenElements);
            var wrapper = arr[0].parentElement;
            wrapper.innerHTML = '';
            arr.forEach(function (elem) {
              return wrapper.appendChild(elem);
            });
            resolve();
          }, 150);
        });
      }).then(function () {
        var _loop2 = function _loop2(_i) {
          setTimeout(function () {
            return showElements[_i].classList.add('active');
          }, _i * 10);
        };

        for (var _i = 0; _i < showElements.length; _i++) {
          _loop2(_i);
        }

        e.target.disabled = '';
      });
    }
  }]);

  return BlogMarks;
}();

/***/ }),

/***/ "./form.js":
/*!*****************!*\
  !*** ./form.js ***!
  \*****************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Form": function() { return /* binding */ Form; }
/* harmony export */ });
/* harmony import */ var _image_icon_loading_gif__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image/icon/loading.gif */ "./image/icon/loading.gif");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var Form = /*#__PURE__*/function () {
  function Form(form, body) {
    var _this = this;

    _classCallCheck(this, Form);

    this.form = document.querySelector(form);
    this.formBody = document.querySelector(body);
    this.profile = "private";

    if (this.form) {
      this.btnProfiles = this.form.querySelectorAll('[data-profile]');
      this.btnDelivery = this.form.querySelectorAll('[data-delivery]');
      this.form.addEventListener('submit', this.checkForm.bind(this));

      if (this.btnProfiles.length > 0) {
        this.btnProfiles.forEach(function (item) {
          if (item.tagName === 'SELECT') {
            item.addEventListener('change', _this.changeProfile.bind(_this));
          } else {
            item.addEventListener('click', _this.changeProfile.bind(_this));
          }
        });
      }

      if (this.btnDelivery) {
        this.btnDelivery.forEach(function (item) {
          item.addEventListener('change', _this.changeDelivery.bind(_this));
        });
      }
    }
  }

  _createClass(Form, [{
    key: "changeProfile",
    value: function changeProfile(e) {
      var inputFirm = this.form.querySelectorAll('[data-firm]');
      this.btnProfiles.forEach(function (item) {
        item.classList.remove('active');

        if (item.parentElement.dataset.hidden) {
          item.parentElement.classList.remove('hidden');
        }
      });
      e.currentTarget.classList.add('active');

      if (e.currentTarget.dataset.profile === "private" || e.target.value === "private") {
        this.profile = "private";
        inputFirm.forEach(function (item) {
          item.classList.add('hidden');
          item.setAttribute('disabled', 'true');

          if (item.parentElement.dataset.hidden) {
            item.parentElement.classList.add('hidden');
          }
        });
      } else if (e.currentTarget.dataset.profile === "firma" || e.target.value === "firma") {
        this.profile = "firma";
        inputFirm.forEach(function (item) {
          item.classList.remove('hidden');
          item.removeAttribute('disabled');

          if (item.parentElement.dataset.hidden) {
            item.parentElement.classList.remove('hidden');
          }
        });
      }
    }
  }, {
    key: "changeDelivery",
    value: function changeDelivery(e) {
      var deliveryItems = this.form.querySelectorAll("[data-delivery-item]");
      var deliveryExtraItems = this.form.querySelectorAll("[data-delivery-item=".concat(e.target.value, "]"));

      if (e.target.tagName === 'SELECT') {
        deliveryItems.forEach(function (item) {
          item.checked = false;
          item.setAttribute('disabled', 'true');
          if (item.tagName === "TEXTAREA") item.placeholder = "Укажите что*";
        });
        deliveryExtraItems.forEach(function (item) {
          item.removeAttribute('disabled');
        });
      } else if (e.target.type === "checkbox") {
        if (e.target.checked) {
          deliveryExtraItems.forEach(function (item) {
            item.removeAttribute('disabled');
          });
        } else {
          deliveryExtraItems.forEach(function (item) {
            item.checked = false;
            item.setAttribute('disabled', 'true');
            if (item.tagName === "TEXTAREA") item.placeholder = "Укажите что*";
          });
        }
      }
    }
  }, {
    key: "checkForm",
    value: function checkForm(e) {
      var _this2 = this;

      e.preventDefault();
      var elementsForm = this.form.querySelectorAll('[data-type]');
      elementsForm = _toConsumableArray(elementsForm).filter(function (item) {
        return !item.getAttribute('disabled');
      });
      var isValid = true;
      var invalidElems = [];

      function flagInvalid(elem) {
        invalidElems.push(elem);
        elem.classList.add('form__input--invalid');
        isValid = false;
      }

      elementsForm.forEach(function (elem) {
        var type = elem.dataset.type;
        var value = elem.value ? elem.value.trim() : '';
        elem.value = value;
        elem.classList.remove('form__input--invalid');

        if (type === "selected") {
          if (value === 'none') {
            flagInvalid(elem);
          }
        } else if (type === "name") {
          var replace = value.replace(/^[A-Za-z\s]{1,}[-]{0,1}[A-Za-z\s]{0,}$/gi, "");

          if (replace.length > 0 || value.length === 0 || value.length > 200) {
            flagInvalid(elem);
          }
        } else if (type === "text") {
          if (value.length === 0 || value.length > 1000) {
            flagInvalid(elem);
          }
        } else if (type === "phone") {
          var replaceNumber = value.replace(/[0-9]/g, "");
          var number = value.length - replaceNumber.length;

          if (value.length === 0 || number < 12) {
            flagInvalid(elem);
          }
        } else if (type === "email") {
          var arr = value.split('@');
          var mailbox = arr[0];
          var hostname = arr[1] || "";
          var replaceMailbox = mailbox.replace(/[0-9a-z-_.]/gi, "");
          var replaceHostname = hostname.replace(/[0-9a-z-.]/g, "");

          if (mailbox.length > 31 || mailbox.length < 5) {
            //в mailbox должно быть от 5 до 31 символа
            flagInvalid(elem);
          } else if (replaceMailbox.length > 0) {
            flagInvalid(elem);
          } else if (replaceHostname.length > 0) {
            flagInvalid(elem);
          } else if (hostname.length > 12 || hostname.length < 5) {
            //в hostname должно быть от 5 до 12 символов
            flagInvalid(elem);
          } else if (value.search(/-{2,}/) > 0) {
            //проверка есть ли более одного дефиса подряд
            flagInvalid(elem);
          } else if (value.search(/\.{2,}/) > 0) {
            //проверка есть ли более одного дефиса подряд
            flagInvalid(elem);
          } else if (value.search(/\.([a-z]{2,4})$/) < 0) {
            // проверка заканчивается ли строка точкой и от 2 до 4 букв
            flagInvalid(elem);
          }
        } else if (type === "marked") {
          if (!elem.checked) {
            flagInvalid(elem);
          }
        } else if (type === "groupMarked") {
          var items = elem.querySelectorAll('input');

          var availableItems = _toConsumableArray(items).filter(function (item) {
            return item.disabled === false;
          });

          items.forEach(function (item) {
            return item.classList.remove('form__input--invalid');
          });

          if (availableItems.length > 0) {
            var elemChecked = availableItems.filter(function (item) {
              return item.checked === true;
            });

            if (elemChecked.length === 0) {
              availableItems.forEach(function (item) {
                return flagInvalid(item);
              });
            }
          }
        }
      });

      if (!isValid) {
        invalidElems[0].scrollIntoView({
          block: "center",
          behavior: "smooth"
        });
        invalidElems[0].focus({
          preventScroll: true
        });
      } else {
        var data = this.serializeForm();
        fetch('/email', {
          "method": 'POST',
          "body": data // "headers": {'Content-Type': 'multipart/form-data'},

        }).then(function (response) {
          if (response.ok) {
            _this2.showMessage('Форма успешно отправлена. Мы ответим вам в ближайшее время.');

            _this2.formBody.reset();
          } else {
            return response.json().then(function (error) {
              var e = new Error('Возникла непредвиденная ошибка. Попробуйте отправить форму еще раз.');
              e.data = error;
              throw e;
            });
          }
        }).catch(function (error) {
          _this2.showMessage("".concat(error.name, ": \u0412\u043E\u0437\u043D\u0438\u043A\u043B\u0430 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430. \u041E\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044C \u0432 \u0441\u043B\u0443\u0436\u0431\u0443 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438."));
        }).finally(function () {
          return _this2.spinnerEffectLoading(false);
        });
        this.spinnerEffectLoading(true);
      }
    }
  }, {
    key: "serializeForm",
    value: function serializeForm() {
      return new FormData(this.formBody);
    }
  }, {
    key: "spinnerEffectLoading",
    value: function spinnerEffectLoading(isShow) {
      if (isShow) {
        var spinner = document.createElement('div');
        spinner.classList.add('loading');
        var img = new Image();
        img.src = _image_icon_loading_gif__WEBPACK_IMPORTED_MODULE_0__;
        spinner.appendChild(img);
        document.body.appendChild(spinner);
      } else {
        document.querySelector('.loading img').remove();
      }
    }
  }, {
    key: "showMessage",
    value: function showMessage(message) {
      var element = document.createElement('div');
      var btn = document.createElement('div');
      element.classList.add("form-message");
      btn.classList.add("form-message__btn-close");
      element.innerHTML = " <p class=\"form-message__text\">".concat(message, "</p>\n              <div class=\"form-message__footer\">\n                <p class=\"form-message-postscript\">\u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430 \u043F\u0440\u043E\u044F\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0438\u043D\u0442\u0435\u0440\u0435\u0441! </br> \u0421\u043B\u0435\u0434\u0438\u0442\u0435 \u0437\u0430 \u043D\u0430\u0448\u0438\u043C\u0438 \u043D\u043E\u0432\u043E\u0441\u0442\u044F\u043C\u0438</p>\n                <div class=\"footer__social\">\n                 <a href=\"https://www.facebook.com/\" title=\"\u0441\u0430\u0439\u0442: facebook.com\" class=\"footer__social-link\">\n                    <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                       <path d=\"M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z\"\n                             fill=\"#020202\"/>\n                       <path d=\"M10.001 0.00200009C4.479 0.00200009 0.00200009 4.479 0.00200009 10.001C0.00200009 14.991 3.658 19.127 8.439 19.88V12.892H5.899V10.001H8.439V7.798C8.439 5.29 9.932 3.907 12.215 3.907C13.309 3.907 14.455 4.102 14.455 4.102V6.561H13.191C11.951 6.561 11.563 7.333 11.563 8.124V9.999H14.334L13.891 12.89H11.563V19.878C16.344 19.129 20 14.992 20 10.001C20 4.479 15.523 0.00200009 10.001 0.00200009Z\"\n                             fill=\"white\"/>\n                    </svg>\n                 </a>\n                 <a href=\"https://www.instagram.com/\" title=\"\u0441\u0430\u0439\u0442: instagram.com\" class=\"footer__social-link\">\n                    <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                       <path d=\"M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z\"\n                             fill=\"white\"/>\n                       <path d=\"M10 5C11.3585 5 11.528 5.005 12.061 5.03C12.5935 5.055 12.956 5.1385 13.275 5.2625C13.605 5.3895 13.883 5.5615 14.161 5.839C14.4152 6.08895 14.612 6.39129 14.7375 6.725C14.861 7.0435 14.945 7.4065 14.97 7.939C14.9935 8.472 15 8.6415 15 10C15 11.3585 14.995 11.528 14.97 12.061C14.945 12.5935 14.861 12.956 14.7375 13.275C14.6123 13.6089 14.4156 13.9113 14.161 14.161C13.911 14.4152 13.6087 14.6119 13.275 14.7375C12.9565 14.861 12.5935 14.945 12.061 14.97C11.528 14.9935 11.3585 15 10 15C8.6415 15 8.472 14.995 7.939 14.97C7.4065 14.945 7.044 14.861 6.725 14.7375C6.39116 14.6122 6.08876 14.4155 5.839 14.161C5.5847 13.9111 5.38797 13.6087 5.2625 13.275C5.1385 12.9565 5.055 12.5935 5.03 12.061C5.0065 11.528 5 11.3585 5 10C5 8.6415 5.005 8.472 5.03 7.939C5.055 7.406 5.1385 7.044 5.2625 6.725C5.38762 6.39109 5.5844 6.08866 5.839 5.839C6.08884 5.58462 6.39121 5.38786 6.725 5.2625C7.044 5.1385 7.406 5.055 7.939 5.03C8.472 5.0065 8.6415 5 10 5ZM10 7.5C9.33696 7.5 8.70107 7.76339 8.23223 8.23223C7.76339 8.70107 7.5 9.33696 7.5 10C7.5 10.663 7.76339 11.2989 8.23223 11.7678C8.70107 12.2366 9.33696 12.5 10 12.5C10.663 12.5 11.2989 12.2366 11.7678 11.7678C12.2366 11.2989 12.5 10.663 12.5 10C12.5 9.33696 12.2366 8.70107 11.7678 8.23223C11.2989 7.76339 10.663 7.5 10 7.5ZM13.25 7.375C13.25 7.20924 13.1842 7.05027 13.0669 6.93306C12.9497 6.81585 12.7908 6.75 12.625 6.75C12.4592 6.75 12.3003 6.81585 12.1831 6.93306C12.0658 7.05027 12 7.20924 12 7.375C12 7.54076 12.0658 7.69973 12.1831 7.81694C12.3003 7.93415 12.4592 8 12.625 8C12.7908 8 12.9497 7.93415 13.0669 7.81694C13.1842 7.69973 13.25 7.54076 13.25 7.375ZM10 8.5C10.3978 8.5 10.7794 8.65804 11.0607 8.93934C11.342 9.22064 11.5 9.60217 11.5 10C11.5 10.3978 11.342 10.7794 11.0607 11.0607C10.7794 11.342 10.3978 11.5 10 11.5C9.60217 11.5 9.22064 11.342 8.93934 11.0607C8.65804 10.7794 8.5 10.3978 8.5 10C8.5 9.60217 8.65804 9.22064 8.93934 8.93934C9.22064 8.65804 9.60217 8.5 10 8.5Z\"\n                             fill=\"black\"/>\n                    </svg>\n                 </a>\n                 <a href=\"https://www.linkedin.com/\" title=\"\u0441\u0430\u0439\u0442: linkedin.com\" class=\"footer__social-link\">\n                    <svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                       <path d=\"M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10Z\"\n                             fill=\"white\"/>\n                       <path d=\"M15 11.13V14.827H12.857V11.377C12.857 10.511 12.547 9.92 11.771 9.92C11.179 9.92 10.826 10.318 10.671 10.704C10.615 10.842 10.6 11.034 10.6 11.226V14.827H8.456C8.456 14.827 8.485 8.985 8.456 8.38H10.6V9.293L10.586 9.314H10.6V9.293C10.885 8.853 11.393 8.228 12.532 8.228C13.942 8.228 15 9.15 15 11.13ZM6.213 5.271C5.48 5.271 5 5.753 5 6.385C5 7.005 5.466 7.5 6.185 7.5H6.199C6.947 7.5 7.412 7.004 7.412 6.385C7.398 5.753 6.947 5.271 6.213 5.271ZM5.127 14.827H7.271V8.38H5.127V14.827Z\"\n                             fill=\"black\"/>\n                    </svg>\n                 </a>\n            </div>\n              </div>");
      btn.addEventListener('click', function close() {
        this.removeEventListener('click', close);
        document.querySelector('.form-message').remove();
        document.querySelector('.loading').remove();
      });
      element.appendChild(btn);
      document.body.appendChild(element);
    }
  }]);

  return Form;
}();

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/style.scss */ "./style/style.scss");
/* harmony import */ var swiper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! swiper */ "../node_modules/swiper/swiper.esm.js");
/* harmony import */ var swiper_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! swiper/css */ "../node_modules/swiper/swiper.min.css");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./form */ "./form.js");
/* harmony import */ var _blogMarks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./blogMarks */ "./blogMarks.js");
/* harmony import */ var _babel_preset_env_lib_debug__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/preset-env/lib/debug */ "../node_modules/@babel/preset-env/lib/debug.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }







var swiper = new swiper__WEBPACK_IMPORTED_MODULE_1__["default"](".swiper", {
  modules: [swiper__WEBPACK_IMPORTED_MODULE_1__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_1__.Pagination],
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});
var brandSwiper = new swiper__WEBPACK_IMPORTED_MODULE_1__["default"](".brand__swiper", {
  modules: [swiper__WEBPACK_IMPORTED_MODULE_1__.Navigation, swiper__WEBPACK_IMPORTED_MODULE_1__.Pagination],
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: {
    nextEl: ".brand__swiper-button-next",
    prevEl: ".brand__swiper-button-prev"
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 10
    },
    450: {
      slidesPerView: 2,
      spaceBetween: 10
    },
    730: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    900: {
      slidesPerView: 4,
      spaceBetween: 10
    },
    1100: {
      slidesPerView: 5,
      spaceBetween: 10
    }
  }
});

function open(btnClass, openBlockClass) {
  var btn = document.querySelectorAll(".".concat(btnClass));

  for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener('click', function () {
      var self = this;
      var block = self.parentElement.querySelector(".".concat(openBlockClass));
      var height = 0;

      function clickOutside(e) {
        var isContains = self.parentElement.contains(e.target);

        if (!isContains || e.target.dataset.final) {
          block.style.height = '';
          block.classList.remove('open');
          block.style.overflow = 'hidden';
          self.classList.remove('open');
          window.removeEventListener('click', clickOutside);
        }
      }

      if (block.classList.contains('open')) {
        block.style.height = '';
        block.classList.remove('open');
        block.style.overflow = 'hidden';
        self.classList.remove('open');
        window.removeEventListener('click', clickOutside);
      } else {
        var arr = block.children;

        for (var _i = 0; _i < arr.length; _i++) {
          height += arr[_i].scrollHeight;
        }

        block.style.height = height + 'px';
        block.classList.add('open');
        self.classList.add('open');

        if (self.dataset.grandpa) {
          var grandpa = document.querySelector(self.dataset.grandpa);
          if (grandpa) grandpa.style.overflow = 'visible';
        }

        window.addEventListener('click', clickOutside);
      }
    });
  }
}

function selectLang(select, option) {
  var href = document.location.href;
  var origin = document.location.origin;
  var options = document.querySelectorAll(".".concat(option));
  var input = document.querySelector(".".concat(select));

  for (var i = 0; i < options.length; i++) {
    options[i].addEventListener('click', function () {
      var lang = this.dataset.lang;
      var regExp = new RegExp("".concat(origin, "/.+/|").concat(origin, "/"));
      input.innerHTML = "(".concat(lang.toLocaleUpperCase(), ")");
      input.parentElement.classList.remove('open');
      href = href.replace(regExp, "".concat(origin, "/").concat(lang, "/"));
      window.location.href = href;
    });
  }
}

function transferElement(elem, media, newPosition, where) {
  var oldParent = elem.parentElement;

  var oldPosition = _toConsumableArray(oldParent.children).indexOf(elem);

  var newParent = document.querySelector(newPosition);
  var mediaQuery = window.matchMedia(media);

  function handleTabletChange(e) {
    if (e.matches) {
      newParent.insertAdjacentElement(where, elem);
    } else {
      if (oldParent.children[oldPosition] !== undefined) {
        oldParent.children[oldPosition].before(elem);
      } else {
        oldParent.append(elem);
      }
    }
  }

  mediaQuery.addEventListener('change', handleTabletChange);
  handleTabletChange(mediaQuery);
}

window.onload = function () {
  open('language__title', 'language__wrapper-list');
  open('header-bottom__btn-menu', 'header-bottom__menu');
  open('drop-down__title', 'drop-down__sublinks-wrapper');
  open('FAQ__item-title', 'FAQ__item-body');
  open('header-bottom__btn-link-box', 'header-bottom__link-box');
  open('header-bottom__menu-subtitle', 'header-bottom__menu-list');
  selectLang('language__selected', 'language__item');
  var minForm = new _form__WEBPACK_IMPORTED_MODULE_3__.Form('.form__card', '#form-private');
  var askForm = new _form__WEBPACK_IMPORTED_MODULE_3__.Form('.form-ask', '#askForm');
  var extendedForm = new _form__WEBPACK_IMPORTED_MODULE_3__.Form('.form-extended', '#extendedForm');
  var blogMarks = new _blogMarks__WEBPACK_IMPORTED_MODULE_4__.BlogMarks('.blogs');
  transferElement(document.querySelector('.header__btn-order'), '(max-width: 700px)', '.header-bottom__link-box', 'afterEnd');
  transferElement(document.querySelector('.header-bottom__menu-body'), '(max-width: 600px)', '.header-bottom__links', 'beforeBegin');
  transferElement(document.querySelector('.header-top__lang'), '(max-width: 400px)', '.header-bottom__btn-link-box', 'afterEnd');
  var elemBlog = document.querySelector('.expert-blog__other-articles');

  if (elemBlog) {
    var elems = elemBlog.children;

    for (var i = elems.length - 1; i > 1; i--) {
      transferElement(elems[i], '(max-width: 945px)', '.expert-blog__other-articles--stretch', 'afterBegin');
    }

    for (var _i2 = elems.length - 1; _i2 >= 0; _i2--) {
      transferElement(elems[_i2], '(max-width: 650px)', '.expert-blog__other-articles--stretch', 'afterBegin');
    }
  }
};

/***/ }),

/***/ "./style/style.scss":
/*!**************************!*\
  !*** ./style/style.scss ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "data:application/font-woff;charset=utf-8;base64, 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":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:application/font-woff;charset=utf-8;base64, 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 ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ (function(module) {

"use strict";
module.exports = "data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA";

/***/ }),

/***/ "./image/icon/loading.gif":
/*!********************************!*\
  !*** ./image/icon/loading.gif ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";
module.exports = __webpack_require__.p + "image/icon/loading..gif";

/***/ }),

/***/ "?e6a8":
/*!**********************!*\
  !*** path (ignored) ***!
  \**********************/
/***/ (function() {

/* (ignored) */

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["vendors-node_modules_babel_polyfill_lib_index_js-node_modules_babel_preset-env_lib_debug_js-n-c2ea7a"], function() { return __webpack_require__("../node_modules/@babel/polyfill/lib/index.js"); })
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_babel_polyfill_lib_index_js-node_modules_babel_preset-env_lib_debug_js-n-c2ea7a"], function() { return __webpack_require__("./index.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;