const allContentTypesList = [];
const contentData = [];
let contentColorFill = "#5d3b7e";
  console.log('Raw DNA: ',DNA);
  //console.log('sections DNA: ',DNA["Sections"]);

function injectDNA() {

  Object.entries(DNA["Sections"]).forEach(([Sections]) => {
    allContentTypesList.push(Sections);

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
      sectionProject.id = project.toLowerCase().split(' ').map((word, index) => {
          if (index === 0) return word;
          return word.charAt(0).toUpperCase() + word.slice(1);
      }).join('');
      sectionProject.classList.add(project);
      sectionProject.dataset.projectTitle = project;
      sectionShell.appendChild(sectionProject);

      //console.log(Sections,project);
      Object.entries(DNA["Sections"][Sections][project]).forEach(([content]) => {
        const sectionProject = document.getElementById(project.toLowerCase().split(' ').map((word, index) => { if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join(''));
        if (content === "Thumbnail") {
          const projectThumbnail = document.createElement('div');

          projectThumbnail.id = project.toLowerCase().split(' ').map((word, index) => { if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('')+"Thumb";
          projectThumbnail.classList.add("threedThumbnail");
          sectionProject.dataset.projectTitle = project;
          sectionProject.appendChild(projectThumbnail);
          console.log(Sections,project,content);
          const crossFadeImg = document.createElement('div');
          crossFadeImg.id =  project.toLowerCase().split(' ').map((word, index) => { if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('')+"CrossFadeImg";
          crossFadeImg.classList = "imageCrossFade";
          crossFadeImg.dataset.projectTitle = project;
          const projectThumbnailFocusImg = document.createElement('img');
          const projectThumbnailUnfocusImg = document.createElement('img');

        Object.entries(DNA["Sections"][Sections][project][content]).forEach(([image]) => {
          const projectThumbnail = document.getElementById(project.toLowerCase().split(' ').map((word, index) => { if (index === 0) return word; return word.charAt(0).toUpperCase() + word.slice(1);}).join('')+"Thumb");

          if (image.includes("Focus")){
            projectThumbnailFocusImg.classList = "imageCrossFadeStartHidden";
            projectThumbnailFocusImg.src = `Sections/${Sections}/${project}/${content}/${image}`;
          } else if (image.includes("Unfocus")){
            projectThumbnailUnfocusImg.src = `Sections/${Sections}/${project}/${content}/${image}`;
            crossFadeImg.appendChild(projectThumbnailUnfocusImg);
          }
        });
        
        console.log(projectThumbnailUnfocusImg.src, projectThumbnailFocusImg.src);
        crossFadeImg.appendChild(projectThumbnailFocusImg);
        projectThumbnail.appendChild(crossFadeImg);
         /* <div id="ItPennywiseStatue3dSculptThumb" class="threedThumbnail" data-subject-title="It Pennywise Statue 3D Sculpt">
                            <div class="imageCrossFade " id="ItPennywiseStatue3dSculptimageCrossFade" data-subject-title="It Pennywise Statue 3D Sculpt">
                                <img src="Sections\3D\It-Pennywise-Statue-3D-Sculpt\Thumbnail\It-Pennywise-Statue-3D-Sculpt-Unfocus.avif">
                                <img class="imageCrossFadeStartHidden" id="ItPennywiseStatue3dSculpthiddenImage" src="Sections\3D\It-Pennywise-Statue-3D-Sculpt\Thumbnail\It-Pennywise-Statue-3D-Sculpt-Focus.avif" >
                            </div>
                        </div>*/
        } else if (content === "Spins") {

        } else if (content === "Image-Gallery") {

        }

      //console.log(Sections,project,content);

      });
    });
  })
}
    
//function populateMenu(item){


//}

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
      el.classList.remove("pageContentRevealOnLoad")
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