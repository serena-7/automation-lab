const {Builder, Capabilities} = require('selenium-webdriver');
require('chromedriver');

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const {addMovie, crossMovie, deleteMovie, correctMessages} = require('../functions/funcs.js');

beforeAll(async () => {
    await driver.get('http://127.0.0.1:5501/movieList/index.html');
})

afterAll(async () => {
    await driver.quit();
})

test('Add a movie', async () => {
    await addMovie(driver, "Beauty and the Beast");
    await addMovie(driver, "Cinderella");
    await addMovie(driver, "The Little Mermaid");
    await addMovie(driver, "Sleeping Beauty");
    await addMovie(driver, "Lady and the Tramp")
})

test('Cross Off Movie', async () => {
    await crossMovie(driver, "Cinderella");
})

test('Delete Movie', async () => {
    await deleteMovie(driver, "The Little Mermaid");
})

test('Message Tests', async () => {
    await correctMessages(driver, "Sleeping Beauty");
})