const catagory = document.getElementById("catagory")



// show catagory
 const showCategory = async () =>{
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    // console.log(data.data) 

    data.data.forEach((cate)=>{
        let categoryData = document.createElement("button");
        categoryData.innerHTML=`
         <button id="${cate.category_id}" onclick="loadAllPost('${cate.category_id}')" class="px-3 text-md bg-gray-300 font-medium py-1 rounded-md text-gray-500">${cate.category}</button>
        `
        // console.log(cate.category_id)
        catagory.appendChild(categoryData);
    })
}

// document.getElementById("sortButton").addEventListener("click", function sortbyViews(datas){
    // console.log("This code are working")
 let loadedData = [];
    const sortbyViews =  () =>{
    
         
        loadedData.sort((a, b)=>{
            var view1= a.others.views;
           // console.log("a view", view1);
            view1=parseInt(view1);
    
            var view2= b.others.views;
            //console.log("b view", view2);
            view2=parseInt(view2);
    
            if(view1>=view2) return -1;
            else return 1;
    
        })
    
        // console.log("after sort ", datas)
    
       loadDataHtml(loadedData)  
    }
    

// })




 const loadAllPost = async (category_id) =>{
    // let activeDiv = document.getElementById(category_id)
   
    // console.log(category_id)
    // fetch all data
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await res.json();
    console.log(data.data)

    let tubePost = document.getElementById("tubePost");
    tubePost.innerHTML="";

     loadedData  =  data.data ;

  
        // direct load 
        loadDataHtml(loadedData)
   
        // clll sort function
        // sortbyViews(datas)
   

  
}


const loadDataHtml = (datas) =>{
    let tubePost = document.getElementById("tubePost");
    tubePost.innerHTML="";

    if(datas.length == 0 ){
        let postDiv = document.createElement("div");
        postDiv.innerHTML= `
        <div class="h-[400px] w-[400px] md:ml-[50%] lg:ml-[100%] lg:mr-[100%] col-span-4  flex flex-col  items-center justify-center gap-4 text-center">
            <img class="" src="./images/Icon.png" />
             <h2 class="">Oops!! Sorry, There is no content here</h2>
        </div>`
        tubePost.appendChild(postDiv)
    }else{
    //    console.log(data.data)
         datas.forEach((post)=>{
            let postDiv = document.createElement("div");
            // console.log(post)
            let postedDate =post.others.posted_date;

        let min = postedDate / 60;
        let hrs = parseInt(min / 60)
        min = parseInt(min % 60);
        //    console.log(`${hrs} hrs ${min} min ` )
    
        
       postDiv.innerHTML= `
    
            <div class="card bg-base-100 shadow-xl">          
              <div class="relative">
              <figure><img class="h-[200px] w-full rounded-md " src="${post.thumbnail}" alt="${post.title}" /></figure>
              <p id="timetag" class="absolute bottom-2 right-5 bg-black text-white py-1 px-2 text-xs rounded-md ${postedDate > 0 ? "block" : "hidden"} ">${postedDate > 0 ? (`${hrs} hrs ${min} min age `) : "" }</p>
              </div>
            <div class="card-body flex flex-row gap-3">
               <img class="w-12 h-12 rounded-full" src="${post.authors[0].profile_picture}" />
               <div>
                    <h1 class="card-title font-bold text-base">${post.title}</h1>
                    <div class="flex items-center">
                        <h2 class="mr-2 font-normal text-sm text-gray-500">
                        ${post.authors[0].profile_name} 
                        </h2>
                       <img class="w-4 h-4" src=${post.authors[0].verified ? "./images/verified-badge.png" : ""  } />   
                    </div>
                   
                   
                    <div class="card-actions justify-end">
                        <p class="font-normal text-sm text-gray-500">${post.others.views}</p> 
                    </div>
               </div>
            </div>
            </div>        
            `
            tubePost.appendChild(postDiv)
        })
    }
}





// show catagory function call
showCategory();

// call the load function
loadAllPost("1000")

