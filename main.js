let log = console.log;

// ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ Loader ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
  loader.classList.add('hide')
  setTimeout( () => loader.style.display = "none" , 600)
})
// ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ Header ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
const nav__ul = document.querySelector(".nav__ul");
const icon = document.querySelector("[data-head_icon]");
const links = [...document.querySelectorAll(".nav__ul a")];
const header = document.querySelector("header");
const headerContainer = document.querySelector(".header__container");
const sections = document.querySelectorAll('section')

// ◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾  Nav Icon Animate & Show Links ◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾
function showLinks() {
  if (icon.classList.contains("animate")) {
    icon.classList.remove("animate");
    icon.classList.add("off-animate");
  } else {
    icon.classList.add("animate");
    icon.classList.remove("off-animate");
  }
  if (window.innerWidth <= 767) {
    nav__ul.classList.toggle("hide");
  } else {
    nav__ul.classList.remove("hide");
  }
}

icon.addEventListener("click", showLinks);

function mediaLinksClick() {
  if (window.innerWidth <= 767 ) {
    links.forEach(el => {
      el.addEventListener('click', showLinks)
    })
  }
}
mediaLinksClick()
window.addEventListener('resize', mediaLinksClick )

// ◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾ Links Click  &  Scroll  & Sync  ◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾
links.forEach(a => { 
  a.addEventListener("click", (e) => {
    e.preventDefault();
    let h = header.clientHeight;
    let sec = document.getElementById(a.dataset.scroll)
    links.forEach((el) => el.classList.remove("active"));
    a.classList.add("active");

    window.scrollTo({
      top: (sec.offsetTop - h ) + 1,
      behavior: "smooth",
    })
  });
});

function scrollLinks() {
  let h = header.clientHeight;

  links.forEach(a => {
    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop - h) {
        if (a.dataset.scroll == sec.id) {
          links.forEach((el) => el.classList.remove("active"));
          a.classList.add('active')
        }
      }
    })
  })
}
scrollLinks()
window.addEventListener('scroll', scrollLinks)

// ◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾ body Padding With Header height ◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾◾
function bodyPadding() {
  let h = header.clientHeight;
  document.body.style.paddingTop = h + "px";
}
bodyPadding();

function headerBg() {
  if (scrollY >= 100) {
    header.classList.add("stick");
    headerContainer.style.padding = "1rem 0";
  } else {
    header.classList.remove("stick");
    headerContainer.style.padding = "1.5rem 0";
  }
}
headerBg();

window.addEventListener("scroll", () => {
  bodyPadding();
  headerBg();
});

// ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ Services ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
const services = document.getElementById('services')
const widthSpan = document.querySelectorAll('[data-service]');


window.addEventListener("scroll", () => {
  if (scrollY >= services.offsetTop ) {
    widthSpan.forEach(span => {
      let w = span.dataset.serviceNum ;
      let right = 95 - w ;
      span.style.width = w + '%' ;
      span.parentElement.previousElementSibling.children[0].style.cssText = ` right: ${right}%;
                                                                              opacity: 1 `
    })
  }
})
// ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ Reveal Elements ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛
let options = {
  threshold: 0,
  rootMargin: '0px 0px -25px',
}

let ob = new IntersectionObserver(reveal , options)

function reveal(all) { all.forEach(el =>  el.isIntersecting ? el.target.classList.add('spotted') : null ) }
document.querySelectorAll('.spot').forEach(el => ob.observe(el))



