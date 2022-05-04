const deleteSvgs = document.querySelectorAll('.delete-svg');
const deletePs = document.querySelectorAll('.delete-p');
const deleteForm = document.getElementById('delete-single-post');
const backdrop = document.getElementById('backdrop');
const reserFormButton = document.getElementById('reset-button');
const hiddenInputInDeleteForm = document.querySelector('#delete-single-post input');

function deletePost (event) {
    let postId
    if (event.target.parentElement.parentElement.parentElement.children[0].children[1].dataset.postid) {
        postId = +event.target.parentElement.parentElement.parentElement.children[0].children[1].dataset.postid;
    } else {
        postId = +event.target.parentElement.parentElement.children[0].children[1].dataset.postid;
    }
    deleteForm.classList.remove('disabled');
    backdrop.classList.remove('disabled');

    hiddenInputInDeleteForm.value = postId;
}

function closeForm () {
    deleteForm.classList.add('disabled');
    backdrop.classList.add('disabled');
}

for (deleteSvg of deleteSvgs) {
    deleteSvg.addEventListener( "click" , deletePost);
}

for (deleteP of deletePs) {
    deleteP.addEventListener( "click" , deletePost);
}

backdrop.addEventListener("click", closeForm);
reserFormButton.addEventListener("click", closeForm);