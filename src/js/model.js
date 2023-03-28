import { API_URL, API_URL2, API_URL3, RES_PER_PAGE } from './config';
import { getJSON } from './helpers';
import locationEventsView from './views/locationEventsView';

export const state = {
  event: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],

  popular: {
    results: [],
  },

  location: {
    results: [],
  },
};

export const loadEvent = async function (id) {
  try {
    const data = await getJSON(`${API_URL}=${id}%20&locale=*`);

    const event = data._embedded.events[0];

    console.log(event);

    if (!data._embedded.events[0]._embedded) {
      state.event = {
        name: event.name,
        id: event.id,
        image: event.images[5],
        url: event.url,
        details: [
          {
            timezone: event.place.country.name,
            location: event.place.city.name,
            venue: event.place.address.line,
            type: event.type,
            date: event.dates.start.localDate,
            pricerange: undefined,
          },
        ],
      };
    } else if (!data._embedded.events[0].priceRanges) {
      state.event = {
        name: event.name,
        id: event.id,
        image: event.images[5],
        url: event.url,

        details: [
          {
            timezone: event._embedded.venues[0].timezone,
            location: event._embedded.venues[0].city.name,
            venue: event._embedded.venues[0].name,
            type: event.classifications[0].segment.name,
            date: event.dates.start.localDate,
            pricerange: undefined,
          },
        ],
      };
    } else {
      state.event = {
        name: event.name,
        id: event.id,
        image: event.images[5],
        url: event.url,

        details: [
          {
            timezone: event._embedded.venues[0].timezone,
            location: event._embedded.venues[0].city.name,
            venue: event._embedded.venues[0].name,
            type: event.classifications[0].segment.name,
            date: event.dates.start.localDate,
            pricerange: [
              `Min ${event.priceRanges[0].min}, Max ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`,
            ],
          },
        ],
      };
    }

    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.event.bookmarked = true;
    else state.event.bookmarked = false;
  } catch (err) {
    console.error(`${err}💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;

    const data = await getJSON(`${API_URL2}${query}`);

    state.search.results = data._embedded.events.map(eve => {
      return {
        id: eve.id,
        name: eve.name,
        image: eve.images[5],
        location: eve.dates.timezone,
      };
    });

    state.search.page = 1;
  } catch (err) {
    console.error(`${err}💥💥💥`);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const loadPopularEvents = async function (results) {
  try {
    state.popular.results = results;

    const data = await getJSON(
      `https://app.ticketmaster.com/discovery/v2/events?apikey=m5gCwSTFFSyYiGe6XG74bJx4cqu400S3&latlong=51.5418416,-0.2765659&radius=2000&unit=miles&locale=*&size=100&classificationName=music&segmentId=KZFzniwnSyZfZ7v7nJ`
    );
    state.popular.results = data._embedded.events.map(eve => {
      return {
        id: eve.id,
        name: eve.name,
        details: {
          image: eve.images[2],
          location: eve._embedded.venues[0].country.name,
          type: eve.classifications[0].segment.name,
          date: eve.dates.start.localDate,
          city: eve._embedded.venues[0].city.name,
        },
      };
    });
  } catch (err) {
    console.error(`${err}💥💥💥`);
    throw err;
  }
};

export const loadLocationEvents = async function (results) {
  try {
    state.location.results = results;

    const tabloc = document.getElementById('find-me');

    function success(pos) {
      const crd = pos.coords;
      const lat = crd.latitude;
      const lng = crd.longitude;
      const data = getJSON(
        `https://app.ticketmaster.com/discovery/v2/events?apikey=m5gCwSTFFSyYiGe6XG74bJx4cqu400S3&latlong=${lat},${lng}&locale=*`
      ).then(data => {
        state.location.results = data._embedded.events.map(eve => {
          return {
            id: eve.id,
            name: eve.name,
            details: {
              image: eve.images[2],
              location: eve._embedded.venues[0].country.name,
              type: eve.classifications[0].segment.name,
              date: eve.dates.start.localDate,
              city: eve._embedded.venues[0].city.name,
            },
          };
        });
        // console.log(state.location.results);
        locationEventsView.render(state.location.results);
        locationEventsView.sliderBtns();
      });
    }

    tabloc.addEventListener('click', function () {
      navigator.geolocation.getCurrentPosition(success);
      locationEventsView.renderSpinner();
    });
  } catch (err) {
    console.error(`${err}💥💥💥`);
    throw err;
  }
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (event) {
  state.bookmarks.push(event);

  if (event.id === state.event.id) state.event.bookmarked = true;

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.event.id) state.event.bookmarked = false;

  persistBookmarks();
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

const loadnewapi = async function () {
  try {
    const data = await getJSON();
  } catch (err) {
    console.error(`${err}💥💥💥`);
  }
  throw err;
};
