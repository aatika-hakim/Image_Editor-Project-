const fileInput = document.querySelector(".file-input"),
chooseImgBtn = document.querySelector(".choose-img");


const loadImage = () => {
    // getting user selectd file
    let file = fileInput.file[0];
    if(!file) return;
    console.log(file);
}

fileInput.addEventListener("change",loadImage);
chooseImgBtn.addEventListener("click",() => fileInput.click());