export class BlogMarks {
    constructor(blogName) {
        this.blog = document.querySelector(blogName);
        if (this.blog) {
            this.btnsMark = this.blog.querySelectorAll(`.btn__mark`);
            this.blogList = this.blog.querySelectorAll(`${blogName}__item`);
            this.btnsMark.forEach(elem => elem.addEventListener('click', this.showSelectBlogs.bind(this)))
        }
    }

    showSelectBlogs(e) {
        e.target.classList.toggle('active')
        e.target.disabled = 'disabled'
        let showElements = []
        let hiddenElements = []
        let btnsActive = Array.from(this.btnsMark)
            .filter((btn) => btn.classList.contains('active'))
            .map(btn => btn.textContent)

        this.blogList.forEach(elem => {
            let elemMarks = elem.querySelectorAll('.mark')
            for (let i = 0; i < elemMarks.length; i++) {
                if (btnsActive.length) {
                    if (btnsActive.includes(elemMarks[i].textContent)) {
                        showElements.push(elem)
                        break
                    } else if (i === elemMarks.length - 1) {
                        hiddenElements.push(elem)
                    }
                } else {
                    showElements.push(elem)
                }

            }
        })
        let arrPromise = []
        for (let i = 0; i < this.blogList.length; i++) {
            arrPromise.push(
                new Promise((resolve) => {
                    setTimeout(() => {
                        this.blogList[i].classList.remove('active')
                        resolve()
                    }, i * 10)
                }))
        }
        Promise.all(arrPromise).then(() => {
            return new Promise(resolve => {
                setTimeout(() => {
                    let arr = showElements.concat(hiddenElements)
                    let wrapper = arr[0].parentElement
                    wrapper.innerHTML = ''
                    arr.forEach(elem => wrapper.appendChild(elem))
                    resolve()
                }, 150)
            })
        }).then(() => {
            for (let i = 0; i < showElements.length; i++) {
                setTimeout(() => showElements[i].classList.add('active'), i * 10)
            }
            e.target.disabled = ''
        })
    }
}