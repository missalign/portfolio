



// ------------ DYNAMIC SUBTITLE

const words = [
    "UX",
    "Product",
    "Graphic",
    "Digital",
    "Web",
    "Service"
];

const wordElement = document.getElementById("changing-word");

let current = 1;

setInterval(() => {
    wordElement.style.opacity = 0;

    setTimeout(() => {
        current = (current + 1) % words.length;
        wordElement.textContent = words[current];
        wordElement.style.opacity = 1;
    }, 100);

}, 1500);




// ------------ MAIN GRID BOXES


document.querySelectorAll('.content-box').forEach(box => {

    box.addEventListener('click', () => {

        const target = document.getElementById(
            box.dataset.target
        );

        const isOpen = target.classList.contains('open');

        // Close all sections
        document.querySelectorAll('.expandable').forEach(section => {
            section.style.maxHeight = '0px';
            section.classList.remove('open');
        });

        // Remove box-open from all boxes
        document.querySelectorAll('.content-box').forEach(b => {
            b.classList.remove('box-open');
        });

        // If it wasn't already open, open it
        if (!isOpen) {

            target.style.maxHeight =
                target.scrollHeight + 'px';

            target.classList.add('open');

            box.classList.add('box-open');
        }

    });

});


// ------------ OTHER PROJECTS GALLERY

const thumbnails =
    document.querySelectorAll('.gallery img');

const lightbox =
    document.querySelector('.lightbox');

const lightboxImage =
    document.querySelector('.lightbox-image');

const nextBtn =
    document.querySelector('.next');

const prevBtn =
    document.querySelector('.prev');

const closeBtn =
    document.querySelector('.close');

let currentIndex = 0;

function showImage(index){

    currentIndex = index;

    lightboxImage.src =
        thumbnails[currentIndex].src;
}

thumbnails.forEach((thumb,index)=>{

    thumb.addEventListener('click',()=>{

        lightbox.classList.add('open');

        showImage(index);

    });

});

nextBtn.addEventListener('click',()=>{

    currentIndex++;

    if(currentIndex >= thumbnails.length){
        currentIndex = 0;
    }

    showImage(currentIndex);

});

prevBtn.addEventListener('click',()=>{

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = thumbnails.length - 1;
    }

    showImage(currentIndex);

});

closeBtn.addEventListener('click',()=>{

    lightbox.classList.remove('open');

});

lightbox.addEventListener('click',(e)=>{

    if(e.target === lightbox){

        lightbox.classList.remove('open');

    }

});

document.addEventListener('keydown',(e)=>{

    if(!lightbox.classList.contains('open')) return;

    if(e.key === 'Escape'){

        lightbox.classList.remove('open');

    }

    if(e.key === 'ArrowRight'){

        nextBtn.click();

    }

    if(e.key === 'ArrowLeft'){

        prevBtn.click();

    }

});




const modal = document.getElementById("caseModal");
const modalBody = document.getElementById("modalBody");

document.querySelectorAll(".view-case").forEach(button=>{

    button.addEventListener("click",()=>{

        const project = button.dataset.case;

        fetch(`cases/${project}/case.html`)
            .then(r => r.text())
            .then(html => {

                modalBody.innerHTML = html;

                modal.classList.add("active");

                document.body.style.overflow = "hidden";

                // 🔥 IMPORTANT: re-init galleries after injection
                initGalleries();


            });

    });

});

// fetch(`cases/coca-hk/case.html`)
//             .then(r => r.text())
//             .then(html => {

//                 modalBody.innerHTML = html;

//                 modal.classList.add("active");

//                 document.body.style.overflow = "hidden";

//                 // 🔥 IMPORTANT: re-init galleries after injection
//                 initGalleries();


//             });

function closeModal(){

    modal.classList.remove("active");

    document.body.style.overflow="";

    setTimeout(()=>{

        modalBody.innerHTML="";

    },300);

}

document.querySelector(".modal-close")
    .addEventListener("click",closeModal);

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        closeModal();

    }

});

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeModal();

    }

});













function initGalleries() {

    document.querySelectorAll("[data-gallery]").forEach(gallery => {

        const mainImage = gallery.querySelector("[data-main-image]");
        const thumbs = gallery.querySelectorAll("[data-thumb]");

        if (!mainImage || thumbs.length === 0) return;

        thumbs.forEach(thumb => {

            thumb.addEventListener("click", () => {

                // update main image
                mainImage.src = thumb.src;

                // update active state
                thumbs.forEach(t => t.classList.remove("active"));
                thumb.classList.add("active");

            });

        });

    });

}

// Run on initial load
document.addEventListener("DOMContentLoaded", initGalleries);