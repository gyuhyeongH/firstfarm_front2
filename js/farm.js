function XSSCheck(str, level) {
    if (level == undefined || level == 0) {
        str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, "");
    } else if (level != undefined && level == 1) {
        str = str.replace(/\</g, "&lt;");
        str = str.replace(/\>/g, "&gt;");
    }
    return str;
<<<<<<< HEAD
}
=======
  }
>>>>>>> 351697083d2d52547020d5a9535069917023a00f

$(document).ready(function () {
    get_farm();
})

function get_farm() {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/farm/",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},
        success: function (response) {
<<<<<<< HEAD
            if (response.length > 0) {
=======
            let temp_put_info = `
                <a title="Button push blue/green" class="button btnPush btnBlueGreen" onclick="handle_signput()"
                style="width: 30%; float: right;">
               저장
               </a>
                `;
            $('#button_box').append(temp_put_info);
            if(response.length>0){
>>>>>>> 351697083d2d52547020d5a9535069917023a00f
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
<<<<<<< HEAD
                let prof_img = response[0]['userinfo']['profile_img']
                if (prof_img == undefined || null) {
=======
                let prof_img= response[0]['userinfo']['profile_img']

                if(prof_img == undefined || null){
>>>>>>> 351697083d2d52547020d5a9535069917023a00f
                    let temp_container = `
                    <div class="container">
                        <div class="row" style="text-align: center;">
                            <header style="width: 100%;">
                                <h1>안녕 하세요! ${fullname}님</h1>
                                <p> ${fullname}님은 <strong>${rank} 중인 농장지기</strong> 입니다 🌱 <br /></p>
                                <p>다음 랭크까지 <strong>${points}%</strong> 모았어요 ! <br /></p>
                            </header>
                            <header>
                                <span class="image fit" style="width:50%;margin:0 auto;" >
                                <img src="./images/style_sign_in_up_images/form_profile_img.png"
                                        alt="profile_img"/></span>
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
                                <a title="Button push blue/green" class="button btnPush btnBlueGreen" href="#put_info" style="width: 40%; margin-right: 10px;">
                                    정보 수정
                                </a>
                                <a href="#work" title="Button push blue/green" class="button btnPush btnBlueGreen"
                                    style="width: 40%;">공고 현황</a>
                            </header>
                        </div>
                    </div>
                    `;
                    $('#top').append(temp_container);
                }
                else {
                    let temp_container = `
                    <div class="container">
                        <div class="row" style="text-align: center;">
                            <header style="width: 100%;">
                                <h1>안녕 하세요! ${fullname}님</h1>
                                <p> ${fullname}님은 <strong>${rank} 중인 농장지기</strong> 입니다 🌱 <br /></p>
                                <p>다음 랭크까지 <strong>${points}%</strong> 모았어요 ! <br /></p>
                            </header>
                            <header>
                            <span class="image fit" style="width:50%;margin:0 auto;">
                                <img src="${prof_img}" alt="profile_img" /></span>
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
                                    style="width: 40%;">공고 현황</a>
                            </header>
                        </div>
                    </div>
                    `;
                    $('#top').append(temp_container);
                }

<<<<<<< HEAD
                for (let i = 0; i < response.length; i++) {
=======
                let temp_plus_name = `
                <h1>게시한 공고</h1>
                <p>여름지기님들과 함께한 시간들을 확인해 보세요 :)</p>`;
                $('#plus_name').append(temp_plus_name)

                $('#articlearticle').empty();
                for (let i = 0; i < response.length; i++){
>>>>>>> 351697083d2d52547020d5a9535069917023a00f
                    let article_id = response[i]['id']
                    let farmname = response[i]['farm_name']
                    let location = response[i]['location']
                    let title = response[i]['title']
                    let cost = response[i]['cost']
                    let requirement = response[i]['requirement']
                    let period = response[i]['period']
                    let exposure_end_date = response[i]['exposure_end_date'].split('T')[0]
                    let created_at = response[i]['created_at'].split('T')[0]
                    let img1 = response[i]['img1']
                    if (img1 == undefined || img1 == null) {
                        let temp_article_info = `
                        <div class="col-4 col-6-medium col-12-small">
                            <article class="box style2">
                                <div class="image featured">
                                <img src="./img/first_farm_logo.png" alt="default_img" />
                                </div>
                                <h3><a href="./articledetail.html">${title}</a></h3>
                                <p> 농장 : ${farmname} <br />
                                    비용 : ${cost} <br />
                                    필수 사항 : ${requirement} <br />
                                    위치 : ${location} <br />
                                    참여 기간 : ${created_at} ~ ${exposure_end_date}</br>( ${period} 일 동안 참여 )<br />
                                    공고 마감 : ${exposure_end_date} <br />
                                    업로드 일 : ${created_at} <br /></p>
                                <a onclick="get_apply(${article_id})" title="Button push blue/green" href="#portfolio"
                                class="button btnPush btnBlueGreen">신청자 조회</a>
                            </article>
                        </div>
                        `;
                        $('#articlearticle').append(temp_article_info);
                    } else {
                        let temp_article_info = `
                        <div class="col-4 col-6-medium col-12-small">
                            <article class="box style2">
                                <div class="image featured">
                                <img src="${img1}" alt="default_img" />
                                </div>                                
                                <h3><a href="./articledetail.html">${title}</a></h3>
                                <p> 농장 : ${farmname} <br />
                                    비용 : ${cost} <br />
                                    필수 사항 : ${requirement} <br />
                                    위치 : ${location} <br />
                                    참여 기간 : ${created_at} ~ ${exposure_end_date}</br>( ${period}일 동안 참여 )<br />
                                    공고 마감 : ${exposure_end_date} <br />
                                    업로드 일 : ${created_at} <br /></p>
                                <a onclick="get_apply(${article_id})" title="Button push blue/green" href="#portfolio"
                                class="button btnPush btnBlueGreen">신청자 조회</a>
                            </article>
                        </div>
                        `;
                        $('#articlearticle').append(temp_article_info);
                    }
                }
<<<<<<< HEAD
                let temp_plus_name = `
                <h1>게시한 공고</h1>
                <p>여름지기님들과 함께한 시간들을 확인해 보세요 :)</p>`;
                $('#plus_name').append(temp_plus_name)
            } else {
                console.log(response)
=======
            }else{
>>>>>>> 351697083d2d52547020d5a9535069917023a00f
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

<<<<<<< HEAD
                if (prof_img == undefined || null) {
=======
                let temp_plus_name = `
                <h1>게시한 공고</h1>
                <p>아직 게시한 공고가 없어요</p>`;
                $('#plus_name').append(temp_plus_name);
                if(prof_img == undefined || null){
>>>>>>> 351697083d2d52547020d5a9535069917023a00f
                    let temp_container = `
                    <div class="container">
                        <div class="row" style="text-align: center;">
                            <header style="width: 100%;">
                                <h1>안녕 하세요! ${fullname}님</h1>
                                <p> ${fullname}님은 <strong>${rank} 중인 농장지기</strong> 입니다 🌱 <br /></p>
                                <p>다음 랭크까지 <strong>${points}%</strong> 모았어요 ! <br /></p>
                            </header>
                            <header>
                                <span class="image fit" style="width:50%;margin:0 auto;"><img
                                        src="./images/style_sign_in_up_images/form_profile_img.png"
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
                                    style="width: 40%;">공고 현황</a>
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
                                <p> ${fullname}님은 <strong>${rank} 중인 농장지기</strong> 입니다 🌱 <br /></p>
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
                                    style="width: 40%;">공고 현황</a>
                            </header>
                        </div>
                    </div>
                    `;
                    $('#top').append(temp_container);
                }
<<<<<<< HEAD

                let temp_plus_name = `
                <h1>게시한 공고</h1>
                <p>아직 게시한 공고가 없어요</p>`;
                $('#plus_name').append(temp_plus_name);

                let temp_put_info = `
                <a title="Button push blue/green" class="button btnPush btnBlueGreen" onclick="handle_signput()"
                style="width: 30%; float: right;">
               저장
               </a>
                `;
                $('#button_box').append(temp_put_info);
            }

=======
        }
            
>>>>>>> 351697083d2d52547020d5a9535069917023a00f
        }
    })
}

function get_apply(article_id) {
    var token = localStorage.getItem("access")
    if (localStorage.getItem("payload") != null) {
        const payload = JSON.parse(localStorage.getItem("payload"));
        user_id = payload.user_id;
    }
    document.getElementById('apply_user_info').classList.remove('hide');
    $.ajax({
        type: "GET",
        url: "https://rbgud.shop/article/farm/" + article_id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        data: {},
        success: function (response) {
            $('#apply_user_info').empty();
            for (let i = 0; i < response.length; i++) {
                let apply_id = response[i]['user']
                let rank = response[i]['userinfo']['rank']
                let email = response[i]['userinfo']['email']
                let fullname = response[i]['userinfo']['fullname']
                let location = response[i]['userinfo']['location']
                let gender = response[i]['userinfo']['gender']
                let age = response[i]['userinfo']['birthday']
                let phone_number = response[i]['userinfo']['phone_number']
                let accept = response[i]['accept']

                if (accept == true) {
                    let temp_apply_user_info = `
                    <p>${rank} | ${fullname} | ${gender} | ${age} | ${location} | ${phone_number} | ${email}</p>
                    <a onclick="put_apply(${article_id},${apply_id},${accept})" title="Button push blue/green"
                        class="button btnPush btnBlueGreen">수락 취소</a>
                `;
                    $('#apply_user_info').append(temp_apply_user_info);
                } else {
                    let temp_apply_user_info = `
                    <p>${rank} | ${fullname} | ${gender} | ${age} | ${location} | ${phone_number} | ${email}</p>
                    <a onclick="put_apply(${article_id},${apply_id},${accept})" title="Button push blue/green"
                        class="button btnPush btnBlueGreen">신청 수락</a>
                    `;
                    $('#apply_user_info').append(temp_apply_user_info);
                }
            }
        }
    })
}

function put_apply(article_id, apply_id, accept) {
    if (accept == true) {
        accept = false
    } else {
        accept = true
    }
    $.ajax({
        type: "PUT",
        url: "https://rbgud.shop/article/farm/" + article_id + "/" + apply_id,
        data: { 'accept': accept },
        success: function (response) {
            alert('신청 변경 완료');
            window.location.reload();

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
<<<<<<< HEAD
        url: "https://rbgud.shop/user/" + user_id + "/",
=======
        url: "https://rbgud.shop/user/" + user_id +"/",
>>>>>>> 351697083d2d52547020d5a9535069917023a00f
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
<<<<<<< HEAD
                    window.location.replace(`https://hwisu.shop/farm.html`);
                } else {
                    window.location.replace(`https://hwisu.shop/farmer.html`);
=======
                    window.location.replace(`http://hwisu.shop/farm.html`);
                } else {
                    window.location.replace(`http://hwisu.shop/farmer.html`);
>>>>>>> b1a788e5dc29cb1a474a8ca132232091defff528
                }
            }
        },
        error: function () {
            alert("수정 실패")
        }
    })
}