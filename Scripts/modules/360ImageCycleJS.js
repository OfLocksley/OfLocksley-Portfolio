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
        let fullResImages = [];
        let halfResImages = [];
        let thirdResImages = [];
        let setResolution = "";
        const allRanges = [fullResImages, halfResImages, thirdResImages];
        let isDragging = false;
        let isSpinning = false;
        let lastSpin = "counterClockwise";
        let startX;
        let currentImgIndex = 0;
        let loadedCount = 0;
        const loadingEl = document.getElementById('spin-images-loading-message');
        const default360PlaceholderImage = "images/3D/360s/placeholder-image-360.png";

        const baseName = "images/3D/360s/it-pennywise-mirrors-statue/Pennywise-statue-360-";
        const fullResTurnsName = "full-res-";
        const halfResTurnsName = "half-res-";
        const thirdResTurnsName = "third-res-";
        const resTurnNames = ["full-res-","half-res-","third-res-"];
        const extension = ".avif";
        const totalImages = 120;
        
        for (let i = 1; i <= totalImages; i++) {
            allRanges.forEach((resGroup, index) => {
                resGroup.push(`${baseName}${resTurnNames[index]}${i.toString().padStart(4, '0')}${extension}`);
            });
        }


        const viewer = document.getElementById("viewer");
        const setResolutionSDBtn = document.getElementById("setResolutionSDBtn");
        const setResolutionHDBtn = document.getElementById("setResolutionHDBtn");
        const setResolutionUHDBtn = document.getElementById("setResolutionUHDBtn");

        
        setResolutionSDBtn.addEventListener('click', async () => {
            viewer.classList = "pageContentHide";
            loadingEl.style.display = "block";
            
            try {
                await preloadImages(thirdResImages);  // ✅ Wait for preload to complete
                images = thirdResImages;
                setResolution = "SD";
                updateViewerSource();
            } catch(err) {
                console.error(err);
                loadingEl.innerText = "Failed to load images";
            }
        });

        setResolutionHDBtn.addEventListener('click', async () => {
            viewer.classList = "pageContentHide";
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

        async function preloadImages(urls) {
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
                // Wait for all images to load
                return await Promise.all(promises);
                
            }

           function updateViewerSource(){
                    currentImgIndex = imgIndex
                    document.getElementById('spin-images-loading-message').style.display = 'none';
                    viewer.src = setResolution === "SD" ? thirdResImages[currentImgIndex] : setResolution === "HD" ? halfResImages[currentImgIndex] : default360PlaceholderImage;
                    viewer.classList.remove("pageContentHide");
                    viewer.classList.add("pageContentReveal");
                    console.log(viewer.src);
            }
            

        viewer.addEventListener('pointerdown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startTime = Date.now();
            e.preventDefault(); // Prevent default browser dragging
            
        });

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
                viewer.src = images[imgIndex];
                startX = currentX; // Reset startX for next swap
                if (isDragging === true && isSpinning === true) {    
                isSpinning = isSpinning === true ? false : true;
                clearInterval(intervalId);
                console.log("stop");
                }
            }
            
        });

        document.addEventListener('pointerup', () => {
            isDragging = false;
                            
        });
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
        let startTime;
        let intervalId;
        viewer.addEventListener('click', () => {
            const duration = Date.now() - startTime;
            
            if (duration < 200 && isDragging === false){
                isSpinning = isSpinning === true ? false : true;
                
                clearInterval(intervalId);
                }
            
            if (duration < 200 && isDragging === false && isSpinning === true) {
                
                    if (lastSpin === "counterClockwise") {
                        intervalId = setInterval(() => {
                                imgIndex = (imgIndex - 1 + images.length) % images.length;
                            
                        viewer.src = images[imgIndex];
                            }, 50)
                        } else if (lastSpin === "clockwise") {
                            intervalId = setInterval(() => {
                                imgIndex = (imgIndex + 1) % images.length;
                            viewer.src = images[imgIndex];
                            }, 50)
                        }
                    lastSpin = lastSpin === "counterClockwise" ? "clockwise" : "counterClockwise";
                    console.log("last spin: " + lastSpin + "is spinning: " + isSpinning);
                    
                } 
            });
                                                                                                                                                /*
【 ᛗᚴ 360 Toggle Auto Module Feature 】
 ▎
⎳
                                                                                                                                                */

