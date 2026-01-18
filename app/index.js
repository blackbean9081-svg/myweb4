let firstPick = null;

function setListenerTocard() {
    const cardAreaArr = document.querySelectorAll(".card-area");

    for (const cardArea of cardAreaArr) {
        cardArea.addEventListener("click", function (evt) {

            const temp = evt.currentTarget;

            if (temp.classList.contains("flip") || temp === firstPick) {
                return;
            }

            temp.classList.toggle("flip");

            const myValue = temp.querySelector(".card-back").innerHTML;
            // const myValue = temp.children[0].children[0].innerHTML;

            if (firstPick == null) {
                firstPick = temp;
            } else {
                const cardVal1 = firstPick.querySelector(".card-back").innerHTML;

                if (cardVal1 !== myValue) {
                    cntDec();

                    setTimeout(() => {
                        temp.classList.toggle("flip");
                        firstPick.classList.toggle("flip");
                        firstPick = null;
                    }, 1000);

                } else {
                    temp.classList.add("hidden");
                    firstPick.classList.add("hidden");
                    finish();
                    firstPick = null;
                }

            }


        })
    }
}



const main = document.querySelector("main");

function generateCardList() {
    const cardCnt = document.querySelector("#cardCnt").value;

    if (cardCnt > 50) {
        alert("50 아래 숫자만 가능")
        return;

    }
    main.innerHTML = "";

    const cardContentArr = [];
    for (let i = 0; i < cardCnt; ++i) {
        cardContentArr.push(i);
    }
    const arr = cardContentArr.concat(cardContentArr);

    const reult = shuffleArr(arr);

    for (const temp of reult) {
        main.innerHTML +=
            `<div class="card-area">
                <div class="card">
                    <div class="card-back">${temp}</div>
                    <div class="card-front">?</div>
                </div>
            </div>`;
    }
}

function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


function handleClick() {
    const cnt = document.querySelector("#cnt");
    cnt.innerHTML = '5';

    firstPick = null;

    main.classList.remove("endScreen");

    generateCardList();
    setListenerTocard();
}

function cntDec() {
    const cnt = document.querySelector("#cnt");

    let cntNum = Number(cnt.innerHTML);

    if (cntNum > 0) {
        cntNum = cntNum - 1;
        cnt.innerHTML = cntNum;
    } else {
        alert("남은 횟수 없음!!!")
        main.innerHTML = "";
    }
}


function reset() {
    const cnt = document.querySelector("#cnt");
    const val = document.querySelector("#cardCnt");

    val.value = '2';
    cnt.innerHTML = '5';

    firstPick = null;

}

function finish() {
    const hidCard = document.querySelectorAll(".card-area:not(.hidden)");

    if (hidCard.length == 0) {
        setTimeout(function () {
            main.innerHTML = "The End!!!"
            main.classList.add("endScreen");
        }, 300)
    }


}