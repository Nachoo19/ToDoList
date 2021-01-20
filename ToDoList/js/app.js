const d = document;
const $lista = d.getElementById("mi-lista");
const $boton = d.querySelector(".addBtn");
const $input = d.getElementById("input-mi-div")
let Tareas = [];
let $LocalStorage = {};

$lista.addEventListener("click", (e) => {
    if(e.target.tagName === "li")
    e.target.classList.toggle("checked");

    
});


const nuevoElemento = () => {
    const $li = d.createElement("li");
    $li.classList.add("ls")
    const inputValue = $input.value
    texto = d.createTextNode(inputValue);
    $li.appendChild(texto);
    // Intento de carga localStorage
    

    if(inputValue === "") {
        alert("Primero tenes que agregar una tarea..")
    }else{
        $lista.appendChild($li);
        Tareas.push($li.textContent);
        for(let i = 0; i < Tareas.length; i++){
            $LocalStorage[i] = Tareas[i];
            window.localStorage.setItem("tareas",JSON.stringify($LocalStorage))
            
        }
        console.log($LocalStorage)
        console.log(Tareas);
    }

    
    const $span = d.createElement("span");
    const txt = d.createTextNode("\u00D7");
    $span.className = "close";
    $span.appendChild(txt);
    $li.appendChild($span);
    const padre = $li.parentNode;
    $span.addEventListener("click", () => {
        $span.removeChild(txt)
        for(let i = 0; i < Tareas.length; i++){
            if(Tareas[i] == $li.textContent && Tareas[i] === $LocalStorage[i]){
                // Tareas.splice(i,0); Creo que no seria necesario

                // Borrar tarea de Local Storage
                delete $LocalStorage[i];
                window.localStorage.setItem("tareas",JSON.stringify($LocalStorage))
            }
        }
        padre.removeChild($li)
        
    })
    $input.value = "";

}

const teclaEnter = (e) => {
    if(e.keyCode === 13) nuevoElemento()
}


document.addEventListener("DOMContentLoaded", () => {
if(!Object.entries($LocalStorage).length === 0)return null;
const tareasString = window.localStorage.getItem("tareas");
let tareasObjeto = JSON.parse(tareasString);


for(let i = 0; i < Object.keys(tareasObjeto).length; i++){
    elemento(tareasObjeto[i],tareasObjeto)
}

console.log(tareasObjeto)


})


const elemento = (text, obj) => {
    const $li = d.createElement("li");
    $li.classList.add("ls")

    texto = d.createTextNode(text);
    $li.appendChild(texto);

    $lista.appendChild($li);


    
    const $span = d.createElement("span");
    const txt = d.createTextNode("\u00D7");
    $span.className = "close";
    $span.appendChild(txt);
    $li.appendChild($span);
    const padre = $li.parentNode;
    $span.addEventListener("click", () => {
        $span.removeChild(txt)
        for(let i = 0; i < Object.keys(obj).length; i++){
            if(obj[i] == $li.textContent){
                // Tareas.splice(i,0); Creo que no es necesario

                delete obj[i]
                delete $LocalStorage[i];
                window.localStorage.setItem("tareas",JSON.stringify($LocalStorage))
            }
        }
        padre.removeChild($li)
        
    })
    $input.value = "";
}

