import View from './View.js';
import icons from '../../img/icons.svg';

class EventView extends View {
  _parentElement = document.querySelector('.event');
  _errorMessage =
    'Event has been cancelled or reschedulled, please try another one';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--star');
      if (!btn) return;
      handler();
    });
  }

  _generateMarkup() {
    console.log(this._data);
    return `
    <figure class="event__fig">
    <a href="${this._data.url}">
    <img src="${this._data.image.url}" alt="Test2" class="event__img"/>
  </a>
    </figure>
    <div class="event__details">
    <h1 class="heading--1">${this._data.name}</h1> 
        <h2 class="heading--2">Event details</h2>
        <ul class="event__details-list">
        ${this._data.details.map(details => {
          return `
          <li class="event__type"><svg class="icon__type">
          <use href="${icons}#icon-type"></use>
          </svg> ${details.type}
          </li>
          <li class="event__date"><svg class="icon__calendar">
          <use href="${icons}#icon-calendar"></use>
          </svg> ${details.date}
          </li>
          <li class="event__timezone"><svg class="icon__earth">
          <use href="${icons}#icon-earth"></use>
          </svg>${details.timezone}
          </li>
          <li class="event__location"><svg class="icon__city">
          <use href="${icons}#icon-city"></use>
          </svg> ${details.location}
          </li>
          <li class="event__venue"><svg class="icon__arena">
          <use href="${icons}#icon-arena"></use>
          </svg> ${details.venue}
          </li>
          <li class="event__priceRange"><svg class="icon__money">
          <use href="${icons}#icon-money"></use>
          </svg> ${!details.pricerange ? '👀' : details.pricerange}
          </li>
          </li>
          `;
        })}
        </ul>
        </div>
        <button class="btn--star">
  <svg viewBox="0 0 24 24" class="star-svg">
    ${
      this._data.bookmarked
        ? '<path d="M12 3.5L9.45 9.5H3.5L8.18 13.4L6.64 19.5L12 16.4L17.36 19.5L15.82 13.4L20.5 9.5H14.55L12 3.5Z" fill="black" />'
        : '<path d="M22.6 9.8L15.3 9.1L12 2.3L8.7 9.1L1.4 9.8L6.2 14.7L4.7 21L12 17.2L19.3 21L17.8 14.7L22.6 9.8Z" fill="none" stroke="black" stroke-width="2" />'
    }
  </svg>
</button>
      `;
  }
}

export default new EventView();
