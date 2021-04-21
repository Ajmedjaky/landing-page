
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
 // Get navbar ul
let navbarMenu = document.getElementById("navbar__list"); 
//Get All sections
let sections = document.querySelectorAll("section"); 
// Get Arrow Top
let arrowTop = document.querySelector(".arrow-top"); 
/**
 * End Global Variables
 *
 * Start Helper Functions
 *
 */
 
//*Creating List Items

function creatListItems() {
  for (item of sections) {
	// Getting Data-nav of This Section
    let sectionName = item.getAttribute("data-nav"); 
	//Creating TextNode of this data_nav	
    let textNode = document.createTextNode(sectionName); 
	// vreating href 	
    let attr = document.createAttribute("href"); 
	// Creating anchor tag
    let anchor = document.createElement("a"); 
	// Craeting listItems
    let listItems = document.createElement("li"); 
    anchor.appendChild(textNode);
	// Getting Section Id
    let sectionId = item.getAttribute("id"); 
    attr.value = `#${sectionId}`;
	//Adding href to anchor
    anchor.setAttributeNode(attr); 
	// Addinng class menu__link to anchor
    anchor.classList.add("menu__link"); 
	// Adding anchor to li
    listItems.appendChild(anchor); 
	// Add anchor to li
    navbarMenu.appendChild(listItems); 
	// Getting attribute href Section
    let anchorId = anchor.getAttribute("href"); 
	
	
    //Smooht scroll
    anchor.addEventListener("click", () => {
      section.scrollIntoView({ behavior: "smooth" });

    });
  }
}

// Adding Active class to current section and removing it from other Sections
function ActivateSection() {
  sections.forEach((item) => {
    const rect = item.getBoundingClientRect();

    if (rect.top >= 0 && rect.top <= 300) {
		sections.forEach((section) => {
        if (section.classList.contains("Active")) {
		//Removing class Active
          section.classList.remove("Active"); 
        }
      });
      item.classList.add("Active"); 
      let links = document.querySelectorAll(".menu__link");
      links.forEach((link) => {
        if (item.getAttribute("data-nav") == link.textContent) 
		{
          link.classList.add("active"); // Add class Active to list item
        } 
		else
		{
          link.classList.remove("active"); // Add class Active to list item
        }
      });
    }
  });
}

//Smooht scroll
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}


let hidePageHeader = function (callback) {
  let scrol; 
  if (!callback || typeof callback !== "function") {
    return;
  }
  window.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(scrol); // Clearing timeout
      document.querySelector(".page__header").classList.remove("hide");
      scrol = setTimeout(() => {
        callback();
      }, 5000); 
    },
    false
  );
};

//arrow top
function checkWindowOffset() {
  //chek the offset Of thae window
  if (window.pageYOffset > 100) 
  {
	//Adding class show
    arrowTop.classList.add("show"); 
  } 
  else 
  {
	//Removing class show
    arrowTop.classList.remove("show");
  }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

creatListItems();

document.addEventListener("scroll", ActivateSection);
smoothScroll();

/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener("scroll", checkWindowOffset);

hidePageHeader(() => {
  document.querySelector(".page__header").classList.add("hide");
});
arrowTop.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo(0, 0);
});
