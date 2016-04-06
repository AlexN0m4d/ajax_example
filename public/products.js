(function () {
    function List (root){
        var conteiner = $('.container'),
            output = conteiner.find('.output'),
            items = ['hello',10,20,50000],
            input = conteiner.find('.input'),
            addBtn = conteiner.find('.btn_add');

//----------------- принятие данных ----------------------

        function addItem () {
                addBtn.on('click', function (e) {
                    sendData(input.val());
                    // items.push(input.val());
                    render();
                });
        };

        function fetchData () {
            var xhr = new XMLHttpRequest();

            xhr.open('GET', 'fruites', false);

            xhr.send();
            if(xhr.status != 200) {
                console.log(xhr.responseText);
            }else{
                items = JSON.parse(xhr.response);
            };
        };


//------------------- Отправка данных ! ------------------------

        function sendData (newData) {
            var xhr = new XMLHttpRequest(),
                newT = {'fruite': newData};

            xhr.open('POST', 'fruites', false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(JSON.stringify(newT));

            if(xhr.status != 200){
                console.log(xhr.responseText);
            }else{
                items = JSON.parse(xhr.response);
            };
        };
// ------------------ Удаление -------------------------------------

        function deleteDate (id) {
            var xhr = new XMLHttpRequest(),
                delT = {};

            xhr.open('Delete', 'fruites/'+id, false);
            xhr.send();
            if(xhr.status != 200){
                console.log(xhr.responseText);
            }else{
                items = JSON.parse(xhr.response);
            };
        };

// --------------------- chenges ------------------------------------


        function chengeData (text, id) {
            var xhr = new XMLHttpRequest(),
                newText = {'fruite': text};

            xhr.open('PUT', 'fruites/'+id, false);
            xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            xhr.send(JSON.stringify(newText));

            if(xhr.status != 200){
                console.log(xhr.responseText);
            }else{
                items = JSON.parse(xhr.response);
            };
        };

// ----------------------- render -----------------------------------

        function render () {
            output.html(' ');
            input.val('');
            items.forEach(function (item, i){
                var el = $('<li>',{
                    class: 'newLi',
                    id: i
                });
                var span_li = $('<span>'
                    + item +'</span><input class="input_li hidden"><button class="dlt_btn">Delete</button>');

                $(span_li[0]).on('dblclick', function () {
                    var text = $(this).text();
                    $(this).addClass('hidden').siblings().removeClass('hidden');                        

                     $(span_li[1]).val(text).focus();
                     debugger;
                });

                $(span_li[1]).on('blur', function () {
                    var text = $(this).val();
                        chengeData(text, i);
                        render();

                });

                $(span_li[2]).on('click', function () {
                    deleteDate(i);
                    render();
                });
                el.append(span_li);
            output.append(el);
            });
        };

        fetchData();
        addItem();
        render();
    };
    var product = new List();
}());