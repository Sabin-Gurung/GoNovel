
$(document).ready(function(){
    console.log("Document is ready");

    // getting list of users from jason
    fetch("/api/v1/users")
    .then(res=>res.json())
    .then(data => {
        console.log(data);
        data.users.forEach(user => {
            $(".trending-users").append(`<li>${user.firstName} ${user.lastName} <a href="/users/${user.username}">Check Profile</a></li>`);
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
            $(".trending-novels").append(`<li>${novel.title} - ${novel.author} <a href="/novels/${novel.novelid}">Check Novel</a></li>`);
        });
    })
    .catch((err)=>{
        console.log(err);
    });
});
