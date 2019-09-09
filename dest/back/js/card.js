function init(){
    document.getElementById("midVocabAdd").onclick = addVocab;
    document.getElementById("highVocabAdd").onclick = addVocab;
    document.getElementById("basicVocabAdd").onclick = addVocab;
    
    
    function addVocab(e){
        // alert(e.target.id);
        // console.log(e.target.parentNode.previousElementSibling.firstElementChild)




        if(e.target.innerText === '新增字卡'){
            e.target.innerText = '送出';
            e.target.nextElementSibling.classList.remove('d-none');
            let input = document.createElement('input');
            input.setAttribute('class', 'form-control mt-3');
            input.setAttribute('id', 'company');
            input.setAttribute('type', 'text');
            input.setAttribute('placeholder', '請輸入欲新增的單字');
            e.target.parentNode.previousElementSibling.firstElementChild.append(input);

        }else if(e.target.innerText == '送出'){
            // 送出的code寫這
            let newVocab = e.target.parentNode.previousElementSibling.firstElementChild.lastElementChild.value;
            let level = 0;
            if(e.target.id === 'basicVocabAdd'){
                level = 1;
            }else if(e.target.id === 'midVocabAdd'){
                level = 2
                // console.log(2);
            }else if(e.target.id === 'highVocabAdd'){
                level = 3
            }
            console.log(level);

            // $.ajax({
            //     url: "defaultCardUpdate.php",
            //     data: {vocab: newVocab, lev: level},
            //     type: "GET",
            //     // success: function(data){
            //     //     $('#feedback').html('<h1>' + data + '</h1>');
            //     // }
            // });


            $.get("defaultCardUpdate.php", {vocab: newVocab, lev: level})
        }

        //建立取消鈕的事件聆聽功能
        let cancelBtn = document.getElementsByClassName('cancel');
        for(let i = 0; i < cancelBtn.length; i++){
            cancelBtn[i].onclick = cancelAdd;
        }
    }

    function cancelAdd(){
        // alert();
        //讓按鈕消失
        this.classList.add('d-none');

        this.previousElementSibling.innerText = '新增字卡';

        //讓input消失
        this.parentNode.previousElementSibling.firstElementChild.lastElementChild.style.display = 'none';

        
    }


}




window.addEventListener('load', init);