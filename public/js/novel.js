
function showSummary(){
    $(".show-summary-btn").hide();
    $(".hide-summary-btn").show();
    $(".summary-section > p").show();
}

function hideSummary(){
    $(".hide-summary-btn").hide();
    $(".summary-section > p").hide();
    $(".show-summary-btn").show();
}

$(document).ready(()=>{
    console.log("hello world");
    $(".show-summary-btn").click(showSummary);
    $(".hide-summary-btn").click(hideSummary);

    $(".hide-summary-btn").hide();
    $(".summary-section > p").hide();
});