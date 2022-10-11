const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		topBtn.style.display = "flex";
	}else {
		topBtn.style.display = "none";
	}
});

topBtn.addEventListener('click', () => {
	document.body.scrollTop = 0; 
	document.documentElement.scrollTop = 0; 
});