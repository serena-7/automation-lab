const {By} = require('selenium-webdriver');

const addMovie = async (driver, movieName) => {
    await driver.findElement(By.xpath('//input')).sendKeys(movieName);
    
    await driver.findElement(By.xpath('//button[1]')).click();
    // await driver.sleep(2000);
    const movie = await driver.findElement(By.xpath(`(//li/span[text()="${movieName}"])`));

    const displayed = movie.isDisplayed();

    expect(displayed).toBeTruthy();
}

const crossMovie = async (driver, movieName) => {    
    await driver.findElement(By.xpath(`(//li/span[text()="${movieName}"])`)).click();

    const checked = await driver.findElement(By.xpath(`//li/span[@class="checked" and text()="${movieName}"]`));

    const displayed = checked.isDisplayed();

    expect(displayed).toBeTruthy();
    
    // await driver.sleep(2000);

}

const deleteMovie = async (driver, movieName) => {
    movieName = movieName.split(' ').join('');

    await driver.findElement(By.id(movieName)).click();

    const movieExists = await driver.findElement(By.id(movieName)).then(() => true, () => false);

    expect(!movieExists).toBeTruthy();

    // await driver.sleep(2000);
}

const correctMessages = async(driver, movieName) => {
    await driver.findElement(By.xpath(`(//li/span[text()="${movieName}"])`)).click();
    
    let message = await driver.findElement(By.id("message")).getAttribute("textContent");
    
    // console.log(message);
    expect(message).toContain(`${movieName} watched!`);
    // await driver.sleep(2000);
    
    await driver.findElement(By.xpath(`(//li/span[text()="${movieName}"])`)).click();
    
    message = await driver.findElement(By.id("message")).getAttribute("textContent");
    
    expect(message).toContain(`${movieName} added back!`);
    
    movieNameTrim = movieName.split(' ').join('');
    
    await driver.findElement(By.id(movieNameTrim)).click();

    message = await driver.findElement(By.id("message")).getAttribute("textContent");

    expect(message).toContain(`${movieName} deleted!`)
}

module.exports = {
    addMovie,
    crossMovie,
    deleteMovie,
    correctMessages
}