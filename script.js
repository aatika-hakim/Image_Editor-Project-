const fileInput = document.querySelector(".file-input"),
filterSlider = document.querySelector(".slider input"),
filterValue = document.querySelector(".filter-info .value"),
filterName = document.querySelector(".filter-info .name"),
filterOptions = document.querySelectorAll(".filters button"),
rotateOptions = document.querySelectorAll(".rotate button"),
previewImg = document.querySelector(".preview-img img"),
resetFilterBtn = document.querySelector(".reset-filter"),
chooseImgBtn = document.querySelector(".choose-img"),
saveImgBtn = document.querySelector(".save-img");

// Default values
let brightness = "100", saturation = "100", inversion = "0", grayscale = "0";
let rotate = 0, flipHorizontal = 1, flipVertical= 1;

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    // previewImg.style.rotate = `${rotate}deg`;
    // previewImg.style.scale = `${flipHorizontal}`;
    // previewImg.style.scale = `${flipVertical}`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}
const loadImage = () => {
    // getting user selectd file
    let file = fileInput.files[0];
    if(!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    });
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness"){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else if(option.id === "saturation"){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }else if(option.id === "inversion"){
            filterSlider.max = "100";
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }else{
            filterSlider.max = "100";
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filters .active");

    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    }else if(selectedFilter.id === "saturation"){
        saturation = filterSlider.value;
    }else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    }else{
        grayscale= filterSlider.value;
    }

    applyFilter();
}
        // adding event listener to all rotate buttons
rotateOptions.forEach(option => {
    option.addEventListener("click", () => {
        if(option.id === "left"){
            rotate -= 90;
        } else if(option.id === "right"){
            rotate += 90;
        } else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 :1;
        }
        else if(option.id === "vertical"){
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        applyFilter();      
    });
});
const resetFilter = () => {
     brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
     rotate = 0; flipHorizontal = 1; flipVertical= 1;
     filterOptions[0].click();

    applyFilter();
}

const saveImage = () => {
    // creating canvas element
    const canvas = document.createElement("canvas");
    // canvas.getContext return a drawing context on canvas
    const ctx = canvas.getContext("2d");
    // setting canvas width to actual img width
    canvas.width = previewImg.naturalWidth;
    // setting canvas height to actual height of img
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal , flipVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
   
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}

fileInput.addEventListener("change",loadImage); 
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click",resetFilter);
chooseImgBtn.addEventListener("click",() => fileInput.click());
saveImgBtn.addEventListener("click",saveImage);

