function searchMeal() {
    // Get the user input for the meal name
    const mealName = document.getElementById('meal-name').value;
    
    // Make a request to the search endpoint of the API with the user input as the query parameter
    const request = new XMLHttpRequest();
    request.open('GET', `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
    request.onload = function() {
      // Check if the request was successful (status code 200)
      if (request.status === 200) {
        // Get the JSON data from the response
        const data = JSON.parse(request.responseText);
        
        // Check if any meals were found
        if (data.meals) {
          // Extract the information you need from the data
          const mealName = data.meals[0].strMeal;
          const mealCategory = data.meals[0].strCategory;
          const mealInstructions = data.meals[0].strInstructions;
          const mealImageURL = data.meals[0].strMealThumb;
          const mealYoutube = data.meals[0].strYoutube;
          const mealEmbedLink = mealYoutube.replace("watch?v=", "embed/");
          
          // Get the list of all the ingredients for the meal
          const ingredients = [];
          for (let i = 1; i <= 20; i++) {
            const ingredient = data.meals[0][`strIngredient${i}`];
            if (ingredient) {
              const measure = data.meals[0][`strMeasure${i}`];
              ingredients.push(`${ingredient} (${measure})`);
            } else {
              break;
            }
          }
          
          // Create HTML elements to display the information and the image
          const mealInfo = document.getElementById('meal-info');
          mealInfo.innerHTML = `
          
          <div class="meal-container">
            <div class="meal-info">
              <h2>${mealName}</h2><br>
              <h3>Category: ${mealCategory}</h3><br>
              <p><strong>Instructions:</strong> ${mealInstructions}</p>
            </div>
            <div class="meal-image-container">
            <img src="${mealImageURL}" style="width: 420px; height: 400px; box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);">
            </div>
          </div>
          <div class="meal-container2">
            <div class="meal-ingredients">
              <h3>Ingredients</h3><br>
              <ul>
                ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
              </ul>
            </div>
            <div id="meal-video">
              <h3>Watch the video:</h3><br>
              <iframe width="560" height="315" src="https://www.youtube.com/embed/${mealEmbedLink.slice(-11)}" frameborder="0" allowfullscreen></iframe>
            </div>
          </div>
          
          `;
        } else {
          // If no meals were found, display an error message
          const mealInfo = document.getElementById('meal-info');
          mealInfo.innerHTML = '<p>No meals found with that name</p>';
        }
      } else {
        // If the request was not successful, display an error message
        const mealInfo = document.getElementById('meal-info');
        mealInfo.innerHTML = `<p>Error fetching data from API: ${request.statusText}</p>`;
      }
    };
    request.onerror = function() {
      // If the request failed, display an error message
      const mealInfo = document.getElementById('meal-info');
      mealInfo.innerHTML = '<p>Error fetching data from API</p>';
    };
    request.send();
}