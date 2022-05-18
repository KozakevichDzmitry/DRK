import './style/style.scss';
import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import {Form} from './form';


import {BlogMarks} from './blogMarks'
import {logPlugin} from "@babel/preset-env/lib/debug";



const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

const brandSwiper = new Swiper(".brand__swiper", {
    modules: [Navigation, Pagination],
    //slidesPerView: 1,
    //spaceBetween: 10,
    navigation: {
        nextEl: ".brand__swiper-button-next",
        prevEl: ".brand__swiper-button-prev",
    },
    breakpoints: {
       // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        450: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        730: {
            slidesPerView: 3,
            spaceBetween: 10,
        },
        900: {
            slidesPerView: 4,
            spaceBetween: 10,
        },
        1100: {
            slidesPerView: 5,
            spaceBetween: 10,
        }
    }
});

function open(btnClass, openBlockClass) {
    let btn = document.querySelectorAll(`.${btnClass}`)
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener('click', function () {
            let self = this;
            let block = self.parentElement.querySelector(`.${openBlockClass}`)
            let height = 0;

            function clickOutside(e) {
                let isContains = self.parentElement.contains(e.target)
                if (!isContains || e.target.dataset.final) {
                    block.style.height = '';
                    block.classList.remove('open')
                    block.style.overflow = 'hidden';
                    self.classList.remove('open')
                    window.removeEventListener('click', clickOutside)
                }
            }

            if (block.classList.contains('open')) {
                block.style.height = '';
                block.classList.remove('open')
                block.style.overflow = 'hidden';
                self.classList.remove('open')
                window.removeEventListener('click', clickOutside)
            } else {
                let arr = block.children;
                for (let i = 0; i < arr.length; i++) {
                    height += arr[i].scrollHeight;
                }
                block.style.height = height + 'px';
                block.classList.add('open');
                self.classList.add('open');
                if (self.dataset.grandpa) {
                    let grandpa =document.querySelector(self.dataset.grandpa);
                    if(grandpa) grandpa.style.overflow = 'visible';
                }

                window.addEventListener('click', clickOutside)
            }
        })
    }
}

function selectLang(select, option) {
    let href = document.location.href;
    let origin = document.location.origin;
    let options = document.querySelectorAll(`.${option}`);
    let input = document.querySelector(`.${select}`);

    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener('click', function () {
            let lang = this.dataset.lang;
            let regExp = new RegExp(`${origin}/.+/|${origin}/`)
            input.innerHTML = `(${lang.toLocaleUpperCase()})`;
            input.parentElement.classList.remove('open');
            href = href.replace(regExp, `${origin}/${lang}/`)
            window.location.href = href

        })
    }
}

function transferElement(elem, media, newPosition, where) {
    let oldParent = elem.parentElement;
    let oldPosition = [...oldParent.children].indexOf(elem);
    let newParent = document.querySelector(newPosition)

    const mediaQuery = window.matchMedia(media)

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

    mediaQuery.addEventListener('change', handleTabletChange)
    handleTabletChange(mediaQuery)
}

window.onload = ()=>{
    open('language__title', 'language__wrapper-list')
    open('header-bottom__btn-menu', 'header-bottom__menu')
    open('drop-down__title', 'drop-down__sublinks-wrapper')
    open('FAQ__item-title', 'FAQ__item-body')
    open('header-bottom__btn-link-box', 'header-bottom__link-box')
    open('header-bottom__menu-subtitle', 'header-bottom__menu-list')

    selectLang('language__selected', 'language__item')

    let minForm = new Form('.form__card', '#form-private')
    let askForm = new Form('.form-ask','#askForm')
    let extendedForm = new Form('.form-extended','#extendedForm')
    let blogMarks = new BlogMarks('.blogs')

    transferElement(document.querySelector('.header__btn-order'), '(max-width: 700px)', '.header-bottom__link-box', 'afterEnd')
    transferElement(document.querySelector('.header-bottom__menu-body'), '(max-width: 600px)', '.header-bottom__links', 'beforeBegin')
    transferElement(document.querySelector('.header-top__lang'), '(max-width: 400px)', '.header-bottom__btn-link-box', 'afterEnd')
    let elemBlog = document.querySelector('.expert-blog__other-articles')
       if (elemBlog){
            let elems = elemBlog.children
            for (let i = elems.length-1; i > 1; i--) {
                transferElement(elems[i], '(max-width: 945px)', '.expert-blog__other-articles--stretch', 'afterBegin')
            }
            for (let i = elems.length-1; i >= 0; i--) {
                transferElement(elems[i], '(max-width: 650px)', '.expert-blog__other-articles--stretch', 'afterBegin')
            }
       }



}



