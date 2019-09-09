
$(document).ready(function(){
    console.log("Document is ready");

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
});
