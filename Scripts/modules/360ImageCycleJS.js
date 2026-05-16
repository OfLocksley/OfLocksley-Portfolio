                                                                                                                                                /*
⎲
 ▎
【 ᛗᚴ 360 Image Module 】 

👑
💀
360 Image viewer with click and drag rotation, click auto rotate with toggle direction and loading screen

【 ᛗᚴ 360 Image Module 】
 ▎
⎳
                                                                                                                                                */


                                                                                                                                                /*
⎲
 ▎
【 ᛗᚴ 360 click and Drag Module Feature 】 
                                                                                                                                                */
        let imgIndex = 0;
        let images = [];
        let halfResImages = [];
        let thirdResImages = [];
        let setResolution = "";
        let isDragging = false;
        let isSpinning = false;
        let lastSpin = "counterClockwise";
        let startX;
        let currentImgIndex = 0;
        let loadedCount = 0;

        let dragThrottle = false;
        let pendingImageIndex = null;

    function spinLoader() {
        let spinsViewer = "";
        let loadingEl = "";
        const setResolutionSDBtn = document.querySelectorAll('.SpinsSetResolutionSDBtn');
        const setResolutionHDBtn = document.querySelectorAll('.SpinsSetResolutionHDBtn');

        setResolutionSDBtn.forEach(el => {
            
            el.addEventListener('click', async(event) => {
                if (el.dataset.projectTitle === el.nextElementSibling.dataset.projectTitle){
                    const loadingEl = event.target.parentElement.nextElementSibling;
                    const spinsViewer = loadingEl.nextElementSibling;
                    spinsViewer.classList.add("pageContentHide");
                    spinsViewer.style.display = "block";
                    
                    try {
                        await preloadImages(thirdResImages, loadingEl);  // ✅ Wait for preload to complete
                        images = thirdResImages;
                        setResolution = "SD";
                        updateViewerSource(spinsViewer, loadingEl);
                    } catch(err) {
                        console.error(err);
                        loadingEl.innerText = "Failed to load images";
                    }
                    spinsBeDraggin(spinsViewer);
                }
            });
            
        })
        setResolutionHDBtn.forEach(el => {        
            el.addEventListener('click', async () => {
                spinsViewer.classList = "pageContentHide";
                loadingEl.style.display = "block";
                
                try {
                    await preloadImages(halfResImages);  // ✅ Wait for preload to complete
                    images = halfResImages;
                    setResolution = "HD";
                    updateViewerSource();
                } catch(err) {
                    console.error(err);
                    loadingEl.innerText = "Failed to load images";
                }
            });
        })

        async function preloadImages(urls, loadingEl) {
            loadedCount = 0;
                const promises = urls.map(url => {
                    loadedCount++;
                    const percentage = Math.round((loadedCount / urls.length) * 100);
                    loadingEl.innerText = `Loading... ${percentage}%`;
                    return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = url;
                    img.onload = () => resolve(img);
                    img.onerror = () => reject(`Failed to load ${url}`);

                    });
                });
                return await Promise.all(promises);
                
            }

           function updateViewerSource(spinsViewer, loadingEl){
                    currentImgIndex = imgIndex
                    loadingEl.style.display = 'none';
                    spinsViewer.src = setResolution === "SD" ? thirdResImages[currentImgIndex] : setResolution === "HD" ? halfResImages[currentImgIndex] : default360PlaceholderImage;
                    spinsViewer.classList.remove("pageContentHide");
                    spinsViewer.classList.add("pageContentReveal");
                    console.log(spinsViewer.src);
            }
            
            let startTime;
            let endTime;
        document.querySelectorAll('.SpinsViewer').forEach(el => {   
            
            if (isMobile) {
                            el.addEventListener('touchstart', (e) => {
                                isDragging = true;
                                startX = e.touches[0].clientX;
                                startTime = Date.now();
                                e.preventDefault();
                                console.log("touch started", startTime);
                            });

                            el.addEventListener('touchend', (e) => {
                                isDragging = false;
                                endTime = Date.now();
                                console.log("touch ended", endTime);
                                autoSpins(el, startTime, endTime);
                            })
                } else { 
                            el.addEventListener('pointerdown', (e) => {
                                isDragging = true;
                                startX = e.clientX;
                                startTime = Date.now();
                                e.preventDefault()
                                console.log("pointer Down");
                            }); 
                            document.addEventListener('pointerup', () => {
                                isDragging = false;
                                endTime = Date.now();
                                console.log("pointer Up");
                            });

                            el.addEventListener('click', (e) => {
                        autoSpins(el, startTime, endTime);
                        }); 
                } 
            
        })
        

        function spinsBeDraggin(spinsViewer) {
        document.addEventListener('pointermove', (e) => {
            if (!isDragging) return;
            const currentX = e.clientX;
            const diff = currentX - startX;
            // Change image based on drag distance threshold
            if (Math.abs(diff) > 2) { 
                imgIndex = (diff < 0) ? 
                    (imgIndex - 1 + images.length) % images.length : 
                    (imgIndex + 1) % images.length;
                    currentImgIndex = imgIndex;
                spinsViewer.src = images[imgIndex];
                console.log("dragging");
                startX = currentX; // Reset startX for next swap
                if (!dragThrottle) {
                            dragThrottle = true;
                            requestAnimationFrame(() => {
                                spinsViewer.src = images[imgIndex];
                                dragThrottle = false;
                            });
                        }
                        
                        if (isDragging === true && isSpinning === true) {    
                            isSpinning = false;
                            clearInterval(intervalId);
                        }
                    }
                    
                    
                });
                
        }
        
                                                                                                                                                /*
【 ᛗᚴ 360 click and Drag Module Feature 】
 ▎
⎳
                                                                                                                                                */
                                                                                                                                                /*
⎲
 ▎
【 ᛗᚴ 360 Toggle Auto Module Feature 】 
                                                                                                                                                */
    

            let intervalId;
            function autoSpins(el, startTime, endTime) {

                let duration;

                if (isMobile){
                    duration = endTime - startTime;
                } else {
                duration = Date.now() - startTime;
            }
                const spinsViewer = el;

                console.log(duration);
                
                if (duration < 200 && isDragging === false){
                    isSpinning = isSpinning === true ? false : true;
                    console.log("click drag while spinning reset");
                    clearInterval(intervalId);
                    }
                
                if (duration < 200 && isDragging === false && isSpinning === true) {
                    
                        if (lastSpin === "counterClockwise") {
                            intervalId = setInterval(() => {
                                    imgIndex = (imgIndex - 1 + images.length) % images.length;
                                
                            spinsViewer.src = images[imgIndex];
                                }, 50)
                            } else if (lastSpin === "clockwise") {
                                intervalId = setInterval(() => {
                                    imgIndex = (imgIndex + 1) % images.length;
                                spinsViewer.src = images[imgIndex];
                                }, 50)
                            }
                        lastSpin = lastSpin === "counterClockwise" ? "clockwise" : "counterClockwise";
                        console.log("last spin: " + lastSpin + "is spinning: " + isSpinning);
                        
                    } 
                }        
            
    }
                                                                                                                                                /*
【 ᛗᚴ 360 Toggle Auto Module Feature 】
 ▎
⎳
                                                                                                                                                */

