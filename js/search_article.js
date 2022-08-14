$(document).ready(function () {
    get_article();
});



let menu_recommend = document.getElementsByClassName("nav-link")[3];
if (localStorage.getItem("access")) {
    menu_recommend.style.visibility = "visible";
} else {
    menu_recommend.style.visibility = "hidden";
}

const firstTabEl = document.querySelector("#myTab li:first-child button");
const firstTab = new bootstrap.Tab(firstTabEl);

firstTab.show();

let get_article_button = document.querySelectorAll(".onclick");
let menu_list = [
    "",
    "",
    "",
    "",
    "",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
];

for (let i = 0; i < menu_list.length; i++) {
    get_article_button[i].addEventListener(
        "click",
        () => {
            get_article(menu_list[i]);
        },
        false
    );
}

function get_article(choice) {
    category = document.getElementsByClassName("nav-link active")[0].value;
    if (category == 3) {
        $(".search_box").hide();
    } else {
        $(".search_box").show();
    }

    var token = localStorage.getItem("access");
    $.ajax({
        headers: { choice: choice, category: category },
        type: "GET",
        url: "https://rbgud.shop/article/",
        beforeSend: function (xhr) {
            if (localStorage.getItem("access")) {
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            }
        },
        data: {},
        success: function (response) {
            $("#get_article").empty();
            if (response.length == 0) {
                let temp_article = '<p>검색 결과 없음</p>'
                $("#get_article").append(temp_article);
            }
            let responsed = response.reverse();
            for (let i = 0; i < responsed.length; i++) {
                let id = response[i]["id"];
                let title = response[i]["title"];
                let location = response[i]["location"];
                let cost = response[i]["cost"];
                let img1 = response[i]["img1"];
                if (img1 == null) {
                    img1 =
                        "https://s3.ap-northeast-2.amazonaws.com/firstfarm-media/img/output2_2slvTP3.jpg";
                }
                let period = response[i]["period"];
                let exposure_end_date = response[i]["exposure_end_date"].substr(0, 10);
                let updated_at = response[i]["updated_at"].substr(0, 10);
                let temp_article = `<article class="style1">
                <span class="image">
                    <img src="${img1}" style="height:405px; width:405px;" alt="" />
                </span>
                <a href="articledetail.html" onclick="storage_id(${id})">
                    <h2>${title}</h2>
                    <div class="content">
                        <p><br>
                        지역 : ${location}<br>
                        급여 : ${cost}<br>
                        참여 일자 : ${period}<br>
                        모집기간 : ${updated_at} ~ ${exposure_end_date}
                        </p>
                        </div>
                     </a>
            </article>`;

                $("#get_article").append(temp_article);
            }
        },
        error: function () {
            $("#get_article").empty();
            let temp_article = `<div><p>검색 결과 없음</p><div>`
            $("#get_article").append(temp_article);
        }
    });
}


function storage_id(article_id) {
    window.localStorage.setItem("article_id", article_id);
}



function search_articles() {
    let search_text = $("#search_text").val();
    if (search_text == '') {
        return false;
    }
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/search",
        data: { 'search_text': search_text },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function (response) {
            $("#get_article").empty();
            if (response.length == 0) {
                let temp_article = '<p>검색 결과 없음</p>'
                $("#get_article").append(temp_article);
            }
            let responsed = response.reverse();
            for (let i = 0; i < responsed.length; i++) {
                let id = response[i]["id"];
                let title = response[i]["title"];
                let location = response[i]["location"];
                let cost = response[i]["cost"];
                let img1 = response[i]["img1"];
                if (img1 == null) {
                    img1 =
                        "https://s3.ap-northeast-2.amazonaws.com/firstfarm-media/img/output2_2slvTP3.jpg";
                }
                let period = response[i]["period"];
                let exposure_end_date = response[i]["exposure_end_date"].substr(0, 10);
                let updated_at = response[i]["updated_at"].substr(0, 10);
                let temp_article = `<article class="style1">
                <span class="image">
                    <img src="${img1}" style="height:405px; width:405px;" alt="" />
                </span>
                <a href="articledetail.html" onclick="storage_id(${id})">
                    <h2>${title}</h2>
                    <div class="content">
                        <p><br>
                        지역 : ${location}<br>
                        급여 : ${cost}<br>
                        참여 일자 : ${period}<br>
                        모집기간 : ${updated_at} ~ ${exposure_end_date}
                        </p>
                        </div>
                     </a>
            </article>`;

                $("#get_article").append(temp_article);
            }
        },
        error: function () {
            $("#get_article").empty();
            let temp_article = '<p>검색 결과 없음</p>'
            $("#get_article").append(temp_article);
        }
    });
}

$('.searchTerm').keyup('keyup', function (event) {
    if (event.keyCode === 13) {
        $('#search_button').click();
    }

});