
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
 
const sections = document.querySelectorAll("section"); //Get All element with section tag
const navbarMenu = document.getElementById("navbar__list"); // Get navigation bar so we can use it to move from one tab to another

const arrowTop = document.querySelector(".arrow-top"); // Get Arrow Top

/**
 * End Global Variables
 *
 * Start Helper Functions
 *
 */
 
//*Creating List Items

function creatListItems() {
  for (item of sections) {
	  
	let listItems = document.createElement("li"); 	// Craeting listItems
	let anchor = document.createElement("a"); 	// Creating anchor tag
    let sectionName = item.getAttribute("data-nav"); 	// Getting Data-nav of This Section


    let myTextNode = document.createTextNode(sectionName); 	//saving sectionName as a text so we can put it in the navbar	

    let attr = document.createAttribute("href"); 	// Creating href 	


	navbarMenu.appendChild(listItems); // putting listItems in navbarMenu
	listItems.appendChild(anchor);// putting anchor in listItems
    anchor.appendChild(myTextNode);// putting the text node in the anchor
    let sectionId = item.getAttribute("id"); 	// Getting Section Id

    attr.value = `#${sectionId}`; // setting the href value
    anchor.setAttributeNode(attr); 	//Adding href to anchor

    anchor.classList.add("menu__link"); 	// Addinng class menu__link to anchor

    listItems.appendChild(anchor); 	// Adding anchor to li

    navbarMenu.appendChild(listItems); 	// Add anchor to li
  }
}

// Highligt current section and remove highligh from other Sections
function HighlightSection() {
  for (item of sections) {
    const rect = item.getBoundingClientRect();

    if (rect.top >= 0 && rect.top <= 300) 
	{
		for (section of sections) 
		{
			if (section.classList.contains("Active")) 
			{
          section.classList.remove("Active");	//removing class active to list item - remove highlight
			}
		}
      item.classList.add("Active"); //Add class active to list item - highlighting 
	  ActivateAnchor(); //activat the anchor of current section
    }
  }
}

function  ActivateAnchor (){
	let Anchors = document.querySelectorAll(".menu__link");
      Anchors.forEach((a) => {
        if (item.getAttribute("data-nav") == a.textContent) 
		{
          a.classList.add("active"); // activat the current section
        } 
		else
		{
          a.classList.remove("active"); // deactivate that section
        }
      });
}

//Smooht scroll
function smoothScroll() {
	let Hrefs =document.querySelectorAll('a[href^="#"]');
	for(a of Hrefs)
	{
		a.addEventListener("click", function (e) 
		{
		e.preventDefault();
		document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
		});
		});
	}
}

/*
showing and hiding the pageHeader
*/
let hidePageHeader = function (callback) {
  let scrol; 
  if (!callback || typeof callback !== "function") {
    return;
  }
  window.addEventListener(
    "scroll",
    () => {
      window.clearTimeout(scrol); // Clearing timeout
	  let pageHeader =document.querySelector(".page__header"); 
      pageHeader.classList.remove("hide"); // show the pageHeader 
      scrol = setTimeout(() => {
        callback();
      }, 5000); 
    },
    false
  );
};

// showing the arrow top
function checkWindowOffset() {
  //chek the offset Of thae window
  if (window.pageYOffset > 100) 
  {
    arrowTop.classList.add("show"); 	//Adding class show
  } 
  else 
  {
    arrowTop.classList.remove("show"); 	//Removing class show
  }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

creatListItems();

document.addEventListener("scroll", HighlightSection);
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
