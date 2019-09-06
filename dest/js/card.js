// import { TweenMax } from "gsap";

let storage = sessionStorage;
let correctTimes = 2; //correct times
function init(){
    let selectedCard = [];
    let cardShow = document.getElementsByClassName("cardShow")[0];
    let cardStudyStart = document.getElementsByClassName("cardStudyStart")[0];
    let cardSideBar = document.getElementsByClassName("cardSideBar")[0];
    let cardManage = document.getElementsByClassName("cardManage")[0];
    
    function putCardIntoSelectedCard(cardClass){
        //陣列已有卡片
        if(selectedCard.length != 0){
            selectedCard = [];
        }
        let vocabInClass = cardClass.children("ul").children();
        for(let i = 0; i < vocabInClass.length; i++){
            selectedCard[i] = vocabInClass[i].innerText;
            // console.log(selectedCard);
            // console.log(vocabInClass[i].innerText);
        }
    }
    

    let defaultCards = document.getElementsByClassName("cardClass")[0];
    for(let i = 0; i < defaultCards.firstElementChild.nextElementSibling.children.length; i++){
        selectedCard[i] = defaultCards.firstElementChild.nextElementSibling.children[i].innerText;
    }
    defaultCards.firstElementChild.innerText
    $(".cardShow span").text(defaultCards.firstElementChild.innerText);

    //點單字管理
    document.getElementById("toCardManage").onclick = function(){
        cardShow.style.display = "none";
        // cardManage.style.display = "block";
        $(".cardManage").fadeIn();
        //change background pic
        $('.cardStudy').css({'background': "no-repeat url(../img/cardImg/cardBackground.png)",'background-size': 'cover'});
    }
    //離開單字管理
    document.getElementById("cardMagLeave").onclick = function(){
        // cardShow.style.display = "block";
        $(".cardShow").fadeIn();
        cardManage.style.display = "none";
        //換回背景圖
        $('.cardStudy').css({'background': "no-repeat url(../img/cardImg/cardBackground2.png)", 'background-size': 'cover'});
    }

    document.getElementById("cardStudyBtn").onclick = function(){//study start
        //clear storage
        storage.clear();
        
        //呼叫製造卡片的函式
        createCards(selectedCard);


        cardShow.style.display = "none";
        cardSideBar.style.display = "none";
        // cardStudyStart.style.display = "block";
        $(".cardStudyStart").fadeIn();

        //進度條
        $(".cardProgress .red").css("width", "100%");
        $(".cardProgress .blue").css("width", "0%");

        //剩餘字卡數
        $(".cardProgress span").text(selectedCard.length);

        //顯示最上方卡片
        $(".memoryCard").last().css( "opacity", 1 );

        //中途跳出
        $("#cardQuit").click(function(){
            cardStudyStart.style.display = "none";
            $(".cardShow").fadeIn();
            $(".cardSideBar").fadeIn();
            // cardShow.style.display = "block";
            // cardSideBar.style.display = "block";

            //清除陣列
            // selectedCard = []
            //清除卡片
            $(".memoryCard").remove();
            //清除Storage
            storage.clear();
        });




        //卡片翻面
        $(".memoryCard").click(function(){ 
            $(this).toggleClass("rotate");
        });



    }; // click cardStudyBtn
    


    $(".cardSideBar .cardClass").click(function(){
        // 點擊的會反白
        if(!$(this).hasClass("cannotUseCard")){
            $(".cardSideBar .cardClass").removeClass("selectedCard");
            $(this).toggleClass("selectedCard");
        
            putCardIntoSelectedCard($(this));

            //點擊後改變卡片顯示的類別
            let cardClass = $(this).html();
            let result = cardClass.slice(cardClass.indexOf("<span>") + 6,cardClass.indexOf("</span>"))

            $(".cardShow span").text(result);
        
        }
    });


        // 找到類別中的單字並放入陣列中
        // let vocabInClass = $(this).children("ul").children();
        // for(let i = 0; i < vocabInClass.length; i++){
        //     selectedCard[i] = vocabInClass[i].innerText;
        //     // console.log(selectedCard);
        //     // console.log(vocabInClass[i].innerText);
        // }



    function rememberOrForget(){
        let lastCard = $(".memoryCard").last();
        let card = $(".memoryCard");
        //Remember
        if(this.id == "remember"){
            // console.log(card.length);


           
            // lastCard.addClass("cardMoveRight");
            let test = document.getElementsByClassName('memoryCard');
            test[test.length - 1].classList.add('cardMoveRight');
            // console.log(test[test.length - 1].innerHTML);
            // test.classList.add('cardMoveRight');
            if(card.length > 0){//if there are still cards
                storage[$(".memoryCard .front p").last().text()] -= 1;

                if(storage[$(".memoryCard .front p").last().text()] == 0){//remove the remembered card
                    console.log(lastCard)
                    // lastCard.addClass("cardMoveRight");
                    // lastCard.addClass("cardMoveRight");
                    setTimeout(function(){lastCard.remove()}, 1500);

                }else{//put the card back to the stack
                    
                    // lastCard.addClass("cardMoveRight");
                    lastCard.removeClass("rotate");//turn card back
                    lastCard.css("opacity", 0);

                    // lastCard.removeClass("cardMoveRight");
                    
                    lastCard.insertBefore($(".memoryCard").first());
                }
                $(".memoryCard").last().css("opacity", 1);
            }
        }
        //Forget
        if(this.id == "forget"){
            // console.log("forget");
            if(storage[$(".memoryCard .front p").last().text()] < correctTimes){
                storage[$(".memoryCard .front p").last().text()] = parseInt(storage[$(".memoryCard .front p").last().text()]) + 1;
            }
            lastCard.addClass('cardMoveLeft');
            lastCard.removeClass("rotate");//turn card back
            lastCard.css("opacity", 0);
            lastCard.insertBefore($(".memoryCard").first());
            $(".memoryCard").last().css("opacity", 1);
        }
        
        $(".memoryCard").last().removeClass("cardMoveRight");
        $(".memoryCard").last().removeClass("cardMoveLeft");


        //更新剩餘卡片數
        $(".cardProgress span").text($(".memoryCard").length)
        
        //更新進度條
        let totalTimes = selectedCard.length * correctTimes //總數
        let leftTimes = 0
        for(let i = 0; i < selectedCard.length; i++){
            leftTimes += parseInt(storage[selectedCard[i]]);
        }
        let progression = leftTimes / totalTimes * 100;
        $(".cardProgress .red").css("width", progression + "%");
        $(".cardProgress .blue").css("width", 100 - progression + "%");
        
        
        //做完的判斷
        if($(".memoryCard").length == 0){
            alert("記完了");
            //清除卡片
            $(".memoryCard").remove();
            //清除Storage
            storage.clear();
            //清除進度條css style
            $(".cardProgress .blue").css("width", 0);


            cardStudyStart.style.display = "none";
            cardShow.style.display = "block";
            cardSideBar.style.display = "block";
        }
    }

    $("#remember").click(rememberOrForget);
    $("#forget").click(rememberOrForget);


}//init


function createCards(cards){
    let card = "";
    for(let i = 0; i < cards.length; i++){
        card += `<div class="memoryCard">
                <div class="front">
                    <p>${cards[i]}</p>
                    <div class="click">
                        <img src="img/cardImg/information.png" alt="img">
                        <span>點我看答案</span>
                    </div>
                </div>
                <div class="back">
                    <p>back</p>
                </div>
            </div>`;

        storage[cards[i]] = correctTimes;
    }
    $(".cardWrap").append(card);
}



window.addEventListener("load", init);