const topBtn = document.getElementById("topBtn");

window.addEventListener('scroll', () => {
  const scrollFunction = () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topBtn.style.display = "flex";
    } else {
      topBtn.style.display = "none";
    }
  }
  scrollFunction();
});

const topFunction = () => {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

topFunction();
