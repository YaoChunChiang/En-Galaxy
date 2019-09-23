let storage = sessionStorage;
let correctTimes = 2; //correct times
let selectedCard = [];
let chineseArr = [];
function init(){

    // let aaa = ['aa', 'aa', 'aa', 'aa', 'bb', 'bb', 'bb', 'bb', 'cc', 'cc','cc'];
    // let bbb = [... new Set(aaa)];

    
    // getting data from db
    let memNum = storage['mem_no'] ? storage['mem_no']: 'notMem';
    let memLevel = storage['level_no'] ? storage['level_no'] : 'notMem';
    function getData(){
        console.log(memNum)
        $.get('card.php',{who: 'start', memNum, memLevel}, (data)=>{
            if(memNum != 'notMem'){
                let classAndVocab = JSON.parse(data);
                let cardClass = [];

                classAndVocab[0].forEach((data,index) => {cardClass[index] = data['card_class']});

                let cleanCardClass = [...new Set(cardClass)];
                
                console.log(cleanCardClass)
                // console.log(classAndVocab);
                createSideBar(classAndVocab[1], cleanCardClass, classAndVocab[0]);
            }else{
                // console.log(data);
                console.log(JSON.parse(data));
                createSideBar(JSON.parse(data));
            }
        })
    }
    getData();



    let cardShow = document.getElementsByClassName("cardShow")[0];
    let cardStudyStart = document.getElementsByClassName("cardStudyStart")[0];
    let cardSideBar = document.getElementsByClassName("cardSideBar")[0];
    let cardManage = document.getElementsByClassName("cardManage")[0];
    // let selectedManageCard = $(".cardClassSelect select")[0];



    function addCardClass(){
        if(memNum == 'notMem'){
            alertBoxShow('請加入會員','注意', 'red',()=>{$('#loginBox').fadeIn()});            
        }else if(cardSideBar.children.length < 10){
            $("#cardClassAddWindow").fadeIn();
        }else{
            // alert('已到達上限：五組類別');
            alertBoxShow("已到達上限：五組類別");
        }
    };
    function deleteCardClass(){
        if(memNum == 'notMem'){
            alertBoxShow('請加入會員','注意', 'red',()=>{$('#loginBox').fadeIn()});
            // $('#loginBox').fadeIn();
        }else if($('.cardClass.selectedCard').hasClass('default')){
            // alert('無法刪除預設類別');
            alertBoxShow('無法刪除預設類別','注意');
        }else{
            let selectedClassName = $('.cardClass.selectedCard').children().first().text();
            $("#cardClassDeleteWindow span").text(selectedClassName);        
            $("#cardClassDeleteWindow").fadeIn();
        }
    };
    function changeCardClassName(){
        if(memNum == 'notMem'){
            $('#loginBox').fadeIn();
        }else if($('.cardClass.selectedCard').hasClass('default')){
            alertBoxShow('預設類別無法更名','注意');
            // alert('預設類別無法更名')
        }else{
            let selectedClassName = $('.cardClass.selectedCard').children().first().text();
            $("#cardClassRenameWindow span").text(selectedClassName);    
            $("#cardClassRenameWindow").fadeIn();
        }
    };

    let confirmAdd = () =>{
        let newClass = document.getElementById('classAdd').value;
        let cardSideBar = document.querySelector('.cardSideBar');
        
        if(newClass){//確定有填入
            console.log(memNum)
            $.post('card.php', {addClass: newClass, who: 'addClass', memNum}, data =>{console.log(data)});
            //為了要讓剛新增的類別是selected先移除其他的
            $('.cardClass').removeClass('selectedCard');

            //先製作假的
            let li = document.createElement('li');
            li.setAttribute('class', 'cardClass selectedCard');
            let text = `<span>${newClass}</span><ul><li>尚無單字，可利用影片學習的反白翻譯功能加入單字</li></ul>`;
            li.innerHTML = text;
            let toCardManage = document.getElementById('toCardManage');
            cardSideBar.insertBefore(li, toCardManage);
            //加完關閉視窗
            $("#cardClassAddWindow").fadeOut();
            document.getElementById('classAdd').value = "";

            addSideBarEventlistener();
            putCardIntoCardManage($('.cardClass.selectedCard'));
        }
    }
    let confirmDelete = () =>{
        
        //刪除sidebar的類別
        
        if(!$('.cardClass.selectedCard').hasClass('default')){
            let deleteClass = $('.cardClass.selectedCard').children().first().text();
            // let deleteClass = document.querySelector('#cardClassDeleteWindow span').innerText;
            console.log(deleteClass)
            $.post('card.php', {deleteClass: deleteClass, who: 'deleteClass', memNum});


            $('.cardClass.selectedCard').remove();
            $("#cardClassDeleteWindow").fadeOut();

            $('.cardClass.default').first().addClass('selectedCard');
            // console.log($('.cardClass.default')[0])
            putCardIntoCardManage($('.cardClass.selectedCard'));
        }
    }
    let confirmRename = () =>{
        let renameName = document.getElementById("classRename").value;
        // let whichClass = document.querySelector("#cardClassRenameWindow span").innerText;
        let whichClass = $('.cardClass.selectedCard').children().first().text();
        // console.log(renameName, ":", whichClass)
        $.post('card.php', {renameName: renameName,whichClass: whichClass, who: 'renameClass'});
        $('.cardClass.selectedCard').children().first().text(renameName);
        $('#cardClassRenameWindow').fadeOut();
    }

    function closeWindow(e){
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

    //點單字管理
    document.getElementById("toCardManage").onclick = function(){
        cardShow.style.display = "none";
        // cardManage.style.display = "block";
        $(".cardManage").fadeIn();
        //change background pic
        $('.cardStudy').css({'background-image': "url(../img/cardImg/cardBackground.png)",'background-size': 'cover'});
        
        //將被選擇的類別放入類別管理中
        putCardIntoCardManage($('.cardClass.selectedCard'));
    }
    //離開單字管理
    document.getElementById("cardMagLeave").onclick = function(){
        // cardShow.style.display = "block";
        $(".cardShow").fadeIn();
        cardManage.style.display = "none";

        $('.cardManage .cards li').removeClass('selected');
        //換回背景圖
        $('.cardStudy').css({'background-image': "url(../img/cardImg/cardBackground2.png)", 'background-size': 'cover'});
    }

    document.getElementById("cardStudyBtn").onclick = function(){//study start
        //clear storage
        selectedCard.forEach(vocab =>{storage.removeItem(vocab)});
        
        
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

            //清除卡片
            $(".memoryCard").remove();
            //清除Storage
            selectedCard.forEach(vocab =>{storage.removeItem(vocab)});

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
                    // console.log(lastCard.text())
                    
                    lastCard.insertBefore($(".memoryCard").first());
                    // lastCard.remove();
                    setTimeout(()=>{
                        $(".memoryCard").first().remove();
                        //更新剩餘卡片數
                        $(".cardProgress span").text($(".memoryCard").length);

                        //做完的判斷
                        if($(".memoryCard").length == 0){
                            // alert("記完了");
                            alertBoxShow("記玩了", "恭喜", 'green')
                            //清除卡片
                            $(".memoryCard").remove();
                            //清除Storage
                            selectedCard.forEach(vocab =>{storage.removeItem(vocab)});

                            //清除進度條css style
                            $(".cardProgress .blue").css("width", 0);


                            cardStudyStart.style.display = "none";
                            cardShow.style.display = "block";
                            cardSideBar.style.display = "block";
                        }
                    }, 500);
                    
                }else{//put the card back to the stack
                    
                    // lastCard.addClass("cardMoveRight");
                    lastCard.removeClass("rotate");//turn card back
                    lastCard.css("opacity", 0);

                    // lastCard.removeClass("cardMoveRight");
                    
                    lastCard.insertBefore($(".memoryCard").first());
                }
                $(".memoryCard").last().css("opacity", 1);
            }//if
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


        
        //更新進度條
        let totalTimes = selectedCard.length * correctTimes //總數
        let leftTimes = 0
        for(let i = 0; i < selectedCard.length; i++){
            leftTimes += parseInt(storage[selectedCard[i]]);
        }
        let progression = leftTimes / totalTimes * 100;
        $(".cardProgress .red").css("width", progression + "%");
        $(".cardProgress .blue").css("width", 100 - progression + "%");
        
    }


    let deleteVocabFromCardManage = () =>{
        if(memNum == 'notMem'){
            // alert('預設單字無法刪除');
            alertBoxShow('預設單字無法刪除');
            // $('#loginBox').fadeIn();
        }else{
            let selectedDeleteCard = document.querySelectorAll('#cardManageList .selected');
            let selectedClass = $('.cardClass.selectedCard').children().first().text();
            let sendDeleteCard = [];
            selectedDeleteCard.forEach((data, i)=>{sendDeleteCard[i] = data.innerText});
            $.post('card.php',{who: "deleteVocab", selectedClass: selectedClass, sendDeleteCard: sendDeleteCard},(data)=>{console.log(data)});
            // console.log(selectedClass , ":" , sendDeleteCard);
            
            //假刪
            let deleteVocab = document.querySelectorAll(".cardClass.selectedCard li");
            for(let i = 0; i < deleteVocab.length; i++){
                if($.inArray(deleteVocab[i].innerText, sendDeleteCard) != -1){
                    deleteVocab[i].remove();
                }
            };
            selectedDeleteCard.forEach(data=>{data.remove()});
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
    document.getElementById('cardManageListBtn').onclick = deleteVocabFromCardManage;
    $('.cardWindow').click(closeWindow);
    $('.cardWindow .close').click(closeWindow);
    $('.cardWindow .cancel').click(closeWindow);


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
                    <p>${chineseArr[i]}</p>
                </div>
            </div>`;

        storage[cards[i]] = correctTimes;
    }
    $(".cardWrap").append(card);
    // $('.memoryCard').draggable();
    // console.log(chineseArr);

}

function getChineseTranslate(wordsString){
    $.get('translate.php', {text: wordsString}, 
        (data) => {chineseArr = data.split('|')} 
    );
}

function putCardIntoSelectedCard(cardClass){
    //陣列已有卡片
    if(selectedCard.length != 0){
        selectedCard = [];
    }
    let vocabInClass = cardClass.children("ul").children();
    // vocabInClass.forEach((vocab, i) =>{selectedCard[i] = vocab.innerText})
    for(let i = 0; i < vocabInClass.length; i++){
        selectedCard[i] = vocabInClass[i].innerText;
        // console.log(selectedCard);
        // console.log(vocabInClass[i].innerText);
    }
    
    getChineseTranslate(selectedCard.join("|"));
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
            // changeCardManageBtn($(this));
        }
    });
}
//動態新增sideBar
function createSideBar(defaultVocab, classArray = null, vocabs = null){
    // console.log(defaultVocab);
    //製作default字卡
    let defaultCardFolder = document.querySelectorAll('.cardClass.default ul');
    let memLevel = storage['level_no'] ? storage['level_no'] : 'notMem';
    console.log('level:', memLevel);
    switch(memLevel){
        case 'notMem':
            // console.log($('.cardClass:eq(2)'))
            $('.cardClass.default:eq(1)').addClass('cannotUseCard');
            $('.cardClass.default:eq(2)').addClass('cannotUseCard');
        break;
        case '1':
            $('.cardClass.default:eq(1)').addClass('cannotUseCard');
            $('.cardClass.default:eq(2)').addClass('cannotUseCard');
        break;
        case '2':
            $('.cardClass.default:eq(2)').addClass('cannotUseCard');
        break;
    }
    defaultVocab.forEach((data) => {
        // console.log(data['default_vocab'],":" ,data['level_no']);
        let li = document.createElement('li');
        li.innerText = data['default_vocab'];
        // console.log(li);
        switch(data['level_no']){
            case '1':
                // console.log(data['level_no'])
                defaultCardFolder[0].appendChild(li);
            break;
            case '2':
                // console.log(data['level_no'])
                defaultCardFolder[1].appendChild(li);
            break;
            case '3':
                // console.log(data['level_no'])
                defaultCardFolder[2].appendChild(li);                
            break;
        }
    });

    /////////////////放default字卡進入學習///////////////////
    let defaultCards = document.getElementsByClassName("cardClass")[0];
    for(let i = 0; i < defaultCards.firstElementChild.nextElementSibling.children.length; i++){
        selectedCard[i] = defaultCards.firstElementChild.nextElementSibling.children[i].innerText;
    }
    
    getChineseTranslate(selectedCard.join("|"))
    // defaultCards.firstElementChild.innerText
    $(".cardShow span").text(defaultCards.firstElementChild.innerText);
    /////////////////放default字卡進入學習///////////////////    


    //動態新增字卡類別
    // 是會員才會走這段
    if(classArray != null){
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
            if(vocabsArray[j]['vocab'] === null){
                li.innerText = '尚無單字，可利用影片學習的反白翻譯功能加入單字';
            }else{
                li.innerText = vocabsArray[j]['vocab'];
            }
            ul.appendChild(li);
        }
        classList.appendChild(ul);
        // console.log(classList);
        $(classList).insertBefore('#toCardManage');
    }
    

        addSideBarEventlistener();
    }
}



window.addEventListener("load", init);