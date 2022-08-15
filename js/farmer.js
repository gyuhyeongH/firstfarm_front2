function XSSCheck(str, level) {
    if (level == undefined || level == 0) {
        str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, "");
    } else if (level != undefined && level == 1) {
        str = str.replace(/\</g, "&lt;");
        str = str.replace(/\>/g, "&gt;");
    }
    return str;
}
$(document).ready(function () {
    get_farmer();
    get_review();
})
function get_star(rate) {
    if (rate == 1) {
        return "⭐️";
    } else if (rate == 2) {
        return "⭐️⭐️";
    } else if (rate == 3) {
        return "⭐️⭐️⭐️";
    } else if (rate == 4) {
        return "⭐️⭐️⭐️⭐️";
    } else if (rate == 5) {
        return "⭐️⭐️⭐️⭐️⭐️";
    } else {
        return 0;
    }
}
function get_farmer() {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/farmer/",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},

        success: function (response) {
            let temp_put_info = `
            <a title="Button push blue/green" class="button btnPush btnBlueGreen" onclick="handle_signput()"
            style="width: 30%; float: right;">
           저장
           </a>
            `;
            $('#button_box').append(temp_put_info);
            if (response.length > 0) {
                let rank = response[0]['userinfo']['rank']
                let birthday = response[0]['userinfo']['birthday']
                let email = response[0]['userinfo']['email']
                let fullname = response[0]['userinfo']['fullname']
                let location = response[0]['userinfo']['location']
                let prefer = response[0]['userinfo']['prefer']
                let gender = response[0]['userinfo']['gender']
                let introduction = response[0]['userinfo']['introduction']
                let phone_number = response[0]['userinfo']['phone_number']
                let points = response[0]['userinfo']['points']
                let prof_img = response[0]['userinfo']['profile_img']
                if (prof_img == undefined || null) {
                    let temp_container = `
                    <div class="container">
                        <div class="row" style="text-align: center;">
                            <header style="width: 100%;">
                                <h1>안녕 하세요! ${fullname}님</h1>
                                <p> ${fullname}님은 <strong>${rank} 중인 여름지기</strong> 입니다 🌱 <br /></p>
                                <p>다음 랭크까지 <strong>${points}%</strong> 모았어요 ! <br /></p>
                            </header>
                            <header>
                                <span class="image fit" style="width:50%;margin:0 auto;"><img
                                        src='./images/style_sign_in_up_images/form_profile_img.png';
                                        alt="profile_img" /></span>
                            </header>
                            <header id="desc" style="width: 100%;">
                                <p> ✔️ 이름 : ${fullname} <br />
                                    ✔️ 성별 : ${gender} <br />
                                    ✔️ phone_number : ${phone_number} <br />
                                    ✔️ email : ${email} <br />
                                    ✔️ introduction : ${introduction} <br />
                                    🎂 birthday : ${birthday} <br />
                                    📍 location : ${location} <br />
                                    💡 prefer : ${prefer} <br />
                                </p>
                            </header>
                            <header id="profile_button_box">
                                <a title="Button push blue/green" class="button btnPush btnBlueGreen" href="#put_info"
                                     style="width: 40%; margin-right: 10px;">
                                    정보 수정
                                </a>
                                <a href="#work" title="Button push blue/green" class="button btnPush btnBlueGreen"
                                    style="width: 40%;">다녀온 농장</a>
                            </header>
                        </div>
                    </div>
                    `;
                    $('#top').append(temp_container);
                } else {
                    let temp_container = `
                    <div class="container">
                        <div class="row" style="text-align: center;">
                            <header style="width: 100%;">
                                <h1>안녕 하세요! ${fullname}님</h1>
                                <p> ${fullname}님은 <strong>${rank} 중인 여름지기</strong> 입니다 🌱 <br /></p>
                                <p>다음 랭크까지 <strong>${points}%</strong> 모았어요 ! <br /></p>
                            </header>
                            <header>
                                <span class="image fit" style="width:50%;margin:0 auto;"><img
                                        src="${prof_img}"
                                        alt="profile_img" /></span>
                            </header>
                            <header id="desc" style="width: 100%;">
                                <p> ✔️ 이름 : ${fullname} <br />
                                    ✔️ 성별 : ${gender} <br />
                                    ✔️ phone_number : ${phone_number} <br />
                                    ✔️ email : ${email} <br />
                                    ✔️ introduction : ${introduction} <br />
                                    🎂 birthday : ${birthday} <br />
                                    📍 location : ${location} <br />
                                    💡 prefer : ${prefer} <br />
                                </p>
                            </header>
                            <header id="profile_button_box">
                                <a title="Button push blue/green" class="button btnPush btnBlueGreen" href="#put_info"
                                 style="width: 40%; margin-right: 10px;">
                                    정보 수정
                                </a>
                                <a href="#work" title="Button push blue/green" class="button btnPush btnBlueGreen"
                                    style="width: 40%;">다녀온 농장</a>
                            </header>
                        </div>
                    </div>
                    `;
                    $('#top').append(temp_container);
                }
                /* 다녀온 공고 */

                let temp_article_review = `
                    <h1>다녀온 농장</h1>
                    <p>농장지기님들과 함께한 시간들을 확인해 보세요 :)</p>
                `;
                $('#plus_name').append(temp_article_review);

                $('#review_post_box').empty();
                $('#articlearticle').empty();
                for (let i = 0; i < response.length; i++) {
                    let article_id = response[i]['articleinfo']['article_id']
                    let farmname = response[i]['articleinfo']['farm_name']
                    let location = response[i]['articleinfo']['location']
                    let title = response[i]['articleinfo']['title']
                    let cost = response[i]['articleinfo']['cost']
                    let desc = response[i]['articleinfo']['desc']
                    let period = response[i]['articleinfo']['period']
                    let img1 = response[i]['articleinfo']['img1']
                    let review_dup = response[i]['reviewinfo']
                    let temp_post_button = `                                   
                    <div id="article_review_post${article_id}" class="hide">
                        <div class="col-12">
                        <textarea name="content" id="review_content" placeholder="후기 내용"
                            style="width:80%;height:100%;"></textarea>
                        </div>
                        <div class="col-12" style="margin-bottom: 25px;">
                            <h3>💡 후기 사진은 최대 3장 업로드 가능합니다 </h3>
                            <div>
                                <input class="form-control" type="file" id="formFileMultiple" multiple>
                            </div>
                        </div>
                        <div class="col-12">
                            <div>
                                <select class="form-select" id="post-select" aria-label="rate"
                                    style="margin-bottom: 25px;">
                                    <option selected>이번 ${farmname}농장지기님과의 ${title}경험은 어땟나요?</option>
                                    <option value="1">⭐️</option>
                                    <option value="2">⭐️⭐️</option>
                                    <option value="3">⭐️⭐️⭐️</option>
                                    <option value="4">⭐️⭐️⭐️⭐️</option>
                                    <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-12" id="post_review_button">
                            <a onclick="post_review(${article_id})" title="Button push blue/green"
                            class="button btnPush btnBlueGreen">후기 작성</a>
                        </div>
                    </div>
                    `;
                    $('#review_post_box').append(temp_post_button);

                    if (img1 == undefined || img1 == null) {
                        if (review_dup == true) {
                            let temp_article_review = `
                            <div class="col-4 col-6-medium col-12-small">
                                <article class="box style2">
                                    <div class="image featured">
                                    <img src="./img/first_farm_logo.png" alt="default_img" />
                                    </div>
                                    <h3><a href="./articledetail.html">${title}</a></h3>
                                    <p> 농장 : ${farmname} <br />
                                        설명 : ${desc} <br />
                                        비용 : ${cost} <br />
                                        위치 : ${location} <br />
                                        참여 기간 : ${period}일간<br />
                                    <a onclick="document.getElementById('article_review_post${article_id}').classList.remove('hide');" title="Button push blue/green" href="#contact"
                                    class="button btnPush btnBlueGreen">후기 작성</a>
                                </article>
                            </div>
                            `;
                            $('#articlearticle').append(temp_article_review);

                        } else {
                            let temp_article_review = `
                            <div class="col-4 col-6-medium col-12-small">
                                <article class="box style2">
                                    <div class="image featured">
                                    <img src="./img/first_farm_logo.png" alt="default_img" />
                                    </div>
                                    <h3><a href="./articledetail.html">${title}</a></h3>
                                    <p> 농장 : ${farmname} <br />
                                        설명 : ${desc} <br />
                                        비용 : ${cost} <br />
                                        위치 : ${location} <br />
                                        참여 기간 : ${period}일간<br />
                                    <a title="Button push blue/green" href="#portfolio"
                                    class="button btnPush btnBlueGreen">작성한 후기 확인</a>
                                </article>
                            </div>
                            `;
                            $('#articlearticle').append(temp_article_review);
                        }
                    } else {
                        if (review_dup == true) {
                            let temp_article_review = `
                            <div class="col-4 col-6-medium col-12-small">
                                <article class="box style2">
                                    <div class="image featured">
                                    <img src="${img1}" alt="default_img" />
                                    </div>
                                    <h3><a href="./articledetail.html">${title}</a></h3>
                                    <p> 농장 : ${farmname} <br />
                                        설명 : ${desc} <br />
                                        비용 : ${cost} <br />
                                        위치 : ${location} <br />
                                        참여 기간 : ${period}일간<br />
                                        <a onclick="document.getElementById('article_review_post${article_id}').classList.remove('hide');" title="Button push blue/green" href="#contact"
                                        class="button btnPush btnBlueGreen">후기 작성</a>
                                </article>
                            </div>
                            `;
                            $('#articlearticle').append(temp_article_review);

                        } else {
                            let temp_article_review = `
                            <div class="col-4 col-6-medium col-12-small">
                                <article class="box style2">
                                    <div class="image featured">
                                    <img src="${img1}" alt="default_img" />
                                    </div>
                                    <h3><a href="./articledetail.html">${title}</a></h3>
                                    <p> 농장 : ${farmname} <br />
                                        설명 : ${desc} <br />
                                        비용 : ${cost} <br />
                                        위치 : ${location} <br />
                                        참여 기간 : ${period}일간<br />
                                    <a title="Button push blue/green" href="#portfolio"
                                    class="button btnPush btnBlueGreen">작성한 후기 확인</a>
                                </article>
                            </div>
                            `;
                            $('#articlearticle').append(temp_article_review);
                        }
                    }
                }


            } else {
                let rank = response.rank
                let birthday = response.birthday
                let email = response.email
                let fullname = response.fullname
                let location = response.location
                let prefer = response.prefer
                let gender = response.gender
                let introduction = response.introduction
                let phone_number = response.phone_number
                let points = response.points
                let prof_img = response.profile_img

                if (prof_img == undefined || null) {
                    let temp_container = `
                    <div class="container">
                        <div class="row" style="text-align: center;">
                            <header style="width: 100%;">
                                <h1>안녕 하세요! ${fullname}님</h1>
                                <p> ${fullname}님은 <strong>${rank} 중인 여름지기</strong> 입니다 🌱 <br /></p>
                                <p>다음 랭크까지 <strong>${points}%</strong> 모았어요 ! <br /></p>
                            </header>
                            <header>
                                <span class="image fit" style="width:50%;margin:0 auto;"><img
                                        src='./images/style_sign_in_up_images/form_profile_img.png';
                                        alt="profile_img" /></span>
                            </header>
                            <header id="desc" style="width: 100%;">
                                <p> ✔️ 이름 : ${fullname} <br />
                                    ✔️ 성별 : ${gender} <br />
                                    ✔️ phone_number : ${phone_number} <br />
                                    ✔️ email : ${email} <br />
                                    ✔️ introduction : ${introduction} <br />
                                    🎂 birthday : ${birthday} <br />
                                    📍 location : ${location} <br />
                                    💡 prefer : ${prefer} <br />
                                </p>
                            </header>
                            <header id="profile_button_box">
                                <a title="Button push blue/green" class="button btnPush btnBlueGreen" href="#put_info"
                                 style="width: 40%; margin-right: 10px;">
                                    정보 수정
                                </a>
                                <a href="#work" title="Button push blue/green" class="button btnPush btnBlueGreen"
                                    style="width: 40%;">다녀온 농장</a>
                            </header>
                        </div>
                    </div>
                    `;
                    $('#top').append(temp_container);
                } else {
                    let temp_container = `
                    <div class="container">
                        <div class="row" style="text-align: center;">
                            <header style="width: 100%;">
                                <h1>안녕 하세요! ${fullname}님</h1>
                                <p> ${fullname}님은 <strong>${rank} 중인 여름지기</strong> 입니다 🌱 <br /></p>
                                <p>다음 랭크까지 <strong>${points}%</strong> 모았어요 ! <br /></p>
                            </header>
                            <header>
                                <span class="image fit" style="width:50%;margin:0 auto;"><img
                                        src="${prof_img}";
                                        alt="profile_img" /></span>
                            </header>
                            <header id="desc" style="width: 100%;">
                                <p> ✔️ 이름 : ${fullname} <br />
                                    ✔️ 성별 : ${gender} <br />
                                    ✔️ phone_number : ${phone_number} <br />
                                    ✔️ email : ${email} <br />
                                    ✔️ introduction : ${introduction} <br />
                                    🎂 birthday : ${birthday} <br />
                                    📍 location : ${location} <br />
                                    💡 prefer : ${prefer} <br />
                                </p>
                            </header>
                            <header id="profile_button_box">
                                <a title="Button push blue/green" class="button btnPush btnBlueGreen" href="#put_info"
                                 style="width: 40%; margin-right: 10px;">
                                    정보 수정
                                </a>
                                <a href="#work" title="Button push blue/green" class="button btnPush btnBlueGreen"
                                    style="width: 40%;">다녀온 농장</a>
                            </header>
                        </div>
                    </div>
                    `;
                    $('#top').append(temp_container);
                }
                let temp_article_review = `
                <h1>다녀온 농장</h1>
                <p>아직 다녀온 농장이 없어요 🧚</p>
                `;
                $('#plus_name').append(temp_article_review);

                let temp_put_info = `
                <a title="Button push blue/green" class="button btnPush btnBlueGreen" onclick="handle_signput()"
                style="width: 30%; float: right;">
               저장
               </a>
                `;
                $('#button_box').append(temp_put_info);
            }
        }
    })
}
function get_review() {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/review/",

        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},
        success: function (response) {
            let temp_review_plus_name = `
            <h1>내가 작성한 후기</h1>
            <p>농장지기님들과의 추억을 보관중입니다, 내가 작성한 후기들을 확인해 보세요 🧚</p>
            `;
            $('#review_plus_name').append(temp_review_plus_name);
            for (let i = 0; i < response.length; i++) {
                let article_title = response[i]['articleinfo']['title']
                let period = response[i]['articleinfo']['period']
                let review_id = response[i]['id']
                let rate = response[i]['rate']
                let img1 = response[i]['img1']
                let img2 = response[i]['img2']
                let img3 = response[i]['img3']
                let content = response[i]['content']
                let created_at = response[i]['created_at'].split('T')[0]
                let updated_at = response[i]['updated_at'].split('T')[0]
                let star = get_star(rate)
                let img_print = [img1,img2,img3]

<<<<<<< HEAD
                if (img1 == undefined || img1 == null || img2 == undefined || img2 == null || img3 == undefined || img3 == null) {
=======
                for(let j=0;j<3;j++){
                    if(img_print[j] == undefined || img_print[j] == null){
                        img_print.splice(j) // 없는 이미지는 삭제
                    }
                }
                if(img1 == undefined || img1 == null && img2 == undefined || img2 == null && img3 == undefined || img3 == null){
>>>>>>> 33a8bd6ec4feecdf21c207d8a26449f9626adb22
                    let temp_review = `
                    <div class="col-4 col-6-medium col-12-small">
                        <article class="box style2">
                            <div class="image featured">
                            <img src="./img/first_farm_logo.png" alt="default_img" />
                            </div>
                            <h3><a href="./articledetail.html">${article_title}</a></h3>
                            <p> ${content} <br />
                                ${star} <br />
                                기간 :  ${period} 일간 참여 <br />
                                업로드 : ${created_at} |
                                수정 : ${updated_at} <br /></p>
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${review_id}">
                                    후기 수정
                                </button>
                                <button onclick="delete_review(${review_id})">후기 삭제</button>			
                        </article>
                    </div>
                    `;
                    $('#reviewreview').append(temp_review);
                    let temp_put = `
                    <div class="modal fade" id="exampleModal${review_id}" tabindex="-1"
                    aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">후기 수정</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="mb-3">
                                        <label for="exampleFormControlTextarea" class="form-label"> ✏️ 후기를 수정해
                                            주세요!</label>
                                        <textarea class="form-control" id="review_content_put"
                                            rows="10"></textarea>
                                    </div>
                                    <!-- 사진 업로드 -->
                                    <div class="mb-3">
                                        <label for="formFileMultiple" class="form-label">💡 후기 사진은 최대 3장 업로드
                                            가능합니다 </label>
                                        <input class="form-control" type="file" id="put_FileMultiple" multiple>
                                    </div>
                                    <!-- 평점 -->
                                    <select class="form-select" id="put-select" aria-label="rate">
                                        <option selected>🌟 이만큼 만족했어요!</option>
                                        <option value="1">⭐️</option>
                                        <option value="2">⭐️⭐️</option>
                                        <option value="3">⭐️⭐️⭐️</option>
                                        <option value="4">⭐️⭐️⭐️⭐️</option>
                                        <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                                    </select>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">닫기</button>
                                    <button type="button" class="btn btn-primary"
                                        onclick="put_review(${review_id})">후기 수정
                                        하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
                    $('#review_put_box').append(temp_put);
<<<<<<< HEAD
                } else {
                    let temp_review = `
=======
                    }else{
                        let temp_review =`
>>>>>>> 33a8bd6ec4feecdf21c207d8a26449f9626adb22
                        <div class="col-4 col-6-medium col-12-small">
                            <article class="box style2">
                                <div class="image featured" id="review_imageimage${review_id}">

                                </div>
                                <h3><a href="./articledetail.html">${article_title}</a></h3>
                                <p> ${content} <br />
                                    ${star} <br />
                                    기간 :  ${period} 일간 참여 <br />
                                    업로드 : ${created_at} |
                                    수정 : ${updated_at} <br /></p>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal${review_id}">
                                        후기 수정
                                    </button>
                                    <button onclick="delete_review(${review_id})">후기 삭제</button>			
                            </article>
                        </div>
                        `;
<<<<<<< HEAD
                    $('#reviewreview').append(temp_review);
                    let temp_put = `
=======
                        $('#reviewreview').append(temp_review);

                            for(let j=0;j<img_print.length;j++){
                                let temp_reviewimageimage = `
                                <img src="img_print[${j}]" alt="review_img" />
                            `;
                            $('#review_imageimage${review_id}').append(temp_reviewimageimage)
                            }
                        }
                        let temp_put =`
>>>>>>> 33a8bd6ec4feecdf21c207d8a26449f9626adb22
                        <div class="modal fade" id="exampleModal${review_id}" tabindex="-1"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">후기 수정</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="mb-3">
                                            <label for="exampleFormControlTextarea" class="form-label"> ✏️ 후기를 수정해
                                                주세요!</label>
                                            <textarea class="form-control" id="review_content_put"
                                                rows="10"></textarea>
                                        </div>
                                        <!-- 사진 업로드 -->
                                        <div class="mb-3">
                                            <label for="formFileMultiple" class="form-label">💡 후기 사진은 최대 3장 업로드
                                                가능합니다 </label>
                                            <input class="form-control" type="file" id="put_FileMultiple" multiple>
                                        </div>
                                        <!-- 평점 -->
                                        <select class="form-select" id="put-select" aria-label="rate">
                                            <option selected>🌟 이만큼 만족했어요!</option>
                                            <option value="1">⭐️</option>
                                            <option value="2">⭐️⭐️</option>
                                            <option value="3">⭐️⭐️⭐️</option>
                                            <option value="4">⭐️⭐️⭐️⭐️</option>
                                            <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                                        </select>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary"
                                            data-bs-dismiss="modal">닫기</button>
                                        <button type="button" class="btn btn-primary"
                                            onclick="put_review(${review_id})">후기 수정
                                            하기</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
<<<<<<< HEAD
                    $('#review_put_box').append(temp_put);

=======
                        $('#review_put_box').append(temp_put);
>>>>>>> 33a8bd6ec4feecdf21c207d8a26449f9626adb22
                }

            }
    })
}
/* 리뷰 작성 */
function post_review(article_id) {
    var token = localStorage.getItem("access")
    let content = $('#review_content').val()
    let img = $('#formFileMultiple')[0];
    if (img.files.length > 3) {
        alert("사진 업로드는 최대 3개까지 가능합니다");
        return;
    }

    let rate = $('#post-select').val()
    const formData = new FormData();
    formData.append("img1", img.files[0]);
    formData.append("img2", img.files[1]);
    formData.append("img3", img.files[2]);
    formData.append("content", XSSCheck(content, 1));
    formData.append("rate", rate);
    $.ajax({
        type: "POST",
        url: "https://rbgud.shop/article/" + article_id + "/farmer",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            if (response["message"] == '리뷰 작성 완료!') {
                window.location.reload();
            } else {
                window.location.reload();
            }
        },
        error: function () {
            alert("댓글과 평가점수는 필수입니다.")
        }
    })
}

function put_review(review_id) {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    let content = $('#review_content_put').val()
    let img = $('#put_FileMultiple')[0];
    if (img.files.length > 3) {
        alert("사진 업로드는 최대 3개까지 가능합니다");
        return;
    }
    let rate = $('#put-select').val();
    const formData = new FormData();
    formData.append("img1", img.files[0]);
    formData.append("img2", img.files[1]);
    formData.append("img3", img.files[2]);
    formData.append("content", XSSCheck(content, 1));
    formData.append("rate", rate);
    $.ajax({
        type: "PUT",
        url: "https://rbgud.shop/article/farmer/" + review_id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            window.location.reload();
        },
        error: function (response) {
            console.log(response)
            if (response["message"] == '리뷰 수정 실패!') {
                alert("리뷰 수정에 실패했습니다");
            } else {
                alert("작성자만 리뷰 수정이 가능합니다");
            }
        }
    })
}

function delete_review(review_id) {
    var token = localStorage.getItem("access")
    $.ajax({
        type: "DELETE",
        url: "https://rbgud.shop/article/farmer/" + review_id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},
        success: function (response) {
            alert(response["message"])
            if (response["message"] == '리뷰 삭제 완료.') {
                window.location.reload();
            } else {
                window.location.reload();
            }
        }

    })
}

// 사용자 정보 수정하기
async function handle_signput() {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }

    const input_img = document.getElementById("input_img").files[0]
    const location = document.getElementById("locations").value
    const introduction = document.getElementById("introduction").value
    const prefer = document.getElementById("prefer").value

    const signputData = new FormData();

    signputData.append('img', input_img);
    signputData.append("location", XSSCheck(location, 1));
    signputData.append("introduction", XSSCheck(introduction, 1));
    signputData.append("prefer", XSSCheck(prefer, 1));

    $.ajax({
        type: "PUT",
        url: "https://rbgud.shop/user/" + user_id + "/",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: signputData,
        cache: false,
        contentType: false,
        processData: false,
        success: function () {
            const payload = JSON.parse(localStorage.getItem("payload"));
            alert("수정사항이 정상적으로 저장되었습니다.")
            if (payload != null) {
                const user_category = payload.category;
                if (user_category == 1) {
                    window.location.replace(`https://hwisu.shop/farm.html`);
                } else {
                    window.location.replace(`https://hwisu.shop/farmer.html`);
                }
            }
        },
        error: function () {
            alert("수정 실패")
        }
    })
}