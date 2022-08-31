const topBtn = document.getElementById("topBtn");

const scrollFunction = () => {
  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topBtn.style.display = "flex";
    }else {
      topBtn.style.display = "none";
    }
  });
}

const topFunction = () => {
  document.body.scrollTop = 0; 
  document.documentElement.scrollTop = 0; 
}

scrollFunction(), topFunction();