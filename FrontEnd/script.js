let contentgalery = document.getElementById('content-galery');
let modalgalery = document.getElementById ('gallerymodal');
let getUrlWorks = 'http://localhost:5678/api/works';
let btnFilterTous = document.getElementById('btn-tous');
let btnFilterObjets = document.getElementById('btn-objets');
let btnFilterAppart = document.getElementById('btn-appartements');
let btnFilterHR = document.getElementById('btn-HR');


function getData(url, filter)
{
   fetch(url)
    .then((reponse)=>  {return reponse.json()})
    .then((data) => {
        
        // console.log(data);
        contentgalery.innerHTML ='';
        if(filter == 'Tous')
        {
          data.map((elem) => {
            // console.log(modalgalery);
                modalgalery.innerHTML +='<figure> <img crossorigin="anonymous" class ="img-modalgaly" src=" '+ elem.imageUrl + '" alt="'+ elem.title +'"><figcaption>  editer </figcaption></figure>'; 
                contentgalery.innerHTML +=' <figure> <img crossorigin="anonymous" src=" '+ elem.imageUrl + '" alt="'+ elem.title +'"><figcaption> ' + elem.title + '</figcaption></figure>';  
                 
            })
        
        }
        else if(filter == 'Objets') 
        {
            data.map((elem) => {
                // console.log(elem.category);
                 if(elem.category.name == filter)
                 {  
                    
                    contentgalery.innerHTML +=' <figure> <img crossorigin="anonymous" src=" '+ elem.imageUrl + '" alt="'+ elem.title +'"><figcaption> ' + elem.title + '</figcaption></figure>';   
                 }
                    
                })
        }
        else if(filter == 'Appartements') 
        {
            data.map((elem) => {
                console.log(elem.category);
                 if(elem.category.name == filter)
                 {
                   
                    contentgalery.innerHTML +=' <figure> <img crossorigin="anonymous" src=" '+ elem.imageUrl + '" alt="'+ elem.title +'"><figcaption> ' + elem.title + '</figcaption></figure>';   
                 }
                    
                })
        }
        else if(filter == 'Hotels & restaurants') 
        {
            data.map((elem) => {
                console.log(elem.category);
                 if(elem.category.name == filter)
                 {
                   
                    contentgalery.innerHTML +=' <figure> <img crossorigin="anonymous" src=" '+ elem.imageUrl + '" alt="'+ elem.title +'"><figcaption> ' + elem.title + '</figcaption></figure>';   
                 }
                    
                })
        }
    
    })
    .catch((error) => console.log(error)); 
}

getData(getUrlWorks,'Tous');

btnFilterTous.addEventListener('click', function()
{
    let attribu = btnFilterTous.getAttribute('data-filtre');
    getData(getUrlWorks,attribu);
});

btnFilterObjets.addEventListener('click', function()
{
    let attribu = btnFilterObjets.getAttribute('data-filtre');
    getData(getUrlWorks,attribu);
});

btnFilterAppart.addEventListener('click', function()
{
    let attribu = btnFilterAppart.getAttribute('data-filtre');
    getData(getUrlWorks,attribu);
});

btnFilterHR.addEventListener('click', function()
{
    let attribu = btnFilterHR.getAttribute('data-filtre');
    getData(getUrlWorks,attribu);

})
