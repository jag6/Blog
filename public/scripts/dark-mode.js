const isLight = () => {
    return localStorage.getItem("light-mode");
};
  
const toggleRootClass = () => {
    document.querySelector(":root").classList.toggle("light");
};
  
const toggleLocalStorageItem = () => {
    if (isLight()) {
        localStorage.removeItem("light-mode");
    }else {
        localStorage.setItem("light-mode", "set");
    }
};
  
if(isLight()) {
    toggleRootClass();
}
  
document.querySelector(".theme-icon").addEventListener("click", () => {
    toggleLocalStorageItem();
    toggleRootClass();
});