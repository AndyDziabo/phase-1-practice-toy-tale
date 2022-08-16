let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });


  //fetch functions
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(toys => toys.forEach(renderToyCard))
  .catch(e => console.error(e));


  //render fuctions
  function renderToyCard(toy){
    const div = document.createElement('div');
    const h2 = document.createElement('h2');
    const img = document.createElement('img');
    const likes = document.createElement('p');
    const btn = document.createElement('button');

    div.className = 'card';
    h2.textContent = toy.name;
    img.className = 'toy-avatar';
    img.src = toy.image;
    likes.textContent = `Likes ${toy.likes}`;
    btn.className = 'like-btn';
    btn.id = toy.id;
    btn.textContent = 'Like';

    div.append(h2, img, likes, btn);
    document.querySelector('#toy-collection').append(div);
   
    //console.log(toy);
  }

  function createNewToy(e){
    e.preventDefault();
    const toy ={
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(toy),
    })
    .then(res => res.json())
    .then(toy => renderToyCard(toy));
  }

  function addLike(e){
    let likesString = e.target.previousSibling.textContent;
    let [, likes] = likesString.split(' ');
    fetch(`http://localhost:3000/toys/${e.target.id}`,)
  }

  //invoke
  document.querySelector('form').addEventListener('submit', createNewToy);
  document.querySelector('#toy-collection').addEventListener('click', addLike);


});
