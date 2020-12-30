/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

//get function access to all the DOM element
const get = element => document.getElementById(element); 

const sections = [about, browse, cart, contact];
const menuList = get("navbar__list");

let open = get("menu-btn");
let nav = get("nav");
let exit = get("exit-btn");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const config = {
    root: null,
    rootMargin: '0px',
    threshold: 0.6,
}

// Add class 'active' to navigations items and to section when near top of viewport

function handleIntersection(entries) {
    entries.forEach(entry => {
    const navbarListElement = document.querySelector(`.menu__link[data-link='${entry.target.id}']`);
    const section = document.getElementById(entry.target.id);

        if (entry && entry.isIntersecting) {
            navbarListElement.classList.add('active')
            section.classList.add('active')
          } else {
              if(navbarListElement.classList.contains('active')) {
                navbarListElement.classList.remove('active')
              }

              if(section.classList.contains('active')) {
                section.classList.remove('active')
              }
           
            }
    });

}
// IntersectionObserver watch and register callbacks to trigger when elements on a page come into view

const observer = new IntersectionObserver(handleIntersection, config);

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildMenu () {
    sections.forEach(section => {
    const dataNav = section.getAttribute("data-nav");
    const liElement =  `<li class ="menu__link ${section.className}" data-link=${section.id}><a href="#${section.id}">${dataNav}</a></li>`;
    menuList.insertAdjacentHTML('beforeend', liElement)
    });  

}

/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build menu 

buildMenu();

// Scroll to section on link click

menuList.addEventListener('click', e => {
    e.preventDefault()
    const parent = e.target.hasAttribute('data-link') ? e.target : e.target.parentElement;
    const elementToScrollTo = document.getElementById(parent.dataset.link);
    elementToScrollTo.scrollIntoView({block: 'end', behavior: 'smooth'})
});

// Set the navigation tab active or inactive on small screens

open.addEventListener("click", () => {
    nav.classList.add("open-nav");
})

exit.addEventListener("click", () => {
    nav.classList.remove("open-nav");
})

// Set sections as active

sections.forEach(section => {
    observer.observe(section);  
});
