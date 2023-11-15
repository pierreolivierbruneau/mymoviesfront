import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Home from './components/Home';
const fetch = require('node-fetch');

// Mock fetch
const dummyMoviesData = [
	{
		adult: false,
		backdrop_path: '/TEST_PATH.jpg',
		genre_ids: [28, 53, 80],
		id: 123456,
		original_language: 'en',
		original_title: 'TEST_TITLE',
		overview: 'TEST_OVERVIEW',
		popularity: 1208.45,
		poster_path: '/TEST_PATH.jpg',
		release_date: '2022-03-23',
		title: 'TEST_TITLE',
		video: false,
		vote_average: 10,
		vote_count: 101010,
	}
];

beforeAll(() => {
	window.fetch = (url, options) => {
		let mockedRes = {};

		if (!options && url.endsWith('/movies')) {
			mockedRes = { movies: dummyMoviesData };
		}

		return Promise.resolve({
			json: () => Promise.resolve(mockedRes),
		});
	};
});

it('Fetch and display movies', async () => {
	render(<Home />);

	const title = await screen.findByText(new RegExp(dummyMoviesData[0].title, 'i'));
	const voteCount = await screen.findByText(new RegExp(dummyMoviesData[0].vote_count, 'i'));
	const overview = await screen.findByText(new RegExp(dummyMoviesData[0].overview, 'i'));

	expect(title).toBeInTheDocument();
	expect(voteCount).toBeInTheDocument();
	expect(overview).toBeInTheDocument();
});
