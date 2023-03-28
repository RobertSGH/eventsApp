import View from './View';

class bookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Browse for events and bookmark it !';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);

    return `
       <li class="preview">
        <a class="preview__link ${
          result.id === id ? 'preview__link--active' : ''
        }" href="#${result.id}">
          <figure class="preview__fig">
           <img src="${result.image.url}" alt="${result.name}" /></figure>
            <div class="preview__data">
             <h1 class="preview__name">${result.name}</h4>
              <p class="preview__location">${
                result.details[0].location ? result.details[0].location : 'TBC'
              }</p>
             </div>
          </a>
        </li>
    `;
  }
}

export default new bookmarksView();
