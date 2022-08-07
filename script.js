const fileInput = document.querySelector(".file-input"),
filterSlider = document.querySelector(".slider input"),
filterValue = document.querySelector(".filter-info .value"),
filterName = document.querySelector(".filter-info .name"),
filterOptions = document.querySelectorAll(".filters button"),
previewImg = document.querySelector(".preview-img img"),
chooseImgBtn = document.querySelector(".choose-img");

// Default values
let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

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
        document.querySelector(".filters .active").classList.remove("active");
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness"){
            filterSlider
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }else if(option.id === "saturation"){
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }else if(option.id === "inversion"){
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }else{
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    });
});

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active");

    if(selectedFilter === "brightness"){
        brightness = filterSlider.value;
    }else if(selectedFilter === "saturation"){
        saturation = filterSlider.value;
    }else if(selectedFilter === "inversion"){
        inversion = filterSlider.value;
    }else{
        grayscale= filterSlider.value;
    }
}


fileInput.addEventListener("change",loadImage);
filterSlider.addEventListener("input", updateFilter);
chooseImgBtn.addEventListener("click",() => fileInput.click());

