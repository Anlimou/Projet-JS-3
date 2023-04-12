let contentgalery = document.querySelector('content-galery');
let getUrlWorks = 'http://localhost:5678/api/works';
let btnFilterTous = document.querySelector('btn-tous');
let btnFilterObjets = document.querySelector('btn-objets');
let btnFilterAppart = document.querySelector('btn-appartements');
let btnFilterHR = document.querySelector('btn-HR');


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
            // console.log(elem.title);
             
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




// contentgalery.textContent='textContent : passam <h1> MOI <h1>';
// contentgalery.innerHTML +='<br> <h1> MOI <h1>';


