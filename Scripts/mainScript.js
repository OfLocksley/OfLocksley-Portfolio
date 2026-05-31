const allContentTypesList = [];
const allSubSectionsList = [];
const allProjectsList = [];
const allProjectContent = [];
const allProjectSpins = {};
const pageTitle = document.getElementById('pageTitle');
const searchNpage = document.getElementById('searchNpage');
const searchBarInput = document.getElementById('searchBarInput');
const searchBtn = document.getElementById('searchBtn');
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
const projectStates = new Map();

let currentSection = "";
let getContentType = "";
let contentColorFill = "#5d3b7e";
  console.log('Raw DNA: ',DNA);
  //console.clear();
  console.log('Sections: ',allContentTypesList);
  //console.log('sections DNA: ',DNA["Sections"]);
  console.log('Projects: ',allProjectsList);
  console.log('Content: ',allProjectContent);
  console.log('360 Spins: ',allProjectSpins);

function injectDNA() {

  Object.entries(DNA["Sections"]).forEach(([Sections]) => {
    allContentTypesList.push(Sections.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join(''));
    sessionStorage.setItem("ContentSections", JSON.stringify(allContentTypesList));
    const menuDiv = document.createElement("div");
    menuDiv.setAttribute('onclick', 'pageContentSelected(this)');
    menuDiv.id = Sections.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('')+"Btn";
    menuDiv.classList = "menuItem smooth";
    menuDiv.innerHTML = Sections.split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join(' ');
    document.getElementById("mainMenuList").appendChild(menuDiv);

    const sectionShell = document.createElement('div');
    sectionShell.id = Sections.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('')+"Shell";
    sectionShell.classList = "categoryContent smooth pageContentRevealOnLoad";
    sectionShell.dataset.contentTitle = Sections.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('');
    document.getElementById("pageContent").appendChild(sectionShell);

    Object.entries(DNA["Sections"][Sections]).forEach(([SubSection]) => {
      allSubSectionsList.push();

      Object.entries(DNA["Sections"][Sections][SubSection]).forEach(([project]) => {
        allProjectsList.push(project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", ""))
        const sectionShell = document.getElementById(Sections.toLowerCase().split('-').map((word, index) => { if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('')+"Shell");
        const sectionProject = document.createElement('div');
        sectionProject.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
        sectionProject.classList.add("smooth", "idleProject");
        sectionProject.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
        sectionShell.appendChild(sectionProject);
        
        Object.entries(DNA["Sections"][Sections][SubSection][project]).forEach(([content]) => {
          const sectionProject = document.getElementById(project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", ""));
          allProjectContent.push(content)
          if (content === "Thumbnail") {
            const projectThumbnail = document.createElement('div');

            projectThumbnail.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"Thumb";
            projectThumbnail.classList.add("projectThumbnail");
            projectThumbnail.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            sectionProject.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            sectionProject.prepend(projectThumbnail);
            
            const crossFadeImg = document.createElement('div');
            crossFadeImg.id =  project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"CrossFadeImg";
            crossFadeImg.classList = "imageCrossFade";
            crossFadeImg.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            const projectThumbnailFocusImg = document.createElement('img');
            const projectThumbnailUnfocusImg = document.createElement('img');

          Object.entries(DNA["Sections"][Sections][SubSection][project][content]).forEach(([image]) => {
            const projectThumbnail = document.getElementById(project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"Thumb");

            if (image.includes("Focus")){
              projectThumbnailFocusImg.classList = "imageCrossFadeStartHidden";
              projectThumbnailFocusImg.src = `Sections/${Sections}/${SubSection}/${project}/${content}/${image}`;
            } else if (image.includes("Unfocus")){
              projectThumbnailUnfocusImg.src = `Sections/${Sections}/${SubSection}/${project}/${content}/${image}`;
              crossFadeImg.appendChild(projectThumbnailUnfocusImg);
            }
          });
          
          crossFadeImg.appendChild(projectThumbnailFocusImg);
          projectThumbnail.appendChild(crossFadeImg);
          
          } if (content === "Spins") {
            const projectSpins = document.createElement('div');
            projectSpins.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"Spins";
            projectSpins.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
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
            viewer.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            spinTheater.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"spinTheater";
            spinTheater.classList = "shadowFocus";
            spinTheater.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            spinTopMenu.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"spinTopMenu";
            spinTopMenu.classList = "spinTopMenu";
            spinTopMenu.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            closeSpinTheater.innerHTML = "X";
            closeSpinTheater.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"closeSpinTheater";
            closeSpinTheater.classList = "closeSpinTheater";
            closeSpinTheater.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            setResolutionSDBtn.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"SpinsSetResolutionSDBtn";
            setResolutionSDBtn.classList.add("SpinsSetResolutionSDBtn", "resBtns");
            setResolutionSDBtn.innerHTML = "SD";
            setResolutionSDBtn.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            setResolutionHDBtn.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"SpinsSetResolutionHDBtn";
            setResolutionHDBtn.classList.add("SpinsSetResolutionHDBtn", "resBtns");
            setResolutionHDBtn.innerHTML = "HD";
            setResolutionHDBtn.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            const projectSpinAmount = Object.entries(DNA["Sections"][Sections][SubSection][project][content])
            const totalImages = Object.keys(projectSpinAmount).length/2;
            

            Object.entries(DNA["Sections"][Sections][SubSection]).forEach(([projectName, projectData]) => {
              const halfResImages = [];
              const thirdResImages = [];
              
              Object.entries(projectData["Spins"] || {}).forEach(([image]) => {
                if (image.includes("-half-res-")){
                  halfResImages.push(`Sections/${Sections}/${SubSection}/${projectName}/${content}/${image}`);
                } else if (image.includes("-third-res-")){
                  thirdResImages.push(`Sections/${Sections}/${SubSection}/${projectName}/${content}/${image}`);
                }
              });
              
              allProjectSpins[projectName] = { halfResImages, thirdResImages};
              
              
            });
            
            projectSpins.classList.add("imageSpins");
            sectionProject.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            spinTopMenu.appendChild(setResolutionSDBtn);
            spinTopMenu.appendChild(setResolutionHDBtn);
            spinTopMenu.appendChild(closeSpinTheater);
            spinTheater.appendChild(spinTopMenu);
            spinTheater.appendChild(spinsLoadingMsg);
            spinTheater.appendChild(viewer);
            projectSpins.appendChild(spinTheater);
            sectionProject.appendChild(projectSpins);
            spinLoader(viewer);

          } if (content == `${project}.md`) {
            const projectTextContentContainer = document.createElement('div');
            projectTextContentContainer.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"Text";
            projectTextContentContainer.classList.add("projectText");
            projectTextContentContainer.classList.add("smooth");
            projectTextContentContainer.classList.add("notBeingViewed");
            fetchMarkdown(`Sections/${Sections}/${SubSection}/${project}/${content}`).then(textContent => {
              projectTextContentContainer.innerHTML = textContent;
            })
            
            sectionProject.appendChild(projectTextContentContainer);
          } if (content === "Image-Gallery") {
            const projectImageGalleryContainer = document.createElement('div');
            const projectImageGalleryViewFinder = document.createElement('div');
            projectImageGalleryContainer.id = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "")+"GalleryContainer";
            projectImageGalleryContainer.classList.add('imageGalleryContainer');
            projectImageGalleryContainer.classList.add('smooth');
            projectImageGalleryContainer.classList.add("notBeingViewed");
            projectImageGalleryContainer.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");
            projectImageGalleryViewFinder.classList.add("ImageGalleryViewFinder");
            projectImageGalleryViewFinder.dataset.projectTitle = project.toLowerCase().split('-').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace("-", "");

            Object.entries(DNA["Sections"][Sections][SubSection][project][content]).forEach(([image]) => {
              const projectImage = document.createElement('img')
              projectImage.src = `Sections/${Sections}/${SubSection}/${project}/${content}/${image}`;
              projectImage.width = 250;
              projectImageGalleryContainer.append(projectImage);

            })

          projectImageGalleryContainer.appendChild(projectImageGalleryViewFinder);
          sectionProject.appendChild(projectImageGalleryContainer);
          } 
          

          
          //console.log(Sections,project,content);
          
        });
      });
    });
  })

  document.querySelectorAll(".projectThumbnail").forEach(el => {

    el.addEventListener('click', (e) => {
    const targetDataset = e.currentTarget.dataset.projectTitle;
    focusOnProject(el, targetDataset)
    console.log(targetDataset);
    })
    
    el.addEventListener('pointerover', (e) => {
            const hiddenThumb = e.target;
                  hiddenThumb.style.opacity = 1;
                  //console.log(hiddenThumb)      
            
          }) 

    el.addEventListener('pointerout', (e) => {
      const hiddenThumb = e.target;            
            hiddenThumb.style.opacity = 0;      
            
    })

  })

  function focusOnProject(target, pT){

  document.querySelectorAll(".beingViewed").forEach(el => {
    if (pT !== el.dataset.projectTitle) {
          el.classList.remove("beingViewed");
          el.classList.add("notBeingViewed");
          el.parentElement.classList.add("idleProject");
          el.parentElement.classList.remove("goBig");
    }
  });

  document.querySelectorAll(".notBeingViewed").forEach(el => {
      if (pT === el.dataset.projectTitle) {
          el.classList.add("beingViewed");
          el.classList.remove("notBeingViewed");
          el.parentElement.classList.remove("idleProject");
          el.parentElement.classList.add("goBig");
          setTimeout(() => {
              el.parentElement.scrollIntoView({
              behavior: 'smooth', // Animates the scroll journey smoothly
              block: 'start'      // Aligns the top of the element to the top of the viewport
            });
          }, 350);

      }   
  })

  
  }

   /*document.querySelectorAll(".projectThumbnail").forEach(el => {
            
    const targetDataset = el.parentElement.dataset.projectTitle;
    const targetImage = el.firstChild;

          targetImage.addEventListener('pointerover', (e) => {
            const hiddenThumb = e.target;
                  hiddenThumb.style.opacity = 1;
                  //console.log(hiddenThumb)      
            
          }) 

          targetImage.addEventListener('pointerout', (e) => {
            const hiddenThumb = e.target;            
                  hiddenThumb.style.opacity = 0;      
                  
          })
          
          targetImage.addEventListener('pointerup', (e) => {
            const thumbP = e.target.parentElement.parentElement;
            console.log(thumbP);
            const sP = getNextElementByClass(thumbP, 'imageSpins');
            console.log(sP);
            const shadowTheater = sP.firstChild;
            console.log(shadowTheater);
            shadowTheater.style.display = "flex";
            shadowTheater.classList.add('disabled-overlay');
            const projectName = thumbP.dataset.projectTitle;
            console.log(allProjectSpins[projectName]["thirdResImages"]);
            console.log(projectStates);
          })
        
          })*/

    document.querySelectorAll(".closeSpinTheater").forEach(el => {
          
          el.addEventListener('pointerup', (e) => {
            const shadowTheater = e.target.parentElement.parentElement;
            shadowTheater.style.display = "none";
            shadowTheater.classList.remove('disabled-overlay');
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
      const thisContent = x.innerHTML
      sessionStorage.setItem("currentSection", thisContent.toLowerCase().split(' ').map((word, index) => {if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('').replace(" ", ""));
      console.log(x);
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

function getNextElementByClass(element, className) {
  let next = element.nextElementSibling;
  
  while (next) {
    if (next.classList.contains(className)) {
      return next;
    }
    next = next.nextElementSibling;
  }
  return null; // No matching element found
}


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