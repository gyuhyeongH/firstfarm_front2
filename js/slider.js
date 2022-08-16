let slideIndex = 1;
showSlides(slideIndex)

function plusSlides(n,review_id) {
  slideIndex += n;
  showSlides(slideIndex,review_id);
}

// function currentSlide(n) {
//   showSlides(slideIndex = n);
// }

function showSlides(n,review_id) {
  let i;
  let slides = document.getElementsByClassName("Jslide"+review_id);
  console.log(slides)
  if(slides.length == 1){
    slides[0].classList.remove("mySlides")
    slides[0].classList.remove("fade")
    document.getElementById('review_image_button').innerHTML = "이미지가 더이상 없습니다"
    return
  }
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }

  slides[slideIndex - 1].style.display = "block";
}