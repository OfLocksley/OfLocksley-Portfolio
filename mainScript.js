
const allContentTypesList = [];
const contentData = [];
let contentColorFill = "#5d3b7e";

function getAllContentTypes() {
  const allContentTypesList = Array.from(document.querySelectorAll('.categoryContent'), el => el.dataset.contentTitle);
  const contentData = Array.from(document.querySelectorAll('.categoryContent'), el => ({ id: el.id,
                                                                                         class: el.classList,
                                                                                         innerHTMLContent: el.innerHTML
                                                                                        }));
  allContentTypesList.forEach(populateMenu);
  console.log(allContentTypesList);
  console.log(contentData);
}
    
function populateMenu(item){

  const menuDiv = document.createElement("div");
  menuDiv.setAttribute('onclick', 'pageContentSelected(this)');
  menuDiv.id = item.toLowerCase().split(' ').map((word, index) => {
                                                      if (index === 0) return word;
                                                      return word.charAt(0).toUpperCase() + word.slice(1);
                                                    }).join('')+"btn";
  menuDiv.classList = "menuItem smooth";
  menuDiv.innerHTML = item;
  document.getElementById("mainMenuList").appendChild(menuDiv);
}

function menuChange(x) {
  x.classList.toggle("change");
  if (document.getElementById("mainMenuList").classList.contains("mainMenuRevealOnLoad")){
    document.getElementById("mainMenuList").classList.remove("mainMenuRevealOnLoad");
    document.getElementById("mainMenuList").classList.toggle("mainMenuReveal");
  } else{
  document.getElementById("mainMenuList").classList.toggle("mainMenuReveal");
  document.getElementById("mainMenuList").classList.toggle("mainMenuHide");
  }
}

function hoverSearchBar() {
  document.getElementById("searchBar").classList.toggle("mainMenuReveal");
}

function pageContentSelected(x) {
  
  const getContentType = x.id.slice(0, -3)+"Info"; 
    menuIcon.classList.toggle("change");
    document.getElementById("mainMenuList").classList.toggle("mainMenuReveal");
    document.getElementById("mainMenuList").classList.toggle("mainMenuHide");
    document.querySelectorAll('.categoryContent').forEach(el => {
      const opacity = window.getComputedStyle(el).getPropertyValue("opacity");
      if (el.id == getContentType) {
      el.classList.remove("pageContentHide")
      el.classList.add("pageContentReveal");

      }
      if (parseFloat(opacity) === 1) {
        el.classList.remove("pageContentReveal")
        el.classList.add("pageContentHide");

      }

    });

}



const pageContent = document.getElementById("pageContent");
function crossFadeImageScroll() {
  if (pageContent.scrollTop > 35) {
    console.log("yes");
    document.getElementById("hiddenImage").className = "imageCrossFadeIn";
  }
  
  if (pageContent.scrollTop < 15 && document.getElementById("hiddenImage").className == "imageCrossFadeIn") {
    document.getElementById("hiddenImage").className = "imageCrossFadeOut";
  }
}

pageContent.addEventListener('scroll', crossFadeImageScroll);