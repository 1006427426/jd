var mainBox = document.getElementsByClassName("mainBox")[0]
var addBtn = document.getElementsByClassName("addBtn")


var ul = document.getElementsByTagName("ul")
var all = document.getElementsByName("all")[0]
var checkbox = document.getElementsByName('checkbox')
var AllDel = document.getElementById("AllDel")

for (let i = 0; i < addBtn.length; i++) {
    addBtn[i].onclick = addTr
}
var obj={}
var brr=[]
var flag=false//假设说没有重复
// 添加行
function addTr(e) {
    var name = e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.innerHTML;
    var much = e.target.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstChild.nextSibling.innerHTML;
    var table = document.getElementsByTagName('table')[0]
    obj.name = name;
    obj.much = much
   
            
    for(let i=0;i<brr.length;i++){
        // console.log(brr[i].name)
        // console.log(obj.name)
        if(obj.name == brr[i].name){
            // 有重复
            flag=true
            console.log(flag)
                break;
                
            }
        }
        if(flag){
            // 如果是有重复 找到数量++
            console.log("有重复")
            console.log(obj,brr)
            // console.log(table.rows[1].cells[1].innerHTML,obj.name)
            for(let i=1;i<table.rows.length;i++){   
                // console.log(table.rows[i])
                if(table.rows[i].cells[1].innerHTML == obj.name){
                var xx = table.rows[i].cells[3].firstChild.nextSibling.value++
                }
            }
            // console.log(obj)
            // console.log(table.rows[1].cells[1])
        }else{
            
            brr.push(obj)
            
            var table = document.getElementsByTagName('table')[0]
            var tr = table.insertRow(-1)
            tr.insertCell(-1).innerHTML = obj.name
            tr.insertCell(-1).innerHTML = obj.much
            tr.insertCell(-1).innerHTML = '<button name="subtraction">-</button><input type="txt" value="1" class="sum"><button name="addition">+</button>'
            tr.insertCell(0).innerHTML = '<input type="checkbox" name="checkbox">'
            tr.insertCell(-1).innerHTML = '<button onclick="deleteTr(this)">删除</button>'
            obj={}
        }
        
    // 全选

    // 全选选中其他全部选中
    all.onclick = function () {
        // console.log(all.checked)
        
            AllDel.disabled = !all.checked
  
        for (let s = 0; s < checkbox.length; s++) {
            AllNum()
            checkbox[s].checked = this.checked
        }
    }
    for (let i = 0; i < checkbox.length; i++) {
        checkbox[i].onclick = function () {
            AllNum()
            
            var cont = 0;
            if (checkbox[i].checked == false) {
                all.checked = false
                AllDel.disabled = true
            }
            if (checkbox[i].checked == true) {
                for (let s = 0; s < checkbox.length; s++) {
                    if (checkbox[s].checked == true) {
                        cont++;
                    }

                    if (cont == checkbox.length) {
                        all.checked = true
                        AllDel.disabled = false
                    } else {
                        all.checked = false
                        AllDel.disabled = true
                    }
                }
            }
            // console.log(cont)
        }
    }

    AllNum()
}
function xuan(){
  
    for (let s = 0; s < checkbox.length; s++) {
        checkbox[s].checked = all.checked
    }

    // for (let i = 0; i < checkbox.length; i++) {
    //         var cont = 0;
    //         if (checkbox[i].checked == false) {
    //             all.checked = false
    //             AllDel.disabled = true
    //         }
    //         if (checkbox[i].checked == true) {
    //             for (let s = 0; s < checkbox.length; s++) {
    //                 if (checkbox[s].checked == true) {
    //                     cont++;
    //                 }

    //                 if (cont == checkbox.length) {
    //                     all.checked = true
    //                     AllDel.disabled = false
    //                 } else {
    //                     all.checked = false
    //                     AllDel.disabled = true
    //                 }
    //             }
    //         }
    //         // console.log(cont)
    // }
    
}
//删除单行
function deleteTr(btn) {
    var table = document.getElementsByTagName('table')[0]
    var tr = btn.parentElement.parentElement;
    table.deleteRow(tr.rowIndex)
    AllNum()
    

    for (let s = 0; s < checkbox.length; s++) {
        if(checkbox[s].checked){
            all.checked=true
        }else{
            all.checked=false
        }
    }
}

    // 总数量
function AllNum(){
    var AllSum = document.getElementById("AllSum")
    var total = document.getElementById("total")
    // console.log(AllSum.innerHTML)
    var sum = document.getElementsByClassName("sum")
    var num=0;
    var pp=0;
    for(let i=0;i<sum.length;i++){
        num += Number(sum[i].value)
        // Number(sum[i].value)每个的数量
    }
    AllSum.innerHTML = num
    var tr = document.getElementsByTagName("tr")
    var qq = 0;
    for(let i=1;i<tr.length;i++){
        // console.log(tr[i].lastChild.previousSibling.firstChild.nextSibling.value)
        // console.log(tr[i].lastChild.previousSibling.previousSibling.innerHTML)
        // console.log(tr[i].firstChild.firstChild)
        if(tr[i].firstChild.firstChild.checked){
            var aum = tr[i].lastChild.previousSibling.firstChild.nextSibling.value
            var pp = tr[i].lastChild.previousSibling.previousSibling.innerHTML
            qq += pp*aum
            // console.log(qq)
        }
        
        
    }
    total.innerHTML =qq
    // console.log(num)
    var addition = document.getElementsByName("addition")
    var subtraction = document.getElementsByName("subtraction")
    // console.log(addition)
    for(let c=0;c<subtraction.length;c++){
        subtraction[c].onclick = SumDow
    }
    for(let c=0;c<addition.length;c++){
        addition[c].onclick = SumAdd
    }

}
    // 数量加减 
    function SumDow(e){
        
        var range = e.target.parentNode.firstChild.nextSibling.value
        range--
        if(range<1){
            
            e.target.parentNode.firstChild.nextSibling.value=1
        }else{
            range--
            e.target.parentNode.firstChild.nextSibling.value=range
        }
        
        console.log(range)
        AllNum()
    }
    function SumAdd(e){
        console.log(e.target.previousSibling.value)
        var sum = document.getElementsByClassName("sum")
        var range = e.target.previousSibling.value
        range++
        e.target.previousSibling.value=range
        console.log(range)
        AllNum()
    }

//清空表格
function clearTable() {
    var table = document.getElementsByTagName('table')[0]
    for (let i = table.rows.length - 1; i >= 1; i--) {
        table.deleteRow(i)
    }
    brr=[]
}
// 我的购物车
function mycar() {
    table.style = "display:block"
    mainBox.style = "display:none"
    AllNum()

}


// 继续点餐
function back() {
    table.style = "display:none"
    mainBox.style = "display:block"
}

function end(){
    var checkbox = document.getElementsByName('checkbox')
    for(let i=checkbox.length-1;i>=0;i--){
        if(checkbox[i].checked){
            // console.log(checkbox[i].parentNode.parentNode.parentNode)
            console.log(checkbox[i].parentNode.parentNode)
            checkbox[i].parentNode.parentNode.parentNode.removeChild(checkbox[i].parentNode.parentNode)
        }
    }
    AllNum()
    

    for (let s = 0; s < checkbox.length; s++) {
        if(checkbox[s].checked){
            all.checked=true
        }else{
            all.checked=false
        }
    }   
}