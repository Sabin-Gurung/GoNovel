
$(document).ready(function(){
    console.log("Document is ready");

    // getting list of users from jason
    fetch("/api/v1/users")
    .then(res=>res.json())
    .then(data => {
        console.log(data);
        data.users.forEach(user => {
            $(".trending-users").append(`<li class="list-group-item"><a href="/users/${user.username}">${user.firstName} ${user.lastName}</a></li>`);
        });
    })
    .catch((err)=>{
        console.log(err);
    });

    fetch("/api/v1/novels")
    .then(res=>res.json())
    .then(data => {
        console.log(data);
        data.novels.forEach(novel => {
            $(".trending-novels").append(`<li class="list-group-item"><a href="/novels/${novel.novelid}">${novel.title}</a> (<em>${novel.author}</em>)</li>`);
        });
    })
    .catch((err)=>{
        console.log(err);
    });
});
