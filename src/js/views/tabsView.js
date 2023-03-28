import View from './View';

class tabsView extends View {
  tabsMarkup() {
    const tabs = document.querySelectorAll('.events__tab');
    const tabsContainer = document.querySelector('.tabs__event-container');
    const tabsContent = document.querySelectorAll('.tabs__content');

    tabsContainer.addEventListener('click', function (e) {
      const clicked = e.target.closest('.events__tab');
      // console.log(e.target);

      tabs.forEach(t => t.classList.remove('events__tab--active'));
      tabsContent.forEach(c => c.classList.remove('tab__content--active'));

      clicked.classList.add('events__tab--active');

      document
        .querySelector(`.tab__content--${clicked.dataset.tab}`)
        .classList.add('tab__content--active');
    });
  }
}

export default new tabsView();
