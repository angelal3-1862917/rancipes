/**
 * Name: Angela Liu
 * Date: May 6, 2020
 * Section: CSE 154 AL
 *
 * This is the index.js page for my CP3 assignment. It contains the behavior that occurs when
 * a user generates random recipes on my Rancipes page.
 */

"use strict";
(function() {

  window.addEventListener("load", init);

  const RECIPE_API_URL = "https://api.spoonacular.com/recipes/random?apiKey=82771d273cb3483a8a21dbfa1c1080a0&number=10";
  const PIC_API_URL = "https://picsum.photos/v2/list?page=";
  let imgPageNum = 0;
  let imgLinks = [];

  /** Initializes all functions*/
  function init() {
    qs("button").addEventListener("click", fetchImages);
    qs("button").addEventListener("click", fetchRecipes);

  }

  /**
   * Retrieves the image links dynamically using AJAX. If something goes
   * wrong with the request will display an error message on the page instead.
   */
  function fetchImages() {
    imgPageNum++;
    fetch(PIC_API_URL + imgPageNum + "&limit=10")
      .then(checkStatus)
      .then(data => data.json())
      .then(processImages)
      .catch(handleError);
  }

  /**
   * Retrieves the recipe names and URLs dynamically using AJAX! If something goes
   * wrong with the request will display an error message on the page instead.
   */
  function fetchRecipes() {
    fetch(RECIPE_API_URL)
      .then(checkStatus)
      .then(data => data.json())
      .then(processRecipes)
      .catch(handleError);
  }

  /**
   * Retrieves all images URLs from the data fetched in fetchImages.
   * @param {object} data - JSON object for image data
   */
  function processImages(data) {
    id("recipes-and-imgs").innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      imgLinks[i] = data[i]["download_url"];
    }
  }

  /**
   * Retrieves all images URLs from the data fetched in fetchImages.
   * Populates body of page with images and links to recipes.
   * @param {*} data - JSON object for recipe data
   */
  function processRecipes(data) {
    let recipeNames = [];
    let recipeUrls = [];
    let recipes = data.recipes;

    for (let i = 0; i < recipes.length; i++) {
      recipeNames[i] = recipes[i]["title"];
      recipeUrls[i] = recipes[i]["sourceUrl"];
    }

    for (let i = 0; i < recipes.length; i++) {
      createImgRecipeEl(recipeNames[i], recipeUrls[i], imgLinks[i]);

    }

  }

  /**
   * Creates a DOM element and adds it to the page's body.
   * Creates an image with a link overlayed over it that leads to a random recipe.
   * @param {*} recipeName - name of recipe
   * @param {*} recipeUrl - URL of recipe
   * @param {*} imgLink - source of image
   */
  function createImgRecipeEl(recipeName, recipeUrl, imgLink) {
    let recipeImg = gen("section");
    let img = gen("img");
    img.src = imgLink;
    let namePara = gen("p");
    let name = gen("a");
    name.textContent = recipeName;
    name.href = recipeUrl;

    namePara.appendChild(name);
    recipeImg.appendChild(namePara);
    recipeImg.appendChild(img);
    id("recipes-and-imgs").appendChild(recipeImg);

  }

  /**
   * A user-friendly error message when something goes wrong in a fetch request.
   */
  function handleError() {
    let errorP = gen("p");
    errorP.textContent = "Rancipes is not able to receive requests at this time :(";
    qs("body").appendChild(errorP);
  }

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw Error("Error in request: " + response.statusText);
    }
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} idName - element ID
   * @returns {object} DOM object associated with id.
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * Creates and returns a new empty DOM node of a type that matches the given element type.
   * @param {string} elType - node type
   * @return {Node} New empty DOM node that matches the given type.
   */
  function gen(elType) {
    return document.createElement(elType);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector.
   * @returns {object} The first DOM object matching the query.
   */
  function qs(selector) {
    return document.querySelector(selector);
  }
})();