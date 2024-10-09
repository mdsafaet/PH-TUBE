function getTimeString(time) {
    //get Hour and rest seconds
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour  ${minute} minute ${remainingSecond} second ago`;
  }
  
  console.log(getTimeString(7865));

//
console.log('Videoloaded');
//1- fetch Load & show Categories on html

//Create LoadCategories

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    console.log(buttons);
    for (let btn of buttons) {
      btn.classList.remove("active");
    }

};

const LoadCategories = () => {

    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
      .then(response => response.json())
      .then(data => DisplayCategories(data.categories))
      .catch(error => console.error(error))
    

}
const loadDetails = async (videoId) => {
    console.log(videoId);
    const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayDetails(data.video);
  };

  const displayDetails = (video) => {
    console.log(video);
    const detailContainer = document.getElementById("modal-content");
  
    detailContainer.innerHTML = `
     <img src=${video.thumbnail} />
     <p>${video.description}</p>
    `;
  
    // way-1
    // document.getElementById("showModalData").click();
    //way-2
    document.getElementById("customModal").showModal();
  };

const LoadVideos = (searchText = "") => {
  //fetch the data
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
      .then(response => response.json())
      .then(data =>DisplayVideos(data.videos))
      .catch(error => console.error(error))
    
}
const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
      .then((res) => res.json())
      .then(data => {

        //active class remove 
        removeActiveClass();

        //id active k
        const activeBtn = document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        DisplayVideos(data.category);
      })
        
      .catch(error => console.error(error))
   
       
      };  
/*
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
   */ 


//Create DisplayVideos
const DisplayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        
          <img src="assets/Icon.png" /> 
          <h2 class="text-center text-xl font-bold"> No Content Here in this Categery </h2> 
        </div>`;
      } else {
        videoContainer.classList.add("grid");
      }



    videos.forEach (video => {
        console.log(video);


        //Create a card

        const card = document.createElement('div');
        card.classList = "card card-compact ";
        card.innerHTML = `

          <figure class ='h-[200px] relative'>
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover"
      alt="Shoes" />

      ${
      video.others.posted_date?.length == 0 ? "": `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1"> ${getTimeString(video.others.posted_date)}</span>`

        }	
      
  </figure >

  <div class="px-0 py-2 flex gap-2">
     <div>
     <img class='w-10 h-10 rounded-full object-cover ' src =${video.authors[0].profile_picture}/>
     </div> 

     <div>
     <h2 class='font-bold'>${video.title}</h2>
     
     <div class= 'flex items-center gap-2'>
       <p class='text-gray-400'>${video.authors[0].profile_name}</p>

       ${video.authors[0].verified == true ? '<img class="w-5" src="https://img.icons8.com/?size=40&id=41816&format=png" />' : ''}


     </div>
   
    <p>  </p>

     </div> 
 
  </div>

   <p> <button  onclick="loadDetails('${
          video.video_id
        }')" class="btn btn-sm btn-error">details</button> </p>
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


        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
          <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
           ${item.category}
          </button>
        `;

  //Create a button
  
  const button = document.createElement('button');
  button.classList = "btn";
  button.innerHTML = item.category;

 //add button to the categoryContainer
    categoryContainer.append(buttonContainer);



    document.getElementById("search-input").addEventListener("keyup", (e) => {
        LoadVideos(e.target.value);
      });

});

     
};

LoadCategories();
LoadVideos();