(function () {
    let contentUl = document.querySelector('.post-toc')
    contentUl.style.width = contentUl.offsetWidth + 'px'
    window.onscroll = function () {
        //向上滚动的高度
        let scrollTop = Math.max(document.body.scrollTop,document.documentElement.scrollTop)
        let windowHeight = Math.max(document.body.clientHeight,document.documentElement.clientHeight)
        //浏览器下面元素的隐藏高度
        let scrollBottom = windowHeight - screenTop - window.innerHeight
        if(scrollTop<53) {
            contentUl.classList.remove('fixed')
        }else if(scrollBottom >= 83) {
            contentUl.classList.add('fixed')
        }

    }
}());
