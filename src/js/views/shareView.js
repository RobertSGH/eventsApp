import View from './View';

class shareView extends View {
  _parentElement = document.querySelector('.share-btn-container');

  share() {
    const facebookBtn = document.querySelector('.facebook-btn');
    const twitterBtn = document.querySelector('.twitter-btn');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    const pinterestBtn = document.querySelector('.pinterest-btn');
    const btn = document.querySelector('.worldshare');

    let postURL = encodeURI(document.location.href);
    let postTitle = encodeURI('Hey! Check this out !');

    let shareData = {
      title: ' Title',
      text: 'Check this out',
      url: [postURL],
    };

    btn.addEventListener('click', () => {
      navigator.share(shareData);
    });

    facebookBtn.setAttribute(
      'href',
      `https://www.facebook.com/sharer.php?u=${postURL}`
    );

    twitterBtn.setAttribute(
      'href',
      `https://twitter.com/share?url=${postURL}&text=${postTitle}`
    );

    whatsappBtn.setAttribute(
      'href',
      `https://api.whatsapp.com/send?text=${postTitle} ${postURL}`
    );

    pinterestBtn.setAttribute(
      'href',
      `https://pinterest.com/pin/create/bookmarklet/url=${postURL}&description=${postTitle}`
    );
  }
}

export default new shareView();
