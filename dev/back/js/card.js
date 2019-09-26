function init(){
    document.getElementById("midVocabAdd").onclick = addVocab;
    document.getElementById("highVocabAdd").onclick = addVocab;
    document.getElementById("basicVocabAdd").onclick = addVocab;


    let deleteVocabBtn = document.getElementsByClassName("deleteVocab");
    for(let i = 0; i < deleteVocabBtn.length; i++){
        deleteVocabBtn[i].onclick = deleteVocab;
        
    }
    
    function isManager(){
        let level = sessionStorage['admin_level'];
        switch (level){
            case '0':
                return false;
            break;
            case '1':
                return true;
            break;
        }
    }

    function addVocab(e){
        // alert(e.target.id);
        // console.log(e.target.parentNode.previousElementSibling.firstElementChild)
        if(!isManager()){
            alert('權限不足');
            return;
        }
        if(e.target.innerText === '新增字卡'){
            console.log("???")
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
            // console.log(e.target.parentNode.previousElementSibling.firstElementChild.lastElementChild.value)
            //確定input裡面有填資料
            if(e.target.parentNode.previousElementSibling.firstElementChild.lastElementChild.value != ''){
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
                
                
                e.target.parentNode.previousElementSibling.firstElementChild.lastElementChild.remove();
                // $.ajax({
                    //     url: "defaultCardUpdate.php",
                    //     data: {vocab: newVocab, lev: level},
                    //     type: "GET",
                    //     // success: function(data){
                        //     //     $('#feedback').html('<h1>' + data + '</h1>');
                        //     // }
                        // });
                //做假的
                let newVocabTemp = `${newVocab}
                <a class="btn btn-danger float-right" href="#">
                <i class="fa fa-trash-o">
                </i>
                </a>
                `;
                let newVocabContainer = document.createElement('button');
                newVocabContainer.setAttribute('class', 'list-group-item list-group-item-action');
                newVocabContainer.setAttribute('type', 'button');
                newVocabContainer.innerHTML = newVocabTemp;
                // console.log(newVocabContainer.firstElementChild)
                newVocabContainer.firstElementChild.addEventListener('click', deleteVocab);
                // console.log(newVocabContainer);
                e.target.parentNode.previousElementSibling.firstElementChild.appendChild(newVocabContainer);
                        
                e.target.innerText = "新增字卡";
                e.target.nextElementSibling.classList.add('d-none');
                //送去資料庫
                $.get("defaultCardUpdate.php", {vocab: newVocab, lev: level, who: 'addVocab'})
            }else{// No input
                e.target.parentNode.previousElementSibling.firstElementChild.lastElementChild.setAttribute('placeholder', '未輸入資料');
            }
            
            
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


    function deleteVocab(e){
        if(!isManager()){
            alert('權限不足');
            return;
        }


        e.preventDefault();
        // typeof toString(this.previousSibling);
        console.log(this.previousSibling.textContent.trim())
        let vocab = this.previousSibling.textContent.trim()
        this.parentNode.remove();

        $.get("defaultCardUpdate.php", {vocab: vocab, who: 'deleteVocab'});
    }


}




window.addEventListener('load', init);