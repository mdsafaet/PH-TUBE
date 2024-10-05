console.log('Videoloaded');
//1- fetch Load & show Categories on html

//Create LoadCategories 

const LoadCategories = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
      .then(response => response.json())
      .then(data => DisplayCategories(data.categories))
      .catch(error => console.error(error))
    

}


const LoadVideos = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
      .then(response => response.json())
      .then(data =>DisplayVideos(data.videos))
      .catch(error => console.error(error))
    
}

const cardDemo = 
    {
        "category_id": "1001",
        "video_id": "aaal",
        "thumbnail": "https://i.ibb.co/hdtZYbB/enchnting.jpg",
        "title": "Enchanted Harmonies",
        "authors": [
            {
                "profile_picture": "https://i.ibb.co/jh1q2F3/shopia.jpg",
                "profile_name": "Sophia Williams",
                "verified": false
            }
        ],
        "others": {
            "views": "7.6K",
            "posted_date": "16450"
        },
        "description": "'Enchanted Harmonies' by Sophia Williams enchants listeners with its delicate, soothing sounds and melodic complexity. Garnering 7.6K views, this piece is perfect for those seeking an immersive musical experience that blends elegance with emotion, offering a unique soundscape that resonates deeply with its audience."
    };
    


//Create DisplayVideos
const DisplayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');

    videos.forEach (video => {
        console.log(video);


        //Create a card

        const card = document.createElement('div');
        card.classList = "card card-compact ";
        card.innerHTML = `


          <figure>
    <img
      src=${video.thumbnail}
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>



        `;

        videoContainer.append(card);

    });

};


//Create DisplayCategories

const DisplayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach (item => {
        console.log(item);


  //Create a button
  
  const button = document.createElement('button');
  button.classList = "btn";
  button.innerHTML = item.category;

 //add button to the categoryContainer
    categoryContainer.append(button);

});

     
};

LoadCategories();
LoadVideos();