const fileInput = document.querySelector(".file-input"),
previewImgBtn = document.querySelector(".preview-img")
chooseImgBtn = document.querySelector(".choose-img");


const loadImage = () => {
    // getting user selectd file
    let file = fileInput.file[0];
    if(!file) return;
    
}

previewImgBtn.addEventListener("click")

fileInput.addEventListener("change",loadImage);
chooseImgBtn.addEventListener("click",() => fileInput.click());