console.log('Videoloaded');
//1- fetch Load & show Categories on html

//Create LoadCategories 

const LoadCategories = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
      .then(response => response.json())
      .then(data => DisplayCategories(data.categories))
      .catch(error => console.error(error))
    

}

//Create DisplayCategories

const DisplayCategories = (categories) => {

    categories.foreach

   

    
}

LoadCategories();