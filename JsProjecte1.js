
window.onload = function () {
    createStruct();

    //Visitas
    let visitas = JSON.parse(localStorage.getItem("visitas"));
    if (visitas === null) {
        visitas = 0;
    }
    visitas++;
    localStorage.setItem("visitas", visitas);
};

function createStruct(){
    let listacanciones = document.getElementById('listacanciones'); 
    console.log(listacanciones);

    canciones.forEach(
        (element, i) => {
            console.log(element.lyrics)
        let li = document.createElement('li');
        let img = document.createElement('img');
        img.setAttribute('src', element.img);
        img.setAttribute('title', "Títol: " + element.tema);
        
        let h2 = document.createElement('h2');
        let a = document.createElement('a');
        let aImg = document.createElement("a");
        a.setAttribute('href', "Reproductor.html?quinTema="+i);
        aImg.setAttribute('href', "Reproductor.html?quinTema="+i);
        h2.innerHTML = element.tema;
        
        aImg.appendChild(img);
        a.appendChild(h2);
        li.appendChild(aImg);
        li.appendChild(a);
        listacanciones.appendChild(li);
    });
}
