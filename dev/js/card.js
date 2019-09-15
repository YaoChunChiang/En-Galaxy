// import { format } from "path";

// import { TweenMax } from "gsap";

let storage = sessionStorage;
let correctTimes = 2; //correct times
let selectedCard = [];

function init(){
    // let vue = new Vue({
    //     el: '#app',
    //     data:{
    //         // cardClass: {
    //         //     '初級（預設)': ['Mother','Father','Family','Teacher','Huh'],
    //         //     '中級（預設)': ['Mother','Father','Family','Teacher','Huh'],
    //         //     '高級（預設)': ['Mother','Father','Family','Teacher','Huh'],
    //         //     '音樂': ['Guitar','Violin','Piano','Scale','Music'],
    //         //     '動物': ['Tiger','Lion','Sloth','Food Panda','Python'],
    //         //     '生活': ['Where','Is','The','Love'],
    //         // },
    //         defaultCardbasic: [{'初級': 'apple'},{'初級': 'rice'},{'初級': 'banana'}]
    //     },
    //     components: {
    //         "card-class-list": {
    //             template: `<li class="cardClass selectedCard">
    //                             <span v-for="level in cardClass">{{level)}}</span>
    //                             <ul>
    //                                 <li>Mother</li>
    //                                 <li>Father</li>
    //                                 <li>Family</li>
    //                                 <li>Teacher</li>
    //                                 <li>Huh</li>
    //                             </ul>
    //                         </li>`,
    //         }, 
    //     },
    //     methods:{
    //         mounted(){

    //         }
    //     }

    // });


    ///////////////////////////////////////////
    ////////////////VUE END////////////////////
    ///////////////////////////////////////////
    // .then(res => res.json())

    // let aaa = ['aa', 'aa', 'aa', 'aa', 'bb', 'bb', 'bb', 'bb', 'cc', 'cc','cc'];
    
    // let bbb = [... new Set(aaa)];


    // getting data from db
    $.get('card.php',{who: 'start'}, (data)=>{
        let classAndVocab = JSON.parse(data);
        let cardClass = [];
        console.log(classAndVocab)
        classAndVocab.forEach((data,index) => {cardClass[index] = data['card_class']});
        let cleanCardClass = [...new Set(cardClass)];
        // console.log(classAndVocab);
        createSideBar(cleanCardClass, classAndVocab);
    })




    // let cardClasses = [];
    // let aaa = 'aaa';
    // fetch("card.php").then(books => books.text()).then(function(ccc){aaa = ccc});
    // console.log(aaa);


    let cardShow = document.getElementsByClassName("cardShow")[0];
    let cardStudyStart = document.getElementsByClassName("cardStudyStart")[0];
    let cardSideBar = document.getElementsByClassName("cardSideBar")[0];
    let cardManage = document.getElementsByClassName("cardManage")[0];
    // let selectedManageCard = $(".cardClassSelect select")[0];



    function addCardClass(){
        if(cardSideBar.children.length < 10){
            $("#cardClassAddWindow").fadeIn();
        }else{
            alert('已到達上限：五組類別');
        }
    };
    function deleteCardClass(){
        if($('.cardClass.selectedCard').hasClass('default')){
            alert('無法刪除預設類別');
        }else{
            $("#cardClassDeleteWindow").fadeIn();
        }
    };
    function changeCardClassName(){
        if($('.cardClass.selectedCard').hasClass('default')){
            alert('預設類別無法更名')
        }else{
            $("#cardClassRenameWindow").fadeIn();
        }
    };

    let confirmAdd = () =>{
        let newClass = document.getElementById('classAdd').value;
        let cardSideBar = document.querySelector('.cardSideBar');
        if(newClass){//確定有填入
            $.post('card.php', {addClass: newClass, who: 'addClass'}, data =>{console.log(data)});

            //先製作假的
            let li = document.createElement('li');
            li.setAttribute('class', 'cardClass');
            let text = `<span>${newClass}</span><ul></ul>`;
            li.innerHTML = text;
            let toCardManage = document.getElementById('toCardManage');
            cardSideBar.insertBefore(li, toCardManage);
            //加完關閉視窗
            $("#cardClassAddWindow").fadeOut();
            document.getElementById('classAdd').value = "";

            addSideBarEventlistener();
        }
    }
    let confirmDelete = () =>{
        let deleteClass = document.querySelector('#cardClassDeleteWindow span').innerText;
        console.log(deleteClass)
        $.post('card.php', {deleteClass: deleteClass, who: 'deleteClass'});

        //刪除sidebar的類別
        if(!$('.cardClass.selectedCard').hasClass('default')){
            $('.cardClass.selectedCard').remove();
            $("#cardClassDeleteWindow").fadeOut();
        }
    }
    let confirmRename = () =>{
        let renameName = document.getElementById("classRename").value;
        let whichClass = document.querySelector("#cardClassRenameWindow span").innerText;
        // console.log(renameName, ":", whichClass)
        $.post('card.php', {renameName: renameName,whichClass: whichClass, who: 'renameClass'});

    }

    function closeWindow(e){
        // e.stopImmediatePropagation()
        // e.stopPropagation();
        // console.log(this.parentNode.parentNode.id);
        // console.log($(this).hasClass('close'));
        
        //click X
        if($(this).hasClass('close')){
            $(`#${this.parentNode.parentNode.id}`).fadeOut();
        
        //click outside of the box
        }else if($(this).hasClass('cardWindow')){
            if(e.target == this){//stop bubble
                $(this).fadeOut();
            }
        
        //click cancel
        }else{
            $(`#${this.parentNode.parentNode.parentNode.id}`).fadeOut();
        }
    }

    // function highlightselectedCard(){
    //     $(this).toggleClass('selected');
    // }

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

        $('.cardManage .cards li').removeClass('selected');
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
                    // lastCard.style.display = 'none';
                    lastCard.remove();
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
    document.getElementById("addCardClass").onclick = addCardClass;
    document.getElementById("deleteCardClass").onclick = deleteCardClass;
    document.getElementById("changeCardClassName").onclick = changeCardClassName;
    document.getElementById('confirmAdd').onclick = confirmAdd;
    document.getElementById('confirmDelete').onclick = confirmDelete;
    document.getElementById('confirmRename').onclick = confirmRename;

    $('.cardWindow').click(closeWindow);
    $('.cardWindow .close').click(closeWindow);
    $('.cardWindow .cancel').click(closeWindow);
    // $('#cardManageList li').click(highlightselectedCard);
    // createManageSelect();


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

// 點按換色
function highlightselectedCard(){
    $(this).toggleClass('selected');
}

//改變CardManage的內容
function putCardIntoCardManage(cardClass){
    $('#cardManageList').html("");
    let vocabInClass = cardClass.children("ul").children();
    for(let i = 0; i < vocabInClass.length; i++){
        let cardLi = document.createElement('li');
        cardLi.innerText = vocabInClass[i].innerText;
        // console.log(vocabInClass[i].innerText);
        $('#cardManageList').append(cardLi);
    }
    // 建立事件聆聽功能·點按換色
    $('#cardManageList li').click(highlightselectedCard);
}

// 改變CardManageBtn的字
function changeCardManageBtn(cardClass){
        // console.log(cardClass.children('span').text());
        let selectedClassName = cardClass.children('span').text();
        $("#cardClassDeleteWindow span").text(selectedClassName);
        $("#cardClassRenameWindow span").text(selectedClassName);

}


//建立sidebar的事件聆聽功能
function addSideBarEventlistener(){
    $(".cardSideBar .cardClass").click(function(){
        // 點擊的會反白
        if(!$(this).hasClass("cannotUseCard")){
            $(".cardSideBar .cardClass").removeClass("selectedCard");
            $(this).toggleClass("selectedCard");
        
            //點擊後改變卡片顯示的類別
            let cardClass = $(this).html();
            let result = cardClass.slice(cardClass.indexOf("<span>") + 6,cardClass.indexOf("</span>"))
            
            $(".cardShow span").text(result);

            putCardIntoSelectedCard($(this));
            putCardIntoCardManage($(this));
            changeCardManageBtn($(this));
        }
    });
}
//動態新增sideBar
function createSideBar(classArray, vocabs){
    // console.log(classArray, vocabs);
    for(let i = 0; i < classArray.length; i++){
        let classList = document.createElement('li');
        let spanClassName = document.createElement('span');

        classList.setAttribute('class', 'cardClass');
        spanClassName.innerText = classArray[i];
        classList.appendChild(spanClassName);

        let vocabsArray = new Array();
        vocabsArray = vocabs.filter(data=>{return classArray[i] == data['card_class']})
        
        // console.log(vocabsArray);
        let ul = document.createElement('ul');
        for(let j = 0; j < vocabsArray.length; j++){
            let li = document.createElement('li');
            li.innerText = vocabsArray[j]['vocab'];
            ul.appendChild(li);
        }
        classList.appendChild(ul);
        // console.log(classList);
        $(classList).insertBefore('#toCardManage');

        addSideBarEventlistener();
    }
}



window.addEventListener("load", init);