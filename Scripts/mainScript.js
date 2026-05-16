const allContentTypesList = []
const pageTitle = document.getElementById('pageTitle');
const searchNpage = document.getElementById('searchNpage');
const searchBarInput = document.getElementById('searchBarInput');
const searchBtn = document.getElementById('searchBtn');
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
let currentSection = "";
let getContentType = "";
let contentColorFill = "#5d3b7e";
  //console.log('Raw DNA: ',DNA);
  //console.clear();
  //console.log('ContentSections: ',allContentTypesList);
  console.log('sections DNA: ',DNA["Sections"]);

function injectDNA() {

  Object.entries(DNA["Sections"]).forEach(([Sections]) => {
    allContentTypesList.push(Sections);
    sessionStorage.setItem("ContentSections", JSON.stringify(allContentTypesList));
    const menuDiv = document.createElement("div");
    menuDiv.setAttribute('onclick', 'pageContentSelected(this)');
    menuDiv.id = Sections.toLowerCase().split(' ').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('')+"btn";
    menuDiv.classList = "menuItem smooth";
    menuDiv.innerHTML = Sections;
    document.getElementById("mainMenuList").appendChild(menuDiv);

    const sectionShell = document.createElement('div');
    sectionShell.id = Sections.toLowerCase().split(' ').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('')+"Shell";
    sectionShell.classList = "categoryContent smooth pageContentRevealOnLoad";
    sectionShell.dataset.contentTitle = Sections;
    document.getElementById("pageContent").appendChild(sectionShell);
    //allContentTypesList.forEach(populateMenu);
    //console.log(Sections);

    Object.entries(DNA["Sections"][Sections]).forEach(([project]) => {
      const sectionShell = document.getElementById(Sections.toLowerCase().split(' ').map((word, index) => { if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('')+"Shell");
      const sectionProject = document.createElement('div');
      sectionProject.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
      sectionProject.classList.add(project);
      sectionProject.dataset.projectTitle = project;
      sectionShell.appendChild(sectionProject);

      Object.entries(DNA["Sections"][Sections][project]).forEach(([content]) => {
        const sectionProject = document.getElementById(project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", ""));
        if (content === "Thumbnail") {
          const projectThumbnail = document.createElement('div');

          projectThumbnail.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"Thumb";
          projectThumbnail.classList.add("threedThumbnail");
          sectionProject.dataset.projectTitle = project;
          sectionProject.appendChild(projectThumbnail);
          
          const crossFadeImg = document.createElement('div');
          crossFadeImg.id =  project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"CrossFadeImg";
          crossFadeImg.classList = "imageCrossFade";
          crossFadeImg.dataset.projectTitle = project;
          const projectThumbnailFocusImg = document.createElement('img');
          const projectThumbnailUnfocusImg = document.createElement('img');

        Object.entries(DNA["Sections"][Sections][project][content]).forEach(([image]) => {
          const projectThumbnail = document.getElementById(project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"Thumb");

          if (image.includes("Focus")){
            projectThumbnailFocusImg.classList = "imageCrossFadeStartHidden";
            projectThumbnailFocusImg.src = `Sections/${Sections}/${project}/${content}/${image}`;
          } else if (image.includes("Unfocus")){
            projectThumbnailUnfocusImg.src = `Sections/${Sections}/${project}/${content}/${image}`;
            crossFadeImg.appendChild(projectThumbnailUnfocusImg);
          }
        });
        
        crossFadeImg.appendChild(projectThumbnailFocusImg);
        projectThumbnail.appendChild(crossFadeImg);
        
        } else if (content === "Spins") {
          const projectSpins = document.createElement('div');
          projectSpins.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"Spins";
          const default360PlaceholderImage = "Universal-Images/menu-items/buttons/360-icon.avif";
          const spinsLoadingMsg = document.createElement('div');
          const viewer = document.createElement('img');
          const closeSpinTheater = document.createElement('div');
          const spinTopMenu = document.createElement('div');
          const spinTheater = document.createElement('div');
          const setResolutionSDBtn = document.createElement('div');
          const setResolutionHDBtn = document.createElement('div');
          
          spinsLoadingMsg.classList = "spin-images-loading-message";
          viewer.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"SpinsViewer";
          viewer.classList.add("SpinsViewer");
          viewer.src = default360PlaceholderImage;
          viewer.dataset.projectTitle = project;
          spinTheater.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"spinTheater";
          spinTheater.classList = "shadowFocus";
          spinTheater.dataset.projectTitle = project;
          spinTopMenu.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"spinTopMenu";
          spinTopMenu.classList = "spinTopMenu";
          spinTopMenu.dataset.projectTitle = project;
          closeSpinTheater.innerHTML = "X";
          closeSpinTheater.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"closeSpinTheater";
          closeSpinTheater.classList = "closeSpinTheater";
          closeSpinTheater.dataset.projectTitle = project;
          setResolutionSDBtn.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"SpinsSetResolutionSDBtn";
          setResolutionSDBtn.classList.add("SpinsSetResolutionSDBtn", "resBtns");
          setResolutionSDBtn.innerHTML = "SD";
          setResolutionSDBtn.dataset.projectTitle = project;
          setResolutionHDBtn.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"SpinsSetResolutionHDBtn";
          setResolutionHDBtn.classList.add("SpinsSetResolutionHDBtn", "resBtns");
          setResolutionHDBtn.innerHTML = "HD";
          setResolutionHDBtn.dataset.projectTitle = project;

          const projectSpinAmount = Object.entries(DNA["Sections"][Sections][project][content])
          const totalImages = Object.keys(projectSpinAmount).length/2;
          Object.entries(DNA["Sections"][Sections][project][content]).forEach(([image]) => {

            if (image.includes("-half-res-")){
               halfResImages.push(`Sections/${Sections}/${project}/${content}/${image}`);
               
            } else if (image.includes("-third-res-")){
              thirdResImages.push(`Sections/${Sections}/${project}/${content}/${image}`);
            }
          })
          
          
          projectSpins.classList.add("imageSpins");
          sectionProject.dataset.projectTitle = project;
          spinTopMenu.appendChild(setResolutionSDBtn);
          spinTopMenu.appendChild(setResolutionHDBtn);
          spinTopMenu.appendChild(closeSpinTheater);
          spinTheater.appendChild(spinTopMenu);
          spinTheater.appendChild(spinsLoadingMsg);
          spinTheater.appendChild(viewer);
          projectSpins.appendChild(spinTheater);
          sectionProject.appendChild(projectSpins);
          spinLoader();
        } else if (content === "Image-Gallery") {

        }
        
         
        //console.log(Sections,project,content);
        
      });
    });
  })

   document.querySelectorAll(".threedThumbnail").forEach(el => {
            
          el.addEventListener('pointerover', (e) => {
            const hiddenThumb = e.target;            
                  hiddenThumb.style.opacity = 1;            
          }) 

          el.addEventListener('pointerout', (e) => {
            const hiddenThumb = e.target;            
                  hiddenThumb.style.opacity = 0;            
          })
          
          el.addEventListener('pointerdown', (e) => {
            const thumbP = e.target.parentElement.parentElement;
            const spinsp = thumbP.previousElementSibling;
            const shadowTheater = spinsp.firstElementChild;
            shadowTheater.style.display = "flex";
            console.log(shadowTheater);

          })

          })

    document.querySelectorAll(".closeSpinTheater").forEach(el => {
          
          el.addEventListener('pointerdown', (e) => {
            const shadowTheater = e.target.parentElement.parentElement;
            shadowTheater.style.display = "none";
          })

          })

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

function updateSections() {
  currentSection = sessionStorage.getItem("currentSection");
  getContentType = currentSection.replace(/ /gm,"")+"Shell";
  loadCurrentSection()
  //console.clear()
  //console.log('ContentSections: ',allContentTypesList);
  //console.log(currentSection) 
  //console.log(getContentType)
}

function pageContentSelected(x) {  
      sessionStorage.setItem("currentSection", x.innerHTML);
      updateSections();
      menuIcon.classList.toggle("change");
      document.getElementById("mainMenuList").classList.toggle("mainMenuReveal");
      document.getElementById("mainMenuList").classList.toggle("mainMenuHide");    
}

function loadCurrentSection() {
  document.querySelectorAll('.categoryContent').forEach(el => {
        if (el.dataset.contentTitle === currentSection) {
          
          pageTitle.classList.add("titleSwapFadeHide")
          el.classList.remove("pageContentRevealOnLoad")
          el.classList.remove("pageContentHide");
          el.classList.add("pageContentReveal");
          setTimeout(() => {
            pageTitle.classList.remove("titleSwapFadeHide")
            pageTitle.innerHTML = currentSection;
            pageTitle.classList.add("titleSwapFadeReveal");
          }, 250);
        }
        if (el.dataset.contentTitle !== currentSection && el.classList.contains("pageContentReveal")) {
          el.classList.remove("pageContentReveal")
          el.classList.add("pageContentHide");
        }
    });
}

window.addEventListener('load', () => {
    const url = new URL(window.location.href);
    const urlHash = url.hash;
    updateSections()
    if (url.hash !== ""){
    sessionStorage.setItem("currentSection", window.location.hash.slice(1).split(/(?<!\d)(?=[A-Z])/).join(' '));
    updateSections();
    url.hash = "";
    window.location.replace(url.href);
    }
})

window.addEventListener('hashchange', function() {
  sessionStorage.setItem("currentSection", window.location.hash.slice(1).split(/(?<!\d)(?=[A-Z])/).join(' '));
  updateSections();
});

window.addEventListener('beforeunload', function() {
  sessionStorage.setItem("currentSection", "Home");
})



searchNpage.addEventListener('mouseenter', function(e) {
  searchBarInput.classList.remove('shortSearchBar');
  searchBarInput.classList.add('longSearchBar');
  setTimeout(() => {
    searchBtn.classList.remove('shortSearchBtn');
    searchBtn.classList.add('longSearchBtn');
    }, 250);
  
})

searchNpage.addEventListener('mouseleave', function(e) {
  searchBarInput.classList.add('shortSearchBar');
  searchBarInput.classList.remove('longSearchBar');
  setTimeout(() => {
    searchBtn.classList.add('shortSearchBtn');
    searchBtn.classList.remove('longSearchBtn')
          }, 250);
  

})

/*
const pageContent = document.getElementById("pageContent");
function crossFadeImageScroll() {
  if (pageContent.scrollTop > 75 && pageContent.scrollTop < 800) {
    console.log("yes");
    document.getElementById("imageCrossFade").className = "imageCrossFadeIn";
  }
  
  if (pageContent.scrollTop < 65 && document.getElementById("hiddenImage").className == "imageCrossFadeIn") {
    document.getElementById("imageCrossFadeStartHidden").className = "imageCrossFadeOut";
 }
}

pageContent.addEventListener('scroll', crossFadeImageScroll);
*/