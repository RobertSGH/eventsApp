import View from './View';

class locationEventsView extends View {
  _parentElement = document.querySelector('.slider--3');

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
    <div class="slide__3">
      <a class="slide__3__link ${
        result.id === id ? 'slide__3__link--active' : ''
      }" href="#${result.id}">
       <figure class="slide__3__fig">
         <img src="${
           result.details.image.url
         }" alt="icon-type"     class="slide__3__img"/>
         <div class="slide__3__data">
           <h1 class="heading--3">${result.name}</h1>
            <ul class="slide__3__details-list">
             <li class="slide__3__type">${result.details.type}</li>
              <li class="slide__3__location">${result.details.location}</li>
               <li class="slide__3__city">${result.details.city}</li>
                <li class="slide__3__date">${result.details.date}</li>
            </ul>
          </div>
       </figure>
      </a>
     </div>
   `;
  }

  sliderBtns() {
    const slides = document.querySelectorAll('.slide__3');
    const btnRight = document.querySelector('.slider__btn--right');
    const btnLeft = document.querySelector('.slider__btn--left');

    let curSlide = 0;
    const maxSlide = slides.length;

    slides.forEach((s, i) => (s.style.transform = `translateX(${50 * i}%)`));

    btnRight.addEventListener('click', function () {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${50 * (i - curSlide)}%)`)
      );
    });

    btnLeft.addEventListener('click', function () {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${50 * (i - curSlide)}%)`)
      );
    });
  }
}

export default new locationEventsView();
